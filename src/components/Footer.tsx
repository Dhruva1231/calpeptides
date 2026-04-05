import logo from "@/assets/logo.png";

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <img src={logo} alt="CAL Peptides" className="h-12 w-auto object-contain brightness-0 invert" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider opacity-70">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm opacity-80">
              <li><button onClick={() => scrollTo("#shop")} className="hover:opacity-100 transition-opacity">Shop</button></li>
              <li><button onClick={() => scrollTo("#coas")} className="hover:opacity-100 transition-opacity">COAs & Test Results</button></li>
              <li><button onClick={() => scrollTo("#faq")} className="hover:opacity-100 transition-opacity">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider opacity-70">Company</h4>
            <ul className="mt-3 space-y-2 text-sm opacity-80">
              <li><button onClick={() => scrollTo("#about")} className="hover:opacity-100 transition-opacity">About Us</button></li>
              <li><button onClick={() => scrollTo("#home")} className="hover:opacity-100 transition-opacity">Contact</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} CAL Peptides. All rights reserved. For research use only.
        </div>
      </div>
    </footer>
  );
}
