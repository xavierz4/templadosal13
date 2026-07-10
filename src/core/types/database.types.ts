export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      catalog_projects: {
        Row: {
          category: string;
          created_at: string | null;
          description: string | null;
          id: string;
          image_path: string;
          image_url: string;
          is_published: boolean | null;
          title: string;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_path: string;
          image_url: string;
          is_published?: boolean | null;
          title: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_path?: string;
          image_url?: string;
          is_published?: boolean | null;
          title?: string;
        };
        Relationships: [];
      };
      client_logs: {
        Row: {
          colno: number | null;
          created_at: string | null;
          error_stack: string | null;
          id: string;
          level: Database['public']['Enums']['log_level'];
          lineno: number | null;
          message: string;
          source: string | null;
          url: string | null;
          user_agent: string | null;
        };
        Insert: {
          colno?: number | null;
          created_at?: string | null;
          error_stack?: string | null;
          id?: string;
          level?: Database['public']['Enums']['log_level'];
          lineno?: number | null;
          message: string;
          source?: string | null;
          url?: string | null;
          user_agent?: string | null;
        };
        Update: {
          colno?: number | null;
          created_at?: string | null;
          error_stack?: string | null;
          id?: string;
          level?: Database['public']['Enums']['log_level'];
          lineno?: number | null;
          message?: string;
          source?: string | null;
          url?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          created_at: string | null;
          customer_name: string;
          customer_phone: string;
          id: string;
          measurements: Json;
          notes: string | null;
          owner_id: string | null;
          product_type: string;
          status: Database['public']['Enums']['lead_status'] | null;
          total_value: number | null;
          updated_at: string | null;
          utm_campaign: string | null;
          utm_source: string | null;
        };
        Insert: {
          created_at?: string | null;
          customer_name: string;
          customer_phone: string;
          id?: string;
          measurements: Json;
          notes?: string | null;
          owner_id?: string | null;
          product_type: string;
          status?: Database['public']['Enums']['lead_status'] | null;
          total_value?: number | null;
          updated_at?: string | null;
          utm_campaign?: string | null;
          utm_source?: string | null;
        };
        Update: {
          created_at?: string | null;
          customer_name?: string;
          customer_phone?: string;
          id?: string;
          measurements?: Json;
          notes?: string | null;
          owner_id?: string | null;
          product_type?: string;
          status?: Database['public']['Enums']['lead_status'] | null;
          total_value?: number | null;
          updated_at?: string | null;
          utm_campaign?: string | null;
          utm_source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'leads_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      marketing_content: {
        Row: {
          angle: string | null;
          body: string;
          channel: Database['public']['Enums']['marketing_channel'];
          created_at: string;
          created_by: string;
          cta: string | null;
          hashtags: string[] | null;
          hook: string;
          id: string;
          location_slug: string | null;
          scheduled_for: string | null;
          status: Database['public']['Enums']['marketing_status'];
          system_slug: string | null;
          target_url: string | null;
        };
        Insert: {
          angle?: string | null;
          body: string;
          channel: Database['public']['Enums']['marketing_channel'];
          created_at?: string;
          created_by?: string;
          cta?: string | null;
          hashtags?: string[] | null;
          hook: string;
          id?: string;
          location_slug?: string | null;
          scheduled_for?: string | null;
          status?: Database['public']['Enums']['marketing_status'];
          system_slug?: string | null;
          target_url?: string | null;
        };
        Update: {
          angle?: string | null;
          body?: string;
          channel?: Database['public']['Enums']['marketing_channel'];
          created_at?: string;
          created_by?: string;
          cta?: string | null;
          hashtags?: string[] | null;
          hook?: string;
          id?: string;
          location_slug?: string | null;
          scheduled_for?: string | null;
          status?: Database['public']['Enums']['marketing_status'];
          system_slug?: string | null;
          target_url?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          company_name: string | null;
          created_at: string | null;
          full_name: string | null;
          id: string;
          phone_number: string | null;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          company_name?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id: string;
          phone_number?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          company_name?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      seo_locations: {
        Row: {
          created_at: string | null;
          department: string;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          department: string;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          department?: string;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      seo_systems: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      leads_analytics_view: {
        Row: {
          leads_count: number | null;
          product_type: string | null;
          record_month: string | null;
          status: Database['public']['Enums']['lead_status'] | null;
          total_estimated_value: number | null;
        };
        Relationships: [];
      };
      leads_source_view: {
        Row: {
          campaign: string | null;
          leads_count: number | null;
          source: string | null;
          total_value: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_admin_users: {
        Args: never;
        Returns: {
          company_name: string;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          phone_number: string;
          role: string;
        }[];
      };
      get_dashboard_analytics: {
        Args: never;
        Returns: {
          leads_count: number | null;
          product_type: string | null;
          record_month: string | null;
          status: Database['public']['Enums']['lead_status'] | null;
          total_estimated_value: number | null;
        }[];
        SetofOptions: {
          from: '*';
          to: 'leads_analytics_view';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      get_source_analytics: {
        Args: never;
        Returns: {
          campaign: string | null;
          leads_count: number | null;
          source: string | null;
          total_value: number | null;
        }[];
        SetofOptions: {
          from: '*';
          to: 'leads_source_view';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      lead_status: 'NUEVO' | 'CONTACTADO' | 'COTIZADO' | 'CERRADO_GANADO' | 'PERDIDO';
      log_level: 'error' | 'warn' | 'info';
      marketing_channel: 'instagram' | 'facebook' | 'linkedin';
      marketing_status: 'draft' | 'approved' | 'published' | 'discarded';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      lead_status: ['NUEVO', 'CONTACTADO', 'COTIZADO', 'CERRADO_GANADO', 'PERDIDO'],
      log_level: ['error', 'warn', 'info'],
      marketing_channel: ['instagram', 'facebook', 'linkedin'],
      marketing_status: ['draft', 'approved', 'published', 'discarded'],
    },
  },
} as const;
