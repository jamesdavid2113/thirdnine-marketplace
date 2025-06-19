export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          product_id: string
          seller_id: string
          shipping_address: Json | null
          status: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          product_id: string
          seller_id: string
          shipping_address?: Json | null
          status?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          product_id?: string
          seller_id?: string
          shipping_address?: Json | null
          status?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_drafts: {
        Row: {
          created_at: string
          draft_data: Json
          id: string
          step_completed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_data: Json
          id?: string
          step_completed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_data?: Json
          id?: string
          step_completed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_views: {
        Row: {
          created_at: string
          id: string
          ip_address: unknown | null
          product_id: string
          user_agent: string | null
          viewer_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          product_id: string
          user_agent?: string | null
          viewer_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          product_id?: string
          user_agent?: string | null
          viewer_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string
          category: string
          condition: string
          created_at: string
          description: string
          id: string
          images: string[]
          is_featured: boolean | null
          likes_count: number | null
          listing_quality_score: number | null
          location: string | null
          name: string
          original_price: number | null
          price: number
          seller_id: string
          size: string | null
          status: string | null
          subcategory: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          brand: string
          category: string
          condition: string
          created_at?: string
          description: string
          id?: string
          images?: string[]
          is_featured?: boolean | null
          likes_count?: number | null
          listing_quality_score?: number | null
          location?: string | null
          name: string
          original_price?: number | null
          price: number
          seller_id: string
          size?: string | null
          status?: string | null
          subcategory: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          brand?: string
          category?: string
          condition?: string
          created_at?: string
          description?: string
          id?: string
          images?: string[]
          is_featured?: boolean | null
          likes_count?: number | null
          listing_quality_score?: number | null
          location?: string | null
          name?: string
          original_price?: number | null
          price?: number
          seller_id?: string
          size?: string | null
          status?: string | null
          subcategory?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          email: string
          id: string
          language: string | null
          name: string
          phone: string | null
          postal_code: string | null
          profile_picture: string | null
          sports_interests: string[] | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          id: string
          language?: string | null
          name: string
          phone?: string | null
          postal_code?: string | null
          profile_picture?: string | null
          sports_interests?: string[] | null
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          language?: string | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          profile_picture?: string | null
          sports_interests?: string[] | null
          updated_at?: string
          user_type?: string | null
        }
        Relationships: []
      }
      purchase_requests: {
        Row: {
          buyer_id: string | null
          buyer_message: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          id: string
          product_id: string | null
          seller_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          buyer_message?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          seller_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          buyer_message?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          seller_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_product_views: {
        Args: { product_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
