import { useState, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import Logo from "../common/Logo";
import { auth } from "~/lib/api/auth";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { user, profile } = await auth.getCurrentProfile();
      setUser(user);
      setProfile(profile);
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        <Logo />

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</Link>
          <Link to="/providers" className="text-gray-600 hover:text-gray-900 transition-colors">For Providers</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2"
                aria-label="User menu"
              >
                <span className="rounded-full h-8 w-8 bg-gray-200 flex items-center justify-center">
                  {profile?.firstName ? profile?.firstName[0].toUpperCase() : user?.email[0].toUpperCase()}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2" aria-label="Menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
