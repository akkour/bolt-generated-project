export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string
          service_request_id: string | null
          sender_id: string | null
          receiver_id: string | null
          is_read: boolean | null
          created_at: string
          content: string
        }
        Insert: {
          id?: string
          service_request_id?: string | null
          sender_id?: string | null
          receiver_id?: string | null
          is_read?: boolean | null
          created_at?: string
          content: string
        }
        Update: {
          id?: string
          service_request_id?: string | null
          sender_id?: string | null
          receiver_id?: string | null
          is_read?: boolean | null
          created_at?: string
          content?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_service_request_id_fkey"
            columns: ["service_request_id"]
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          type: Database["public"]["Enums"]["notification_type"] | null
          is_read: boolean | null
          related_id: string | null
          created_at: string
          title: string
          content: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          type?: Database["public"]["Enums"]["notification_type"] | null
          is_read?: boolean | null
          related_id?: string | null
          created_at?: string
          title: string
          content: string
        }
        Update: {
          id?: string
          user_id?: string | null
          type?: Database["public"]["Enums"]["notification_type"] | null
          is_read?: boolean | null
          related_id?: string | null
          created_at?: string
          title?: string
          content?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: string
          service_request_id: string | null
          amount: number
          status: Database["public"]["Enums"]["payment_status"] | null
          created_at: string
          updated_at: string
          payment_method: string | null
          transaction_id: string | null
        }
        Insert: {
          id?: string
          service_request_id?: string | null
          amount: number
          status?: Database["public"]["Enums"]["payment_status"] | null
          created_at?: string
          updated_at?: string
          payment_method?: string | null
          transaction_id?: string | null
        }
        Update: {
          id?: string
          service_request_id?: string | null
          amount?: number
          status?: Database["public"]["Enums"]["payment_status"] | null
          created_at?: string
          updated_at?: string
          payment_method?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_service_request_id_fkey"
            columns: ["service_request_id"]
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          created_at: string
          updated_at: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          email: string | null
        }
        Insert: {
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          email?: string | null
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      provider_profiles: {
        Row: {
          id: string
          years_of_experience: number | null
          service_radius: number | null
          is_verified: boolean | null
          average_rating: number | null
          created_at: string
          updated_at: string
          total_reviews: number | null
          business_name: string | null
          business_description: string | null
          license_number: string | null
          insurance_info: string | null
          bio: string | null
          services_offered: string | null
          hourly_rate: number | null
          availability: string | null
        }
        Insert: {
          id: string
          years_of_experience?: number | null
          service_radius?: number | null
          is_verified?: boolean | null
          average_rating?: number | null
          created_at?: string
          updated_at?: string
          total_reviews?: number | null
          business_name?: string | null
          business_description?: string | null
          license_number?: string | null
          insurance_info?: string | null
          bio?: string | null
          services_offered?: string | null
          hourly_rate?: number | null
          availability?: string | null
        }
        Update: {
          id?: string
          years_of_experience?: number | null
          service_radius?: number | null
          is_verified?: boolean | null
          average_rating?: number | null
          created_at?: string
          updated_at?: string
          total_reviews?: number | null
          business_name?: string | null
          business_description?: string | null
          license_number?: string | null
          insurance_info?: string | null
          bio?: string | null
          services_offered?: string | null
          hourly_rate?: number | null
          availability?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      provider_services: {
        Row: {
          provider_id: string
          category_id: string
          rate_per_hour: number | null
          is_available: boolean | null
          created_at: string
        }
        Insert: {
          provider_id: string
          category_id: string
          rate_per_hour?: number | null
          is_available?: boolean | null
          created_at?: string
        }
        Update: {
          provider_id?: string
          category_id?: string
          rate_per_hour?: number | null
          is_available?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_services_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_services_provider_id_fkey"
            columns: ["provider_id"]
            referencedRelation: "provider_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          service_request_id: string | null
          client_id: string | null
          provider_id: string | null
          rating: number | null
          created_at: string
          comment: string | null
        }
        Insert: {
          id?: string
          service_request_id?: string | null
          client_id?: string | null
          provider_id?: string | null
          rating?: number | null
          created_at?: string
          comment?: string | null
        }
        Update: {
          id?: string
          service_request_id?: string | null
          client_id?: string | null
          provider_id?: string | null
          rating?: number | null
          created_at?: string
          comment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            referencedRelation: "provider_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_service_request_id_fkey"
            columns: ["service_request_id"]
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          }
        ]
      }
      service_categories: {
        Row: {
          id: string
          created_at: string
          name: string | null
          description: string | null
          icon_url: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string | null
          description?: string | null
          icon_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string | null
          description?: string | null
          icon_url?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          id: string
          client_id: string | null
          provider_id: string | null
          category_id: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          scheduled_date: string | null
          estimated_duration: number | null
          estimated_cost: number | null
          actual_cost: number | null
          created_at: string
          updated_at: string
          zip_code: string | null
          title: string | null
          description: string | null
          address: string | null
          city: string | null
          state: string | null
        }
        Insert: {
          id?: string
          client_id?: string | null
          provider_id?: string | null
          category_id?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          scheduled_date?: string | null
          estimated_duration?: number | null
          estimated_cost?: number | null
          actual_cost?: number | null
          created_at?: string
          updated_at?: string
          zip_code?: string | null
          title?: string | null
          description?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
        }
        Update: {
          id?: string
          client_id?: string | null
          provider_id?: string | null
          category_id?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          scheduled_date?: string | null
          estimated_duration?: number | null
          estimated_cost?: number | null
          actual_cost?: number | null
          created_at?: string
          updated_at?: string
          zip_code?: string | null
          title?: string | null
          description?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_provider_id_fkey"
            columns: ["provider_id"]
            referencedRelation: "provider_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type:
      | "message"
      | "request_update"
      | "payment_received"
      | "review_submitted"
      payment_status: "pending" | "completed" | "failed"
      request_status:
      | "pending"
      | "accepted"
      | "in_progress"
      | "completed"
      | "cancelled"
      user_role: "customer" | "provider" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
