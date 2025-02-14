import { useState, useEffect } from "react";
import type { Database } from "~/lib/supabase/types";
import { supabase } from "~/lib/supabase/client";

type Profile = Database['public']['Tables']['profiles']['Row'];

type CustomerProfileFormProps = {
  user: {
    id: string;
    email: string | null;
  };
  profile: Profile | null;
  isEditing: boolean; // Receive isEditing prop
  setIsEditing: (editing: boolean) => void; // Receive setIsEditing prop function
};

export function CustomerProfileForm({ user, profile, isEditing, setIsEditing }: CustomerProfileFormProps) { // Receive props
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    console.log("CustomerProfileForm:useEffect - Profile prop received:", profile);
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setState(profile.state || "");
      setZipCode(profile.zip_code || "");
    }
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!firstName || !lastName || !phone || !address || !city || !state || !zipCode) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const updates = {
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        city,
        state,
        zip_code: zipCode,
        updated_at: new Date(),
      };
      console.log("CustomerProfileForm:handleSubmit - Updates payload:", updates);

      const { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        console.error("CustomerProfileForm:handleSubmit - Profile update error:", error);
        setFormError(`Failed to update profile: ${error.message}`);
        return;
      }

      alert("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode on successful update - use prop function
      window.location.reload(); // Refresh the dashboard to show updated profile
    } catch (error: any) {
      console.error("CustomerProfileForm:handleSubmit - Unexpected error:", error);
      setFormError(`An unexpected error occurred: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode - use prop function
    if (profile) {
      // Reset form fields to the original profile data
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setState(profile.state || "");
      setZipCode(profile.zip_code || "");
    } else {
      // Clear form fields if no profile data was initially loaded
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");
      setZipCode("");
    }
  };


  console.log("CustomerProfileForm:Component - Profile prop received:", profile);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There was an error updating your profile:</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{formError}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <div className="mt-1">
          <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <div className="mt-1">
          <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <div className="mt-1">
          <input id="phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <div className="mt-1">
          <input id="address" name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <div className="mt-1">
          <input id="city" name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <div className="mt-1">
          <input id="state" name="state" type="text" value={state} onChange={(e) => setState(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <div className="mt-1">
          <input id="zipCode" name="zipCode" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" required disabled={!isEditing} /> {/* Disabled based on isEditing prop */}
        </div>
      </div>
      <div className="pt-4 flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={!isEditing} // Disable Update button when not editing
          id="updateProfileButton"
        >
          Update Profile
        </button>
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCancel}
          disabled={!isEditing} // Disable Cancel button when not editing
          id="cancelEditButton"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
