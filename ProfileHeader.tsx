
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfileHeader = () => {
  const { signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">{t('nav.profile')}</h1>
      <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        {t('nav.signout')}
      </Button>
    </div>
  );
};

export default ProfileHeader;
