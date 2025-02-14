import { supabase } from '../supabase/client';
import { profiles } from './profiles'; // Import profiles API

export const auth = {
  async getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user ?? null;
  },

  async getCurrentProfile() {
    console.log("auth.ts: getCurrentProfile -  Fetching current profile..."); // Added log
    const sessionResult = await supabase.auth.getSession(); // Get full session result
    console.log("auth.ts: getCurrentProfile -  Session data:", sessionResult); // Log session data
    const session = sessionResult.data.session; // Use session from result
    const user = session?.user ?? null;


    if (!user) {
      console.log("auth.ts: getCurrentProfile -  No user in session."); // Log no user
      return { user: null, profile: null, error: null };
    }

    try {
      let profileData;
      const basicProfile = await profiles.getProfile(user.id); // Fetch basic profile first

      if (basicProfile?.role === 'provider') {
        profileData = await profiles.getProviderProfile(user.id); // Fetch provider profile if role is provider
      } else {
        profileData = basicProfile; // Otherwise, use the basic profile
      }

      return { user: user, profile: profileData, error: null };
    } catch (error: any) {
      console.error("auth.ts: getCurrentProfile - Error fetching current profile:", error);
      return { user: user, profile: null, error: error.message };
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      console.log("auth.ts: signIn -  Attempting to sign in user with email:", email);
      console.log("auth.ts: signIn - Calling supabase.auth.signInWithPassword...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log("auth.ts: signIn - supabase.auth.signInWithPassword returned:", { data, error });


      if (error) {
        console.error("auth.ts: signIn -  Sign-in error:", error);
        throw error;
      }
      console.log("auth.ts: signIn -  Sign-in successful, user:", data.user);
      return { user: data.user, error: null };
    } catch (error) {
      console.error("auth.ts: signIn -  Error during sign-in:", error);
      return { user: null, error: error };
    }
  },

  async signUp(email, password, accountType) {
    try {
      console.log("auth.ts: signUp - Attempting to sign up user with email:", email, "and account type:", accountType);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error("auth.ts: signUp - Signup error:", error);
        throw error;
      }

      console.log("auth.ts: signUp - Signup successful, user:", data.user);

      // After successful signup, create a user profile
      if (data.user) {
        console.log("auth.ts: signUp - Creating profile for user:", data.user.id, "with account type:", accountType);
        await profiles.createProfile(data.user.id, email, accountType);
        console.log("auth.ts: signUp - Profile created successfully.");
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error("auth.ts: signUp - Error during signup:", error);
      return { user: null, error: error };
    }
  },
};
