import { useState, useEffect } from "react";
import type { Database } from "~/lib/supabase/types";
import { profiles } from "~/lib/api/profiles";

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row'];

type ProviderProfileFormProps = {
  user: {
    id: string;
    email: string | null;
  };
  profile: (Profile & { provider_profiles: ProviderProfile | null }) | null;
};

export function ProviderProfileForm({ user, profile }: ProviderProfileFormProps) {
  // Initialize state directly from profile, using nullish coalescing operator
  const [firstName, setFirstName] = useState(profile?.first_name ?? "");
  const [lastName, setLastName] = useState(profile?.last_name ?? "");
  const [businessName, setBusinessName] = useState(profile?.provider_profiles?.business_name ?? "");
  const [businessDescription, setBusinessDescription] = useState(profile?.provider_profiles?.business_description ?? "");
  const [yearsOfExperience, setYearsOfExperience] = useState(profile?.provider_profiles?.years_of_experience ?? 0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // useEffect is still needed for updates to the profile prop *after* initial render
  useEffect(() => {
    setFirstName(profile?.first_name ?? "");
    setLastName(profile?.last_name ?? "");
    setBusinessName(profile?.provider_profiles?.business_name ?? "");
    setBusinessDescription(profile?.provider_profiles?.business_description ?? "");
    setYearsOfExperience(profile?.provider_profiles?.years_of_experience ?? 0);
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    // Persist form data to session storage
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("businessName", businessName);
    sessionStorage.setItem("businessDescription", businessDescription);
    sessionStorage.setItem("yearsOfExperience", String(yearsOfExperience)); // Convert number to string

    try {
      const profileUpdates = {
        first_name: firstName,
        last_name: lastName,
      };
      await profiles.updateProfile(user.id, profileUpdates);

      const providerProfileUpdates = {
        business_name: businessName,
        business_description: businessDescription,
        years_of_experience: yearsOfExperience,
      };
      console.log("providerProfileUpdates:", providerProfileUpdates); // Log providerProfileUpdates
      const providerProfileResult = await profiles.updateProviderProfile(user.id, providerProfileUpdates);
      console.log("providerProfileResult:", providerProfileResult); // Log providerProfileResult

      setMessage("Profile updated successfully!");
      sessionStorage.clear(); // Clear session storage after successful update
      window.location.reload(); // Refresh the dashboard
    } catch (error: any) {
      setMessage(error.message || "Failed to update profile.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="updateProfileForm">
      {message && <p className="text-sm text-green-600">{message}</p>}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <div className="mt-1">
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <div className="mt-1">
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <div className="mt-1">
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">
          Business Description
        </label>
        <div className="mt-1">
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <div className="mt-1">
          <input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
          id="updateProfileButton"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
}
