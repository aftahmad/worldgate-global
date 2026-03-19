import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Countries", to: "/countries" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy shadow-lg" : "bg-navy/95"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0"
              data-ocid="nav.link"
            >
              <img
                src="/assets/uploads/ChatGPT-Image-Mar-18-2026-03_26_41-PM-1.png"
                alt="WorldGate Global Logo"
                className="w-32 h-32 object-contain"
                style={{ marginRight: "-18px" }}
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg leading-none">
                  <span className="text-gold">WorldGate</span>
                  <span className="text-gold"> Global</span>
                </span>
                <span className="text-white text-[10px] uppercase tracking-widest">
                  Immigration & Visa Services
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    currentPath === link.to ? "text-gold" : "text-gold"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Button
                onClick={() => setBookingOpen(true)}
                className="bg-gold hover:bg-gold-light text-navy font-semibold px-5 py-2 rounded-full shadow-gold"
                data-ocid="nav.primary_button"
              >
                Get Free Assessment
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-navy-light border-t border-white/10 py-4 px-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-sm font-medium border-b border-white/10 last:border-0 transition-colors hover:text-gold ${
                  currentPath === link.to ? "text-gold" : "text-gold"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setBookingOpen(true);
                setMobileOpen(false);
              }}
              className="w-full mt-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-full"
              data-ocid="nav.primary_button"
            >
              Get Free Assessment
            </Button>
          </div>
        )}
      </header>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
