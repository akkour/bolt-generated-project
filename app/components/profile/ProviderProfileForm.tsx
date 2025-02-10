import { useState } from "react";
import type { Database } from "~/lib/supabase/types";
import { supabase } from "~/lib/supabase/client";

type Profile = Database['public']['Tables']['profiles']['Row'];

type ProviderProfileFormProps = {
  user: {
    id: string;
    email: string | null;
  };
  profile: Profile | null;
};

export function ProviderProfileForm({ user, profile }: ProviderProfileFormProps) {
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  // Add provider-specific fields
  const [serviceDescription, setServiceDescription] = useState(profile?.service_description || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(profile?.years_of_experience || 0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const updates = {
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        service_description: serviceDescription,
        years_of_experience: yearsOfExperience,
        updated_at: new Date(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="serviceDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Service Description
        </label>
        <div className="mt-1">
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="yearsOfExperience"
          className="block text-sm font-medium text-gray-700"
        >
          Years of Experience
        </label>
        <div className="mt-1">
          <input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(parseInt(e.target.value))}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}
