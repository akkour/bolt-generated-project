import { Link } from "@remix-run/react";
import React from 'react';
import { auth } from "~/lib/api/auth";

interface HeaderProps {
  currentUser: any;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const handleSignOut = async () => {
    await auth.signOut();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white py-4 fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">PF</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              PennFix
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/how-it-works" className="nav-link">How It Works</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-xl border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
