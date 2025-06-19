
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
        return null;
      }

      const mappedProfile: Profile = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        city: data.city || '',
        postalCode: data.postal_code || '',
        profilePicture: data.profile_picture || '',
        userType: data.user_type as "buyer" | "seller" | "both",
        sportsInterests: data.sports_interests || [],
        language: data.language || 'en', // Include language field
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      console.log('Profile fetched successfully:', mappedProfile);
      setProfile(mappedProfile);
      return mappedProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event !== 'SIGNED_OUT') {
          // Use setTimeout to prevent potential infinite loops
          setTimeout(() => {
            if (mounted) {
              fetchProfile(session.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || !session) {
          setLoading(false);
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        console.log('Initial session:', session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    console.log('Signing up user with:', { email, fullName });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      throw error;
    }

    console.log('Signup successful:', data);
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Signing in user with:', { email });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Signin error:', error);
      throw error;
    }

    console.log('Signin successful:', data);
    return { data, error };
  };

  const signOut = async () => {
    console.log('Signing out user');
    setProfile(null);
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    
    console.log('Updating profile with:', data);
    
    const dbData: any = {};
    
    if (data.name !== undefined) dbData.name = data.name;
    if (data.phone !== undefined) dbData.phone = data.phone;
    if (data.city !== undefined) dbData.city = data.city;
    if (data.postalCode !== undefined) dbData.postal_code = data.postalCode;
    if (data.profilePicture !== undefined) dbData.profile_picture = data.profilePicture;
    if (data.userType !== undefined) dbData.user_type = data.userType;
    if (data.sportsInterests !== undefined) dbData.sports_interests = data.sportsInterests;
    if (data.language !== undefined) dbData.language = data.language; // Include language field
    
    // Check if profile exists first
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      // Create new profile if it doesn't exist
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          email: user.email || '',
          name: data.name || user.user_metadata?.full_name || 'User',
          language: 'en', // Default language for new profiles
          ...dbData
        }]);

      if (error) {
        console.error('Profile creation error:', error);
        throw error;
      }
    } else {
      // Update existing profile
      const { error } = await supabase
        .from('profiles')
        .update(dbData)
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    }
    
    await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
