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
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [businessName, setBusinessName] = useState(profile?.provider_profiles?.business_name ?? "");
  const [businessDescription, setBusinessDescription] = useState(profile?.provider_profiles?.business_description ?? "");
  const [yearsOfExperience, setYearsOfExperience] = useState(profile?.provider_profiles?.years_of_experience ?? 0);
  const [licenseNumber, setLicenseNumber] = useState(profile?.provider_profiles?.license_number ?? "");
  const [insuranceInfo, setInsuranceInfo] = useState(profile?.provider_profiles?.insurance_info ?? ""); // Updated state name
  const [serviceRadius, setServiceRadius] = useState(profile?.provider_profiles?.service_radius ?? 0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  // useEffect is still needed for updates to the profile prop *after* initial render
  useEffect(() => {
    console.log("useEffect - profile prop updated:", profile);
    setFirstName(profile?.first_name ?? "");
    setLastName(profile?.last_name ?? "");
    setPhone(profile?.phone ?? "");
    setBusinessName(profile?.provider_profiles?.business_name ?? "");
    setBusinessDescription(profile?.provider_profiles?.business_description ?? "");
    setYearsOfExperience(profile?.provider_profiles?.years_of_experience ?? 0);
    setLicenseNumber(profile?.provider_profiles?.license_number ?? "");
    setInsuranceInfo(profile?.provider_profiles?.insurance_info ?? ""); // Updated state name
    setServiceRadius(profile?.provider_profiles?.service_radius ?? 0);
    console.log("useEffect - state updated from profile prop");
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    // Persist form data to session storage
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("businessName", businessName);
    sessionStorage.setItem("businessDescription", businessDescription);
    sessionStorage.setItem("yearsOfExperience", String(yearsOfExperience)); // Convert number to string
    sessionStorage.setItem("licenseNumber", licenseNumber);
    sessionStorage.setItem("insuranceInfo", insuranceInfo); // Updated storage key
    sessionStorage.setItem("serviceRadius", String(serviceRadius)); // Convert number to string


    try {
      const profileUpdates = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      };
      console.log("handleSubmit - Updating profile with:", profileUpdates); // Log profileUpdates BEFORE updateProfile call
      const profileResult = await profiles.updateProfile(user.id, profileUpdates);
      console.log("handleSubmit - Profile update result:", profileResult); // Log profileResult AFTER updateProfile call
      console.log("handleSubmit - Profile updated successfully");

      const providerProfileUpdates = {
        business_name: businessName,
        business_description: businessDescription,
        years_of_experience: yearsOfExperience,
        license_number: licenseNumber,
        insurance_info: insuranceInfo, // Updated column name
        service_radius: serviceRadius,
      };
      console.log("handleSubmit - Updating provider profile with:", providerProfileUpdates); // Log providerProfileUpdates BEFORE updateProviderProfile call
      const providerProfileResult = await profiles.updateProviderProfile(user.id, providerProfileUpdates);
      console.log("handleSubmit - Provider profile update result:", providerProfileResult); // Log providerProfileResult AFTER updateProviderProfile call


      setMessage("Profile updated successfully!");
      sessionStorage.clear(); // Clear session storage after successful update
      setIsEditing(false); // Disable edit mode after successful update
      // window.location.reload(); // Refresh the dashboard - Removed for state based refresh
      // Refetch profile and update state
      console.log("handleSubmit - Fetching updated profile..."); // Log before fetching
      const updatedProfileData = await profiles.getProviderProfile(user.id);
      console.log("handleSubmit - Fetched updated profile data:", updatedProfileData); // Log updatedProfileData
      if (updatedProfileData) {
        console.log("handleSubmit - Updating state with fetched data:", updatedProfileData); // Log before state updates
        setFirstName(updatedProfileData.first_name || "");
        console.log("handleSubmit - setFirstName state updated:", updatedProfileData.first_name);
        setLastName(updatedProfileData.last_name || "");
        console.log("handleSubmit - setLastName state updated:", updatedProfileData.last_name);
        setPhone(updatedProfileData.phone || "");
        console.log("handleSubmit - setPhone state updated:", updatedProfileData.phone);
        setBusinessName(updatedProfileData.provider_profiles?.business_name || "");
        console.log("handleSubmit - setBusinessName state updated:", updatedProfileData.provider_profiles?.business_name);
        setBusinessDescription(updatedProfileData.provider_profiles?.business_description || "");
        console.log("handleSubmit - setBusinessDescription state updated:", updatedProfileData.provider_profiles?.business_description);
        setYearsOfExperience(updatedProfileData.provider_profiles?.years_of_experience || 0);
        console.log("handleSubmit - setYearsOfExperience state updated:", updatedProfileData.provider_profiles?.years_of_experience);
        setLicenseNumber(updatedProfileData.provider_profiles?.license_number || "");
        console.log("handleSubmit - setLicenseNumber state updated:", updatedProfileData.provider_profiles?.license_number);
        setInsuranceInfo(updatedProfileData.provider_profiles?.insurance_info || "");
        console.log("handleSubmit - setInsuranceInfo state updated:", updatedProfileData.provider_profiles?.insurance_info);
        setServiceRadius(updatedProfileData.provider_profiles?.service_radius || 0);
        console.log("handleSubmit - setServiceRadius state updated:", updatedProfileData.provider_profiles?.service_radius);
        console.log("handleSubmit - State updated successfully"); // Log after state updates
      } else {
        console.log("handleSubmit - updatedProfileData is null or undefined, state not updated.");
      }


    } catch (error: any) {
      setMessage(error.message || "Failed to update profile.");
      console.error("handleSubmit - Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode when Edit button is clicked
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Disable edit mode when Cancel button is clicked
    setMessage(''); // Clear any messages
    // Optionally, reset form values to the last saved profile data here
    setFirstName(profile?.first_name ?? "");
    setLastName(profile?.last_name ?? "");
    setPhone(profile?.phone ?? "");
    setBusinessName(profile?.provider_profiles?.business_name ?? "");
    setBusinessDescription(profile?.provider_profiles?.business_description ?? "");
    setYearsOfExperience(profile?.provider_profiles?.years_of_experience ?? 0);
    setLicenseNumber(profile?.provider_profiles?.license_number ?? "");
    setInsuranceInfo(profile?.provider_profiles?.insurance_info ?? "");
    setServiceRadius(profile?.provider_profiles?.service_radius ?? 0);
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="updateProfileForm">
      {message && <p className="text-sm text-green-600">{message}</p>}
      {!isEditing && (
        <div className="mb-4">
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            id="editProfileButton"
          >
            Edit Profile
          </button>
        </div>
      )}

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
            disabled={!isEditing} // Disable when not editing
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
            disabled={!isEditing} // Disable when not editing
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <div className="mt-1">
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditing} // Disable when not editing
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
            disabled={!isEditing} // Disable when not editing
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
            disabled={!isEditing} // Disable when not editing
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
            onChange={(e) => setYearsOfExperience(Number(e.target.value))}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditing} // Disable when not editing
          />
        </div>
      </div>

      <div>
        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
          License Number
        </label>
        <div className="mt-1">
          <input
            id="licenseNumber"
            name="licenseNumber"
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditing} // Disable when not editing
          />
        </div>
      </div>

      <div>
        <label htmlFor="insuranceInfo" className="block text-sm font-medium text-gray-700">
          Insurance Info
        </label>
        <div className="mt-1">
          <input
            id="insuranceInfo"
            name="insuranceInfo"
            type="text"
            value={insuranceInfo}
            onChange={(e) => setInsuranceInfo(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditing} // Disable when not editing
          />
        </div>
      </div>

      <div>
        <label htmlFor="serviceRadius" className="block text-sm font-medium text-gray-700">
          Service Radius
        </label>
        <div className="mt-1">
          <input
            id="serviceRadius"
            name="serviceRadius"
            type="number"
            value={serviceRadius}
            onChange={(e) => setServiceRadius(Number(e.target.value))}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditing} // Disable when not editing
          />
        </div>
      </div>

      {isEditing && (
        <div className="pt-4 flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
            id="updateProfileButton"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCancelClick}
            disabled={loading}
            id="cancelEditButton"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
