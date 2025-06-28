export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Profile: {
        Row: {
          avatarUrl: string | null;
          createdAt: string;
          displayName: string;
          id: string;
        };
        Insert: {
          avatarUrl?: string | null;
          createdAt?: string;
          displayName: string;
          id: string;
        };
        Update: {
          avatarUrl?: string | null;
          createdAt?: string;
          displayName?: string;
          id?: string;
        };
        Relationships: [];
      };
      Project: {
        Row: {
          createdAt: string;
          description: string;
          id: string;
          startDate: string;
          title: string;
        };
        Insert: {
          createdAt?: string;
          description: string;
          id: string;
          startDate: string;
          title: string;
        };
        Update: {
          createdAt?: string;
          description?: string;
          id?: string;
          startDate?: string;
          title?: string;
        };
        Relationships: [];
      };
      ProjectMember: {
        Row: {
          createdAt: string;
          devPoint: number;
          id: string;
          initialDevPoint: number;
          profileId: string;
          projectId: string;
          role: Database["public"]["Enums"]["ProjectMemberRole"];
        };
        Insert: {
          createdAt?: string;
          devPoint: number;
          id: string;
          initialDevPoint: number;
          profileId: string;
          projectId: string;
          role: Database["public"]["Enums"]["ProjectMemberRole"];
        };
        Update: {
          createdAt?: string;
          devPoint?: number;
          id?: string;
          initialDevPoint?: number;
          profileId?: string;
          projectId?: string;
          role?: Database["public"]["Enums"]["ProjectMemberRole"];
        };
        Relationships: [
          {
            foreignKeyName: "ProjectMember_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "Profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ProjectMember_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "Project";
            referencedColumns: ["id"];
          },
        ];
      };
      Sprint: {
        Row: {
          createdAt: string;
          endDate: string;
          id: string;
          projectId: string;
          sprintNumber: number;
          startDate: string;
          voteEndDate: string;
          voteStartDate: string;
        };
        Insert: {
          createdAt?: string;
          endDate: string;
          id: string;
          projectId: string;
          sprintNumber: number;
          startDate: string;
          voteEndDate: string;
          voteStartDate: string;
        };
        Update: {
          createdAt?: string;
          endDate?: string;
          id?: string;
          projectId?: string;
          sprintNumber?: number;
          startDate?: string;
          voteEndDate?: string;
          voteStartDate?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Sprint_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "Project";
            referencedColumns: ["id"];
          },
        ];
      };
      SprintDividend: {
        Row: {
          createdAt: string;
          devPoint: number;
          id: string;
          sprintId: string;
        };
        Insert: {
          createdAt?: string;
          devPoint: number;
          id: string;
          sprintId: string;
        };
        Update: {
          createdAt?: string;
          devPoint?: number;
          id?: string;
          sprintId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SprintDividend_sprintId_fkey";
            columns: ["sprintId"];
            isOneToOne: false;
            referencedRelation: "Sprint";
            referencedColumns: ["id"];
          },
        ];
      };
      SprintDividendAllocation: {
        Row: {
          createdAt: string;
          devPoint: number;
          id: string;
          memberId: string;
          sprintDividendId: string;
        };
        Insert: {
          createdAt?: string;
          devPoint: number;
          id: string;
          memberId: string;
          sprintDividendId: string;
        };
        Update: {
          createdAt?: string;
          devPoint?: number;
          id?: string;
          memberId?: string;
          sprintDividendId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SprintDividendAllocation_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "ProjectMember";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SprintDividendAllocation_sprintDividendId_fkey";
            columns: ["sprintDividendId"];
            isOneToOne: false;
            referencedRelation: "SprintDividend";
            referencedColumns: ["id"];
          },
        ];
      };
      SprintVote: {
        Row: {
          createdAt: string;
          devPoint: number;
          id: string;
          memberId: string;
          sprintId: string;
        };
        Insert: {
          createdAt?: string;
          devPoint: number;
          id: string;
          memberId: string;
          sprintId: string;
        };
        Update: {
          createdAt?: string;
          devPoint?: number;
          id?: string;
          memberId?: string;
          sprintId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SprintVote_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "ProjectMember";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SprintVote_sprintId_fkey";
            columns: ["sprintId"];
            isOneToOne: false;
            referencedRelation: "Sprint";
            referencedColumns: ["id"];
          },
        ];
      };
      SprintVoteAllocation: {
        Row: {
          createdAt: string;
          devPoint: number;
          id: string;
          memberId: string;
          sprintVoteId: string;
        };
        Insert: {
          createdAt?: string;
          devPoint: number;
          id: string;
          memberId: string;
          sprintVoteId: string;
        };
        Update: {
          createdAt?: string;
          devPoint?: number;
          id?: string;
          memberId?: string;
          sprintVoteId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SprintVoteAllocation_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "ProjectMember";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SprintVoteAllocation_sprintVoteId_fkey";
            columns: ["sprintVoteId"];
            isOneToOne: false;
            referencedRelation: "SprintVote";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      ProjectMemberRole: "OWNER" | "MEMBER";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      ProjectMemberRole: ["OWNER", "MEMBER"],
    },
  },
} as const;
