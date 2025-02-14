import { Link } from "@remix-run/react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">PF</span>
              </div>
              <span className="text-2xl font-bold text-white">PennFix</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting homeowners with qualified service providers across Pennsylvania.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <span className="text-xl">💼</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <span className="text-xl">🐦</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link to="/services/plumbing" className="hover:text-primary-400 transition-colors">Plumbing</Link></li>
              <li><Link to="/services/electrical" className="hover:text-primary-400 transition-colors">Electrical</Link></li>
              <li><Link to="/services/hvac" className="hover:text-primary-400 transition-colors">HVAC</Link></li>
              <li><Link to="/services/cleaning" className="hover:text-primary-400 transition-colors">Cleaning</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/help" className="hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} PennFix. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
