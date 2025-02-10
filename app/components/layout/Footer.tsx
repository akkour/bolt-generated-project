import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">PennFix</h3>
            <p className="text-sm">Connecting homeowners with qualified service providers across Pennsylvania.</p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/plumbing" className="hover:text-white">Plumbing</Link></li>
              <li><Link to="/services/electrical" className="hover:text-white">Electrical</Link></li>
              <li><Link to="/services/hvac" className="hover:text-white">HVAC</Link></li>
              <li><Link to="/services/carpentry" className="hover:text-white">Carpentry</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/licenses" className="hover:text-white">Licensing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} PennFix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
