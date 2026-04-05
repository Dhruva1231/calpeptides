import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Shop", href: "#shop" },
  { label: "COAs and Test Results", href: "#coas" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CAL Peptides" className="h-16 w-auto object-contain bg-white" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-muted hover:text-primary/80"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 sm:inline-flex">
            Contact Us
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" className="text-primary hover:bg-muted">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Sign In" className="text-primary hover:bg-muted">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-primary transition-colors hover:bg-muted"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
