import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import BookingModal from "./BookingModal";

const LOGO_SRC = "/assets/generated/worldgate-logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Countries", to: "/countries" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

function AuthButton({ className }: { className?: string }) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = useCallback(async () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      try {
        login();
      } catch (err) {
        if (
          err instanceof Error &&
          err.message === "User is already authenticated"
        ) {
          clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  }, [isAuthenticated, login, clear, queryClient]);

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={handleAuth}
        className={`flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white border border-white/30 hover:border-white/60 rounded-full px-4 py-2 transition-all duration-200 ${className ?? ""}`}
        data-ocid="nav.secondary_button"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAuth}
      disabled={isLoggingIn}
      className={`flex items-center gap-2 text-sm font-medium text-white border border-white/60 hover:border-gold hover:text-gold rounded-full px-4 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ""}`}
      data-ocid="nav.secondary_button"
    >
      <LogIn className="w-4 h-4" />
      {isLoggingIn ? "Logging in..." : "Login"}
    </button>
  );
}

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
              className="flex items-center gap-2 flex-shrink-0"
              data-ocid="nav.link"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <img
                  src={LOGO_SRC}
                  alt="WorldGate Global Logo"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg leading-none">
                  <span className="text-gold">WorldGate</span>
                  <span className="text-white"> Global</span>
                </span>
                <span className="text-white/70 text-[10px] uppercase tracking-widest">
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
                    currentPath === link.to ? "text-gold" : "text-white"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <AuthButton />
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
                  currentPath === link.to ? "text-gold" : "text-white"
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
            <div className="mt-3">
              <AuthButton className="w-full justify-center" />
            </div>
          </div>
        )}
      </header>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
