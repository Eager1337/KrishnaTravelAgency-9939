import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowUpRight,
  ArrowLeft,
  Search,
  Check,
  MapPin,
  Globe2,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";
import { destinations, services, business } from "../lib/travel";
import { ClosingCTA, SectionHeading, WhatsApp } from "../components/layout";
import { DestinationCard, ServiceGrid, ServiceIcon, FAQ } from "../components/travel-ui";

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function Destinations() {
  const [region, setRegion] = useState("All");
  const [search, setSearch] = useState("");
  const matches = destinations.filter(
    (d) =>
      (region === "All" || d.region === region) &&
      `${d.name} ${d.country}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="GO SOMEWHERE THAT MOVES YOU"
        title="A world worth exploring."
        text="Start with an idea. We’ll help you turn it into a journey. These destinations are inspiration—not fixed packages or live offers."
      />
      <section className="container listing-section">
        <div className="listing-controls">
          <div className="filters">
            {["All", "Africa", "Middle East", "Europe", "Islands"].map((r) => (
              <button
                className={region === r ? "selected" : ""}
                key={r}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a destination"
              aria-label="Search destinations"
            />
          </label>
        </div>
        <div className="destination-grid">
          {matches.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
        {!matches.length && (
          <div className="empty-state">
            <Globe2 size={40} />
            <h2>Your journey isn’t limited to this list.</h2>
            <p>No matching inspiration. Ask us about the place you have in mind.</p>
            <Link href={`/quote?destination=${encodeURIComponent(search)}`} className="button">
              Ask about a destination <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
        <div className="other-destination">
          <div>
            <h3>Have somewhere else in mind?</h3>
            <p>This is just the beginning. Tell us where you’d love to go.</p>
          </div>
          <Link href="/quote" className="text-link">
            Plan something personal <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
export function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const d = destinations.find((v) => v.slug === slug);
  if (!d) return <NotFound />;
  return (
    <>
      <section className="detail-hero">
        <img src={d.image} alt={d.name} />
        <div className="detail-shade" />
        <div className="container">
          <Link href="/destinations" className="back-link">
            <ArrowLeft size={16} />
            All destinations
          </Link>
          <p className="eyebrow">
            {d.country.toUpperCase()} · {d.tag.toUpperCase()}
          </p>
          <h1>{d.name}</h1>
          <p>{d.line}</p>
        </div>
      </section>
      <section className="container section detail-grid">
        <div>
          <p className="eyebrow">
            <span /> YOUR NEXT CHAPTER
          </p>
          <h2>Make room for {d.name}.</h2>
          <p className="large-body">{d.description}</p>
          <h3>A little inspiration</h3>
          <ul className="check-list">
            {d.highlights.map((h) => (
              <li key={h}>
                <Check size={18} />
                {h}
              </li>
            ))}
          </ul>
          <h3>Before you go</h3>
          <p>{d.planning}</p>
          <p className="subtle-note">
            Activities are ideas only, not included or guaranteed. Entry rules, suppliers, transfers
            and availability must be checked for your trip.
          </p>
        </div>
        <aside className="quote-aside">
          <span className="aside-icon">
            <Globe2 size={27} />
          </span>
          <h3>Your trip. Your way.</h3>
          <p>
            No fixed package here. Let’s start with your dates, your budget and your kind of
            adventure.
          </p>
          <Link
            className="button"
            href={`/quote?service=Holidays&destination=${encodeURIComponent(d.name)}`}
          >
            Plan my {d.name} trip <ArrowUpRight size={17} />
          </Link>
          <WhatsApp className="text-link">Talk it through</WhatsApp>
          <small>
            Quotes are subject to availability.
            <br />
            No payment is taken on this site.
          </small>
        </aside>
      </section>
      <ClosingCTA />
    </>
  );
}
export function Services() {
  return (
    <>
      <PageIntro
        eyebrow="THE DETAILS, TAKEN CARE OF"
        title="One partner. More possibilities."
        text="Flights, holidays, hotels and the practical things in between. Find the support you need and start a conversation with the Freetown team."
      />
      <section className="container listing-section">
        <ServiceGrid />
        <div className="other-destination">
          <div>
            <h3>Travelling for business or as a group?</h3>
            <p>Share your itinerary, traveller count and any special requirements.</p>
          </div>
          <Link href="/quote?service=Business+travel" className="button">
            Discuss your plans <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const s = services.find((v) => v.slug === slug);
  if (!s) return <NotFound />;
  return (
    <>
      <section className="container page-intro">
        <Link href="/services" className="back-link dark">
          <ArrowLeft size={16} />
          All services
        </Link>
        <div className="large-service-icon">
          <ServiceIcon name={s.icon} size={36} />
        </div>
        <p className="eyebrow">
          <span /> {s.name.toUpperCase()}
        </p>
        <h1>{s.brief}</h1>
        <p>{s.description}</p>
      </section>
      <section className="container detail-grid listing-section">
        <div>
          <h2>How we can help</h2>
          <ul className="check-list">
            {s.includes.map((t) => (
              <li key={t}>
                <Check size={18} />
                {t}
              </li>
            ))}
          </ul>
          <div className="notice">
            <ShieldNotice />
            <div>
              <h3>Know before you book</h3>
              <p>{s.note}</p>
            </div>
          </div>
          <h3>What to share with us</h3>
          <p>
            Your destination, dates, traveller count and any preferences. For document-related
            services, start with a general enquiry—never share passport numbers, bank details or
            scans through this website.
          </p>
        </div>
        <aside className="quote-aside">
          <h3>Let’s start with your plans.</h3>
          <p>
            Tell us what you need. Agree options and terms directly with your travel consultant.
          </p>
          <Link href={`/quote?service=${encodeURIComponent(s.quote)}`} className="button">
            Enquire about {s.name.toLowerCase()} <ArrowUpRight size={17} />
          </Link>
          <WhatsApp className="text-link">Prefer a conversation?</WhatsApp>
        </aside>
      </section>
      <ClosingCTA />
    </>
  );
}
function ShieldNotice() {
  return <Check size={23} />;
}
export function About() {
  return (
    <>
      <PageIntro
        eyebrow="ROOTED IN FREETOWN. OPEN TO THE WORLD."
        title="Travel is personal. So are we."
        text="Behind every trip is a reason. A reunion. A new opportunity. A well-earned pause. We believe planning should start there."
      />
      <section className="container about-preview listing-section">
        <div className="about-collage">
          <img src="/images/maldives.webp" alt="A tropical coastline" />
          <div className="about-stamp">
            <Globe2 size={32} />
            <strong>
              Local care.
              <br />
              Global reach.
            </strong>
            <span>SINCE 2023 IN SIERRA LEONE</span>
          </div>
        </div>
        <div className="about-copy">
          <h2>
            A wider network.
            <br />A local conversation.
          </h2>
          <p>
            Krishna Travels began in Accra, Ghana in 2018. The group later expanded into Côte
            d’Ivoire, Burkina Faso, Sierra Leone and Zambia.
          </p>
          <p>
            Our Sierra Leone branch opened in 2023, bringing the company’s travel services to
            Freetown. The goal is simple: listen carefully, understand your needs and help you
            navigate your options.
          </p>
          <p>
            From air ticketing and holidays to hotels, car rentals, visa assistance and travel
            insurance enquiries, we bring the conversation back to what matters to you.
          </p>
          <WhatsApp />
        </div>
      </section>
      <section className="container section">
        <SectionHeading eyebrow="OUR JOURNEY SO FAR" title="Connected across Africa." />
        <div className="timeline">
          {[
            ["2018", "Ghana", "Where the group began"],
            ["2020", "Côte d’Ivoire", "The network grows"],
            ["2021", "Burkina Faso", "More connections"],
            ["2023", "Sierra Leone", "Hello, Freetown"],
            ["2024", "Zambia", "A wider footprint"],
          ].map(([y, c, t]) => (
            <div key={y}>
              <span>{y}</span>
              <h3>{c}</h3>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <p className="subtle-note">
          Company history as published on the Krishna Travels group website.
        </p>
      </section>
      <ClosingCTA />
    </>
  );
}
export function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="GOOD JOURNEYS START WITH A HELLO"
        title="Let’s talk about your next trip."
        text="Call, message or visit the Freetown team. For a travel quote, use the trip planner to put your ideas in one place."
      />
      <section className="container contact-grid listing-section">
        <div className="contact-info">
          <h2>Your Freetown travel partner.</h2>
          <a href={business.telephone} className="contact-row">
            <Phone />
            <span>
              <small>CALL THE TEAM</small>
              <strong>{business.phone}</strong>
            </span>
            <ArrowUpRight />
          </a>
          <a href={`mailto:${business.email}`} className="contact-row">
            <Mail />
            <span>
              <small>EMAIL US</small>
              <strong>{business.email}</strong>
            </span>
            <ArrowUpRight />
          </a>
          <a href={business.map} target="_blank" rel="noopener noreferrer" className="contact-row">
            <MapPin />
            <span>
              <small>VISIT OUR OFFICE</small>
              <strong>11 Lightfoot Boston Street</strong>
              <p>
                Opposite Standard Chartered Bank
                <br />
                Freetown, Sierra Leone
              </p>
            </span>
            <ArrowUpRight />
          </a>
          <div className="hours-note">
            <Clock3 size={19} />
            <span>
              Opening hours aren’t verified online.
              <br />
              Please call before visiting.
            </span>
          </div>
          <WhatsApp />
          <p className="subtle-note">
            Contacts sourced from the official branch page and company brochure. This is an
            independent website concept awaiting owner approval.
          </p>
        </div>
        <div className="contact-panel">
          <span className="contact-map-icon">
            <MapPin size={44} />
          </span>
          <span className="map-label">FREETOWN, SIERRA LEONE</span>
          <h3>
            Local support.
            <br />A world of possibility.
          </h3>
          <p>Find Krishna Travels on Lightfoot Boston Street, in central Freetown.</p>
          <a href={business.map} target="_blank" rel="noopener noreferrer" className="button">
            Open in Google Maps <ArrowUpRight size={18} />
          </a>
          <small>
            Opens an address-based map search.
            <br />
            Confirm the office location before travelling.
          </small>
        </div>
      </section>
      <section className="container section faq-section">
        <div>
          <p className="eyebrow">
            <span /> BEFORE YOU GET IN TOUCH
          </p>
          <h2>A little helpful clarity.</h2>
          <Link className="text-link" href="/quote">
            Request a travel quote <ArrowUpRight size={18} />
          </Link>
        </div>
        <FAQ />
      </section>
      <ClosingCTA />
    </>
  );
}
export function NotFound() {
  return (
    <div className="container empty-state">
      <Globe2 size={50} />
      <p className="eyebrow">404 · A SMALL DETOUR</p>
      <h1>This destination isn’t on our map.</h1>
      <p>The page may have moved. Let’s get you back on track.</p>
      <Link href="/" className="button">
        Back to home <ArrowRightFallback />
      </Link>
    </div>
  );
}
function ArrowRightFallback() {
  return <ArrowUpRight size={18} />;
}
