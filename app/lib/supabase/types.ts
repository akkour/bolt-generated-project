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
      profiles: {
        Row: {
          id: string
          role: 'homeowner' | 'provider' | 'admin'
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string
          zip_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'homeowner' | 'provider' | 'admin'
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string
          zip_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'homeowner' | 'provider' | 'admin'
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string
          zip_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      provider_profiles: {
        Row: {
          id: string
          business_name: string | null
          business_description: string | null
          license_number: string | null
          insurance_info: string | null
          years_of_experience: number | null
          service_radius: number | null
          is_verified: boolean
          average_rating: number | null
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          business_name?: string | null
          business_description?: string | null
          license_number?: string | null
          insurance_info?: string | null
          years_of_experience?: number | null
          service_radius?: number | null
          is_verified?: boolean
          average_rating?: number | null
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_name?: string | null
          business_description?: string | null
          license_number?: string | null
          insurance_info?: string | null
          years_of_experience?: number | null
          service_radius?: number | null
          is_verified?: boolean
          average_rating?: number | null
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'homeowner' | 'provider' | 'admin'
      request_status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      notification_type: 'request' | 'message' | 'payment' | 'review' | 'system'
    }
  }
}
