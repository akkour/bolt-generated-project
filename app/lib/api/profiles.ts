import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row'];

export const profiles = {
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
   * Update a provider's profile
   */
  async updateProviderProfile(id: string, updates: Partial<ProviderProfile>) {
    console.log("updateProviderProfile updates:", updates); // Log updates in updateProviderProfile
    const { data, error } = await supabase
      .from('provider_profiles')
      .update(updates)
      .eq('id', id) // Changed back to 'id'
      .select()
      .single();

    if (error) {
      console.error("Error updating provider profile:", error); // Log Supabase error
      throw error;
    }
    return data;
  },
}
