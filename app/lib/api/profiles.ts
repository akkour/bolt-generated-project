import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row'];

export const profiles = {
  /**
   * Create a user profile
   */
  async createProfile(id: string, email: string, role: string) {
    console.log("profiles.ts: createProfile -  Start creating profile for user ID:", id, "role:", role, "email:", email); // Log start
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ id, email, role }]) // Include email in insert
        .select()
        .single();

      if (error) {
        console.error("profiles.ts: createProfile -  Error inserting profile:", error); // Log error if insertion fails
        throw error;
      }
      console.log("profiles.ts: createProfile -  Profile created successfully for user ID:", id); // Log success
      return data;
    } catch (error) {
      console.error("profiles.ts: createProfile -  Exception during profile creation:", error); // Log any exceptions
      throw error;
    }
  },

  /**
   * Get a user's profile by ID
   */
  async getProfile(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update a user's profile
   */
  async updateProfile(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get a provider's complete profile
   */
  async getProviderProfile(id: string): Promise<(Profile & { provider_profiles: ProviderProfile | null }) | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        provider_profiles(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update or Insert a provider's profile
   */
  async updateProviderProfile(id: string, updates: Partial<ProviderProfile>) {
    console.log("updateProviderProfile updates:", updates);

    // First, check if a provider profile already exists for this user ID
    const existingProfile = await profiles.getProviderProfile(id);

    if (existingProfile && existingProfile.provider_profiles) {
      // If a profile exists, update the existing row
      const { data, error } = await supabase
        .from('provider_profiles')
        .update(updates)
        .eq('id', existingProfile.provider_profiles.id) // Use 'id' to match the provider_profiles primary key
        .select()
        .single();

      if (error) {
        console.error("Error updating provider profile:", error);
        throw error;
      }
      return data;
    } else {
      // If no profile exists, insert a new row, explicitly setting the 'id' to the user's id
      const { data, error } = await supabase
        .from('provider_profiles')
        .insert([{ id: id, ...updates }]) // Explicitly set id here
        .select()
        .single();

      if (error) {
        console.error("Error inserting provider profile:", error);
        throw error;
      }
      return data;
    }
  },
}
