import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SCHOOL } from "@/data/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#gurus", label: "Gurus" },
  { href: "#annual-day", label: "Annual Day" },
  { href: "#testimonials", label: "Voices" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#07050A]/85 backdrop-blur-md border-b border-[#D4C2A8]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="navbar-logo">
          <img src={SCHOOL.logo} alt="Gurukul" className="h-12 w-12 object-contain rounded-full" />
          <div className="leading-tight">
            <div className="font-serif text-xl text-[#F5E9D9]">Gurukul</div>
            <div className="kicker text-[10px]">School of Music · Bangalore</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm text-[#D4C2A8] hover:text-[#E8754B] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SCHOOL.phones[0]}`}
            className="hidden md:inline-flex items-center gap-2 text-sm text-[#D4C2A8] hover:text-[#E8754B]"
            data-testid="navbar-phone"
          >
            <Phone className="w-4 h-4" /> {SCHOOL.phones[0]}
          </a>
          <a href="#contact" className="btn-saffron text-sm hidden sm:inline-flex" data-testid="navbar-book-btn">
            Book Free Demo
          </a>
          <button
            className="lg:hidden p-2 text-[#F5E9D9]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="navbar-mobile-toggle"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#07050A] border-t border-[#D4C2A8]" data-testid="navbar-mobile-menu">
          <div className="px-6 py-5 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base text-[#D4C2A8]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href={`tel:${SCHOOL.phones[0]}`} className="text-sm text-[#E8754B] mt-2">
              Call {SCHOOL.phones[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
