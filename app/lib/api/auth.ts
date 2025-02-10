import { supabase } from '../supabase/client';
import type { AuthError, User } from '@supabase/supabase-js';
import type { Database } from '../supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const auth = {
  /**
   * Sign up a new user and create their profile
   */
  async signUp(email: string, password: string, role: Profile['role'], profile: Partial<Profile>) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      throw authError || new Error('Failed to create user');
    }

    // Remove email from profile creation
    const profileData = {
      id: authData.user.id,
      role,
      ...profile,
    };
    delete profileData.email; // Ensure email is not included

    const { error: profileError } = await supabase
      .from('profiles')
      .insert(profileData);


    if (profileError) {
      throw profileError;
    }

    return authData.user;
  },

  /**
   * Sign in an existing user
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out the current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get the current user's profile
   */
  async getCurrentProfile(): Promise<{ user: User | null; profile: Profile | null; error: AuthError | null }> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { user: null, profile: null, error: authError };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return {
      user,
      profile,
      error: profileError,
    };
  },

  /**
   * Reset Password
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // Replace with your actual update password route
    });

    if (error) {
      throw error;
    }
  },
}
