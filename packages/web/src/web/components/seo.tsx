import { useEffect } from "react";
import { useLocation } from "wouter";
import { destinations, services } from "../lib/travel";

export default function SEO() {
  const [location] = useLocation();
  useEffect(() => {
    const slug = location.split("/")[2];
    const d = location.startsWith("/destinations/")
      ? destinations.find((v) => v.slug === slug)
      : null;
    const s = location.startsWith("/services/") ? services.find((v) => v.slug === slug) : null;
    const titles: Record<string, string> = {
      "/": "Travel made personal in Freetown",
      "/destinations": "Travel destinations",
      "/services": "Travel services",
      "/about": "Our story",
      "/contact": "Contact our Freetown branch",
      "/quote": "Plan your trip",
      "/track": "Track your enquiry",
      "/privacy": "Privacy notice",
      "/terms": "Terms of use",
    };
    document.title = `${d ? `Plan a trip to ${d.name}` : s ? s.name : titles[location] || "Page not found"} | Krishna Travels`;
    const description = d
      ? d.description
      : s
        ? s.description
        : "Discover flights, holidays, hotel bookings, visa assistance and travel insurance enquiries with Krishna Travels Freetown, Sierra Leone. Travel made personal.";
    for (const [key, value] of [
      ["description", description],
      ["og:title", document.title],
      ["og:description", description],
    ]) {
      const attr = key.startsWith("og:") ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    }
  }, [location]);
  return null;
}
