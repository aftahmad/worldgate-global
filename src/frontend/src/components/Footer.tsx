import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const SOCIAL_LINKS = [
  { Icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: SiX, href: "https://x.com", label: "X" },
  { Icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div
              className="flex items-center mb-4"
              style={{ marginLeft: "-12px" }}
            >
              <img
                src="/assets/uploads/ChatGPT-Image-Mar-18-2026-03_26_41-PM-1.png"
                alt="WorldGate Global Logo"
                className="w-20 h-20 object-contain flex-shrink-0"
                style={{ marginRight: "-8px" }}
              />
              <div className="flex flex-col leading-tight">
                <div className="font-bold text-lg leading-none">
                  <span className="text-gold">WorldGate</span>
                  <span className="text-gold"> Global</span>
                </div>
                <div className="text-white text-[10px] uppercase tracking-widest">
                  Immigration & Visa Services
                </div>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-4">
              Your trusted partner for global visas and immigration services.
              Based in New Delhi, serving clients across India since 2015.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Countries", to: "/countries" },
                { label: "Testimonials", to: "/testimonials" },
                { label: "Blog", to: "/blog" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/65 hover:text-gold text-sm transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Services</h4>
            <ul className="space-y-2 text-white/65 text-sm">
              {[
                "Tourist & Visitor Visas",
                "Immigration Consultancy",
                "Work Visas & Jobs",
                "Hajj & Umrah Packages",
                "Canada PR Immigration",
                "Australia PR Immigration",
                "Germany Opportunity Card",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: "+91 99999 99999" },
                { icon: Mail, text: "info@worldgateglobal.com" },
                {
                  icon: MapPin,
                  text: "123 Business Hub, New Delhi, India 110001",
                },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/65 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-sm">
          <span>© {year} WorldGate Global. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
