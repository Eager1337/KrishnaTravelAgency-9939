import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  MapPin,
  Mail,
  Globe2,
  MoveUpRight,
  MessageCircle,
} from "lucide-react";
import { business, whatsapp } from "../lib/travel";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Krishna Travels home"
    >
      <span className="brand-mark">
        <MoveUpRight size={28} strokeWidth={2.2} />
        <i />
      </span>
      <span>
        KRISHNA<span className="brand-sub">T R A V E L S</span>
      </span>
    </Link>
  );
}
export function WhatsApp({
  className = "button",
  children = "Let’s talk travel",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a className={className} href={whatsapp()} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={18} />
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container">
          <span>
            <MapPin size={12} />
            Your local travel partner in Freetown
          </span>
          <a href={business.telephone}>
            <Phone size={12} />
            {business.phone}
            <span className="topbar-extra"> • Let’s plan your next journey</span>
          </a>
        </div>
      </div>
      <header className="header">
        <div className="container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {[
              ["/", "Home"],
              ["/destinations", "Destinations"],
              ["/services", "Our services"],
              ["/about", "About us"],
              ["/contact", "Contact"],
            ].map(([href, text]) => (
              <Link key={href} href={href} className={location === href ? "active" : ""}>
                {text}
              </Link>
            ))}
          </nav>
          <Link className="button nav-cta" href="/quote">
            Plan my trip <ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {[
              ["/", "Home"],
              ["/destinations", "Destinations"],
              ["/services", "Our services"],
              ["/about", "About us"],
              ["/contact", "Contact"],
              ["/track", "Track enquiry"],
              ["/quote", "Plan my trip"],
            ].map(([href, text]) => (
              <Link key={href} href={href}>
                {text}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-intro">
            <Brand light />
            <p>
              From Freetown to wherever life takes you.
              <br />
              Travel thoughtfully. Go further.
            </p>
            <span className="footer-location">
              <Globe2 size={16} /> Sierra Leone · Part of Krishna Travels
            </span>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/destinations">Destinations</Link>
            <Link href="/services">Our services</Link>
            <Link href="/about">Our story</Link>
            <Link href="/quote">Request a quote</Link>
            <Link href="/track">Track your enquiry</Link>
          </div>
          <div>
            <h4>Travel support</h4>
            <Link href="/services/flights">Flight enquiries</Link>
            <Link href="/services/visa">Visa assistance</Link>
            <Link href="/services/holidays">Holiday planning</Link>
            <Link href="/services/insurance">Travel insurance</Link>
            <Link href="/contact">FAQs & contact</Link>
          </div>
          <div className="footer-contact">
            <h4>Say hello in Freetown</h4>
            <a href={business.telephone}>
              <Phone size={15} />
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`}>
              <Mail size={15} />
              {business.email}
            </a>
            <a href={business.map} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} />
              <span>
                11 Lightfoot Boston Street
                <br />
                Opposite Standard Chartered Bank
              </span>
            </a>
            <a
              className="footer-whatsapp"
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Krishna Travels. Freetown website concept.</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms of use</Link>
            <a href="https://krishna-travels.in/" target="_blank" rel="noopener noreferrer">
              Group website <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </footer>
      <a
        className="floating-chat"
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Krishna Travels on WhatsApp"
      >
        <MessageCircle size={25} />
        <span>Talk to a travel expert</span>
      </a>
    </>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {text && <p className="section-description">{text}</p>}
      </div>
      {children}
    </div>
  );
}
export function ClosingCTA() {
  return (
    <section className="closing container">
      <div className="closing-orbit" />
      <div>
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Wherever you’re dreaming of,
          <br />
          let’s get you there.
        </h2>
        <p>A real conversation. A trip that feels like you.</p>
      </div>
      <div className="closing-actions">
        <Link href="/quote" className="button button-lime">
          Let’s plan my trip <ArrowUpRight size={19} />
        </Link>
        <a href={business.telephone}>Or call {business.phone}</a>
      </div>
    </section>
  );
}
