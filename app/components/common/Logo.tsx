import { Link } from "@remix-run/react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M16 2L3 9L16 16L29 9L16 2Z"
          fill="#2563EB"
          className="text-primary-600"
        />
        <path
          d="M3 23L16 30L29 23V9L16 16L3 9V23Z"
          fill="#1D4ED8"
          fillOpacity="0.8"
          className="text-primary-700"
        />
        <path
          d="M11 14L16 16.5L21 14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-none">PennFix</span>
        <span className="text-xs text-gray-600 leading-none">Home Services</span>
      </div>
    </Link>
  );
}
