import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Plane,
  Palmtree,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Users,
  ShieldCheck,
  Hotel,
  Car,
  BookOpenCheck,
  Check,
  ChevronDown,
} from "lucide-react";
import { destinations, services, faqs } from "../lib/travel";

export function ServiceIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon =
    (
      {
        plane: Plane,
        palm: Palmtree,
        passport: BookOpenCheck,
        hotel: Hotel,
        car: Car,
        shield: ShieldCheck,
      } as Record<string, typeof Plane>
    )[name] || Plane;
  return <Icon size={size} strokeWidth={1.5} />;
}
export function Planner() {
  const [tab, setTab] = useState("Flights");
  const [, navigate] = useLocation();
  return (
    <div className="planner">
      <div className="planner-tabs" role="tablist" aria-label="Type of trip">
        {[
          ["Flights", Plane],
          ["Holidays", Palmtree],
          ["Business travel", BriefcaseBusiness],
        ].map(([name, Icon]) => {
          const Component = Icon as typeof Plane;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={tab === name}
              key={String(name)}
              onClick={() => setTab(String(name))}
              className={tab === name ? "selected" : ""}
            >
              <Component size={17} />
              {String(name)}
            </button>
          );
        })}
        <span className="planner-tab-note">Your journey. Your way.</span>
      </div>
      <form
        className="planner-form"
        role="tabpanel"
        onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          navigate(
            `/quote?${new URLSearchParams({ service: tab, origin: "Freetown (FNA)", destination: String(d.get("destination")), departure: String(d.get("departure")), travellers: String(d.get("travellers")) })}`,
          );
        }}
      >
        <label className="planner-field">
          <MapPin size={19} />
          <span>
            <small>WHERE TO?</small>
            <input
              name="destination"
              aria-label="Destination"
              required
              placeholder="Your next destination"
              list="places"
              maxLength={100}
            />
            <datalist id="places">
              {destinations.map((d) => (
                <option key={d.slug} value={d.name}>
                  {d.name}
                </option>
              ))}
            </datalist>
          </span>
        </label>
        <label className="planner-field">
          <CalendarDays size={19} />
          <span>
            <small>WHEN?</small>
            <input
              name="departure"
              aria-label="Departure date"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              required
            />
          </span>
        </label>
        <label className="planner-field">
          <Users size={19} />
          <span>
            <small>WHO’S COMING?</small>
            <select name="travellers" aria-label="Number of travellers">
              {[1, 2, 3, 4, 5, 6, 8, 10, 20, 30].map((v) => (
                <option value={v} key={v}>
                  {v} {v === 1 ? "traveller" : "travellers"}
                </option>
              ))}
            </select>
          </span>
        </label>
        <button className="button" type="submit">
          Find my journey <ArrowRight size={18} />
        </button>
      </form>
      <div className="planner-footnote">
        <Check size={12} /> Personalised quotes, not instant bookings. No payment needed to enquire.
      </div>
    </div>
  );
}
export function DestinationCard({ destination }: { destination: (typeof destinations)[number] }) {
  const d = destination;
  return (
    <Link href={`/destinations/${d.slug}`} className="destination-card">
      <img src={d.image} alt={`${d.name}, ${d.country}`} loading="lazy" />
      <span className="destination-tag">{d.tag}</span>
      <div className="destination-caption">
        <span>{d.country}</span>
        <h3>{d.name}</h3>
        <p>Explore your possibilities</p>
      </div>
      <span className="destination-arrow">
        <ArrowUpRight size={21} />
      </span>
    </Link>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s, i) => (
        <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
          <span className="service-number">0{i + 1}</span>
          <div className="service-icon">
            <ServiceIcon name={s.icon} />
          </div>
          <h3>{s.name}</h3>
          <p>{s.brief}</p>
          <span className="service-link">
            Let’s explore <ArrowUpRight size={17} />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faqs">
      {faqs.map(([q, a], i) => (
        <div className={`faq ${open === i ? "faq-open" : ""}`} key={q}>
          <button
            aria-expanded={open === i}
            aria-controls={`answer-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {q}
            <ChevronDown size={19} />
          </button>
          {open === i && <p id={`answer-${i}`}>{a}</p>}
        </div>
      ))}
    </div>
  );
}
