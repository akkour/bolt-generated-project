import { supabase } from '../supabase/client';
import type { AuthError, User } from '@supabase/supabase-js';
import type { Database } from '../supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row'];

export const auth = {
  /**
   * Sign up a new user and create their profile
   */
  async signUp(email: string, password: string, role: Profile['role']) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      throw authError || new Error('Failed to create user');
    }

    const profileData = {
      id: authData.user.id,
      role,
    };

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
    console.log("auth.ts: signIn - Sign-in started for email:", email); // Log sign-in start
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("auth.ts: signIn - Sign-in error:", error); // Log sign-in error
      throw error;
    }
    console.log("auth.ts: signIn - Sign-in successful, user:", data.user); // Log sign-in success
    return data;
  },

  /**
   * Sign out the current user
   */
  async signOut() {
    console.log("auth.ts: signOut - Signing out..."); // Log sign-out start
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("auth.ts: signOut - Sign-out error:", error); // Log sign-out error
      throw error;
    }
    console.log("auth.ts: signOut - Sign-out successful"); // Log sign-out success
  },

  /**
   * Get the current user's profile
   */
  async getCurrentProfile(): Promise<{ user: User | null; profile: Profile | null; error: AuthError | null }> {
    console.log("auth.ts: getCurrentProfile - Fetching current profile..."); // Log function start
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log("auth.ts: getCurrentProfile - supabase.auth.getUser() result:", { user, authError }); // Log getUser result


    if (authError || !user) {
      console.log("auth.ts: getCurrentProfile - No user from getUser, error:", authError); // Log no user from getUser
      return { user: null, profile: null, error: authError };
    }

    console.log("auth.ts: getCurrentProfile - User from getUser:", user); // Log user from getUser

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    console.log("auth.ts: getCurrentProfile - Profile data fetched:", { profile, profileError }); // Log profile fetch result


    return {
      user,
      profile,
      error: profileError,
    };
  },
    /**
   * Get user role
   */
    async getUserRole(userId: string): Promise<string | null> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("auth.ts: getUserRole - Error fetching user role:", error);
      return null;
    }

    return profile ? profile.role : null;
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
