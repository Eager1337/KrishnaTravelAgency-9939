import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Globe2,
  Headphones,
  ShieldCheck,
  Sparkles,
  Check,
  MessageCircle,
} from "lucide-react";
import { SectionHeading, ClosingCTA, WhatsApp } from "../components/layout";
import { Planner, DestinationCard, ServiceGrid, FAQ } from "../components/travel-ui";
import { destinations } from "../lib/travel";

export default function Home() {
  const [filter, setFilter] = useState("All destinations");
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/images/hero.webp"
          alt="A palm-fringed Maldives island surrounded by a turquoise lagoon"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="hero-eyebrow">
            <span /> BIG DREAMS. BEAUTIFULLY PLANNED.
          </p>
          <h1>
            The world is calling.
            <br />
            Make it <em>your</em>
            <br />
            next story.
          </h1>
          <p className="hero-description">
            From your first idea to your next adventure.
            <br />
            Your trusted travel partner, right here in Freetown.
          </p>
          <div className="hero-actions">
            <Link href="/destinations" className="button button-lime">
              Explore destinations <ArrowUpRight size={18} />
            </Link>
            <a href="#how-it-works" className="hero-secondary">
              <span>
                <ArrowRight size={16} />
              </span>
              Travel made personal
            </a>
          </div>
          <div className="hero-note">
            <MapPin size={14} /> BASED IN FREETOWN. CONNECTED TO THE WORLD.
          </div>
        </div>
        <div className="hero-postcard">
          <MapPin size={14} />
          <span>
            Somewhere worth dreaming of<strong>The Maldives</strong>
          </span>
        </div>
        <div className="hero-bottom">
          GOOD JOURNEYS START WITH GOOD PEOPLE <span>01 — 04</span>
        </div>
      </section>
      <div className="container planner-wrap">
        <Planner />
      </div>
      <div className="container trust-strip">
        <div>
          <Headphones />
          <span>
            <strong>People, not just a platform</strong>
            <small>Talk to a real travel consultant</small>
          </span>
        </div>
        <div>
          <MapPin />
          <span>
            <strong>Local roots. Global possibilities.</strong>
            <small>Your Freetown travel partner</small>
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <strong>Thoughtfully planned travel</strong>
            <small>Clear options, personal guidance</small>
          </span>
        </div>
      </div>
      <section className="section container destinations-section">
        <SectionHeading
          eyebrow="A WORLD OF POSSIBILITIES"
          title="Where will your story take you?"
          text="A city you’ve always imagined. An island you didn’t know you needed."
        >
          <Link className="text-link" href="/destinations">
            All destinations <ArrowUpRight size={18} />
          </Link>
        </SectionHeading>
        <div className="filters" aria-label="Filter destinations">
          {["All destinations", "Africa", "Middle East", "Europe", "Islands"].map((f) => (
            <button key={f} className={filter === f ? "selected" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
          <span>INSPIRATION FOR YOUR NEXT ESCAPE</span>
        </div>
        <div className="destination-grid">
          {destinations
            .filter((d) => filter === "All destinations" || d.region === filter)
            .map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
        </div>
        <p className="subtle-note">
          Places to inspire you. Routes, availability and itineraries are confirmed with your travel
          consultant.
        </p>
      </section>
      <section className="services-section section">
        <div className="container">
          <SectionHeading
            eyebrow="WE TAKE CARE OF THE DETAILS"
            title="You dream it. We help plan it."
            text="The little things matter. So does having the right people by your side."
          >
            <Link className="text-link" href="/services">
              Discover our services <ArrowUpRight size={18} />
            </Link>
          </SectionHeading>
          <ServiceGrid />
        </div>
      </section>
      <section className="section container about-preview">
        <div className="about-collage">
          <img
            src="/images/maldives.webp"
            alt="Turquoise water meets a palm-lined tropical beach"
            loading="lazy"
          />
          <div className="about-stamp">
            <Globe2 size={29} />
            <strong>
              Local care.
              <br />
              Global reach.
            </strong>
            <span>THE KRISHNA TRAVELS WAY</span>
          </div>
          <div className="about-caption">
            <span className="small-dot" /> An experience that travels with you.
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            <span /> MORE THAN A TRAVEL AGENCY
          </p>
          <h2>
            Big journeys.
            <br />
            Personal connections.
          </h2>
          <p>
            We believe the best trips start with someone who listens. Someone who understands why
            you’re going, not just where.
          </p>
          <p>
            Krishna Travels brings that approach to Freetown. Part of a travel network spanning five
            African countries, our Sierra Leone branch opened in 2023—with a simple idea: make
            travel feel personal.
          </p>
          <div className="about-checks">
            <span>
              <Check size={16} /> Local people you can talk to
            </span>
            <span>
              <Check size={16} /> Support for leisure & business travel
            </span>
            <span>
              <Check size={16} /> A wider network working for your journey
            </span>
          </div>
          <Link href="/about" className="button button-outline">
            Get to know us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section id="how-it-works" className="section process-section">
        <div className="container">
          <SectionHeading eyebrow="FROM SOMEDAY TO LET’S GO" title="A great trip starts simply." />
          <div className="process-grid">
            {[
              [
                "01",
                "Tell us your dream",
                "A destination, a date, a feeling. Share what you have in mind—we’ll start there.",
                MessageCircle,
              ],
              [
                "02",
                "Let’s shape your journey",
                "Discuss the options, ask the questions and get a quote tailored to your plans.",
                Sparkles,
              ],
              [
                "03",
                "Confirm. Then look forward.",
                "Agree the details and booking terms with your consultant. Your next chapter awaits.",
                Globe2,
              ],
            ].map(([n, title, text, Icon]) => {
              const Component = Icon as typeof Globe2;
              return (
                <div className="process-card" key={String(n)}>
                  <div>
                    <span>{String(n)}</span>
                    <Component size={27} strokeWidth={1.4} />
                  </div>
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <p className="eyebrow">
            <span /> A LITTLE CLARITY BEFORE YOU GO
          </p>
          <h2>
            Good questions.
            <br />
            Helpful answers.
          </h2>
          <p>
            Still wondering about something?
            <br />
            That’s what we’re here for.
          </p>
          <WhatsApp className="text-link">Ask us on WhatsApp</WhatsApp>
        </div>
        <FAQ />
      </section>
      <ClosingCTA />
    </>
  );
}
