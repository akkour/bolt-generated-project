import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export const meta: MetaFunction = () => {
  return [
    { title: "PennFix - Professional Home Services in Pennsylvania" },
    { name: "description", content: "Connect with verified local service providers for your home repair and maintenance needs in Pennsylvania." },
  ];
};

const services = [
  {
    title: "Plumbing",
    description: "Expert plumbing services for all your needs",
    icon: "🔧",
    color: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Electrical",
    description: "Professional electrical repairs and installations",
    icon: "⚡",
    color: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    title: "HVAC",
    description: "Heating, ventilation, and air conditioning services",
    icon: "❄️",
    color: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    title: "Cleaning",
    description: "Professional cleaning services for your home",
    icon: "🧹",
    color: "bg-purple-50",
    textColor: "text-purple-600",
  },
];

const features = [
  {
    title: "Verified Professionals",
    description: "All service providers are thoroughly vetted and background-checked",
    icon: "✓",
  },
  {
    title: "Instant Booking",
    description: "Book services instantly with our easy-to-use platform",
    icon: "📅",
  },
  {
    title: "Secure Payments",
    description: "Safe and secure payment processing for all services",
    icon: "🔒",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Professional Home Services at Your Fingertips
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with verified local service providers for all your home maintenance needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-primary px-8 py-4 rounded-2xl text-lg">
                Book a Service
              </Link>
              <Link to="/signup" className="btn-secondary px-8 py-4 rounded-2xl text-lg">
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`p-6 rounded-2xl ${service.color} transition-transform hover:scale-105`}>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${service.textColor}`}>{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <Link to={`/services/${service.title.toLowerCase()}`} className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700">
                  Learn more <ChevronRightIcon className="w-5 h-5 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PennFix</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 text-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust PennFix for their home service needs
          </p>
          <Link to="/signup" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-primary-50 transition-colors">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
