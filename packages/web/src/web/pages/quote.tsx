import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Download,
  Mail,
  ShieldCheck,
  Copy,
  Plane,
  LoaderCircle,
  Search,
  MessageCircle,
} from "lucide-react";
import { useCreateEnquiry, useTrackEnquiry } from "../queries/enquiries";
import { business, whatsapp } from "../lib/travel";
import { PageIntro } from "./explore";

const serviceOptions = [
  "Flights",
  "Holidays",
  "Business travel",
  "Visa assistance",
  "Hotel bookings",
  "Car rentals",
  "Travel insurance",
];
const today = () => new Date().toISOString().slice(0, 10);
function download(text: string, name: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function Quote() {
  const params = new URLSearchParams(window.location.search);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: serviceOptions.includes(params.get("service") || "")
      ? params.get("service")!
      : "Flights",
    origin: params.get("origin") || "Freetown (FNA)",
    destination: (params.get("destination") || "").slice(0, 100),
    departure: params.get("departure") || "",
    returnDate: "",
    travellers: Math.max(1, Math.min(30, Number(params.get("travellers")) || 1)),
    name: "",
    email: "",
    phone: "",
    notes: "",
    consent: false,
    website: "",
  });
  const [tripType, setTripType] = useState("return");
  const [copied, setCopied] = useState(false);
  const mutation = useCreateEnquiry();
  const change = (key: string, value: string | number | boolean) =>
    setForm((v) => ({ ...v, [key]: value }));
  const summary = `Travel enquiry\nService: ${form.service}\nFrom: ${form.origin}\nDestination: ${form.destination}\nDeparture: ${form.departure}\nReturn: ${form.returnDate || "Not specified"}\nTravellers: ${form.travellers}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nNotes: ${form.notes || "None"}`;
  const receipt = mutation.data;
  if (receipt)
    return (
      <section className="container receipt-page">
        <div className="receipt-card">
          <span className="success-icon">
            <CheckCircle2 size={40} />
          </span>
          <p className="eyebrow">YOUR PLANS, IN ONE PLACE</p>
          <h1>Your enquiry is saved.</h1>
          <p>Keep your reference. The next step is to share your plans with the Freetown team.</p>
          <div className="reference-block">
            <small>YOUR PRIVATE ENQUIRY REFERENCE</small>
            <strong>{receipt.reference}</strong>
            <button
              className="text-link"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(receipt.reference);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              <Copy size={14} />
              {copied ? "Copied" : "Copy reference"}
            </button>
          </div>
          <div className="notice">
            <ShieldCheck size={22} />
            <p>
              This preview saves your enquiry, but is{" "}
              <strong>not connected to the agency’s inbox</strong>. No booking, email delivery or
              agency review is confirmed. Use WhatsApp or email below to contact them directly.
            </p>
          </div>
          <div className="receipt-actions">
            <a
              className="button"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsapp(
                `Hello Krishna Travels Freetown, I would like a quote.\n\n${summary}\n\nWebsite reference: ${receipt.reference}`,
              )}
            >
              <MessageCircle size={18} />
              Send plans on WhatsApp
            </a>
            <a
              className="button button-outline"
              href={`mailto:${business.email}?subject=${encodeURIComponent(`Travel enquiry — ${form.destination}`)}&body=${encodeURIComponent(summary + `\nReference: ${receipt.reference}`)}`}
            >
              <Mail size={18} />
              Email my plans
            </a>
            <button
              className="text-link"
              onClick={() =>
                download(
                  `${summary}\nReference: ${receipt.reference}\nSaved: ${receipt.createdAt}\nStatus: Received in website preview. Not sent to agency. Not a confirmed booking.`,
                  `${receipt.reference}.txt`,
                )
              }
            >
              <Download size={17} />
              Download enquiry
            </button>
            <Link className="text-link" href={`/track?reference=${receipt.reference}`}>
              Track saved enquiry <ArrowRight size={17} />
            </Link>
          </div>
          <p className="subtle-note">
            No automated email was sent. A quote and booking must be confirmed directly with the
            agency.
          </p>
          <Link href="/" className="back-link dark">
            <ArrowLeft size={15} />
            Back to exploring
          </Link>
        </div>
      </section>
    );
  return (
    <>
      <PageIntro
        eyebrow="FROM AN IDEA TO A JOURNEY"
        title="Let’s make it your kind of trip."
        text="Share the essentials. No payment, no commitment—just the start of a good travel conversation."
      />
      <div className="container quote-grid">
        <section className="quote-form-card">
          <div className="stepper" aria-label={`Step ${step} of 3`}>
            {["Your trip", "About you", "Review & send"].map((t, i) => (
              <div className={step >= i + 1 ? "step active" : "step"} key={t}>
                <span>{step > i + 1 ? <Check size={15} /> : i + 1}</span>
                <small>{t}</small>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 3) {
                setStep(step + 1);
                document
                  .getElementById("quote-heading")
                  ?.scrollIntoView({ block: "center", behavior: "smooth" });
              } else
                mutation.mutate({
                  ...form,
                  consent: true,
                  returnDate: tripType === "one-way" ? "" : form.returnDate,
                });
            }}
          >
            <div id="quote-heading">
              <p className="eyebrow">STEP 0{step} OF 03</p>
              <h2>
                {step === 1
                  ? "Where are you heading?"
                  : step === 2
                    ? "A little about you."
                    : "Everything looking right?"}
              </h2>
            </div>
            {step === 1 && (
              <>
                <label className="field full">
                  What can we help with?
                  <select value={form.service} onChange={(e) => change("service", e.target.value)}>
                    {serviceOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <div className="trip-type">
                  {["return", "one-way", "flexible"].map((t) => (
                    <button
                      className={tripType === t ? "selected" : ""}
                      type="button"
                      key={t}
                      onClick={() => {
                        setTripType(t);
                        if (t !== "return") change("returnDate", "");
                      }}
                    >
                      {t === "return"
                        ? "Return trip"
                        : t === "one-way"
                          ? "One way"
                          : "Flexible plans"}
                    </button>
                  ))}
                </div>
                <div className="form-grid">
                  <label className="field">
                    Travelling from
                    <input
                      aria-label="Travelling from"
                      required
                      minLength={2}
                      maxLength={100}
                      value={form.origin}
                      onChange={(e) => change("origin", e.target.value)}
                      placeholder="City or airport"
                    />
                  </label>
                  <label className="field">
                    Your destination
                    <input
                      aria-label="Your destination"
                      required
                      minLength={2}
                      maxLength={100}
                      value={form.destination}
                      onChange={(e) => change("destination", e.target.value)}
                      placeholder="Where would you love to go?"
                    />
                  </label>
                  <label className="field">
                    {form.service === "Visa assistance"
                      ? "Intended travel date"
                      : "Departure / start date"}
                    <input
                      aria-label="Departure / start date"
                      required
                      type="date"
                      min={today()}
                      value={form.departure}
                      onChange={(e) => {
                        change("departure", e.target.value);
                        if (form.returnDate && form.returnDate < e.target.value)
                          change("returnDate", "");
                      }}
                    />
                  </label>
                  {tripType === "return" ? (
                    <label className="field">
                      Return / end date <small>(optional)</small>
                      <input
                        aria-label="Return / end date"
                        type="date"
                        min={form.departure || today()}
                        value={form.returnDate}
                        onChange={(e) => change("returnDate", e.target.value)}
                      />
                    </label>
                  ) : (
                    <div className="field">
                      <span>Date flexibility</span>
                      <p className="field-note">Share alternative dates in the notes below.</p>
                    </div>
                  )}
                  <label className="field">
                    Number of travellers
                    <input
                      aria-label="Number of travellers"
                      required
                      type="number"
                      min={1}
                      max={30}
                      value={form.travellers}
                      onChange={(e) => change("travellers", Number(e.target.value))}
                    />
                  </label>
                </div>
                <label className="field full">
                  Anything else we should know? <small>(optional)</small>
                  <textarea
                    aria-label="Anything else we should know?"
                    maxLength={2000}
                    rows={4}
                    value={form.notes}
                    onChange={(e) => change("notes", e.target.value)}
                    placeholder="Budget and currency, preferred airline, hotel style, flexible dates, or special requirements. Please don’t include passport or payment details."
                  />
                </label>
                <small className="subtle-note">
                  For groups larger than 30, contact the team directly.
                </small>
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-grid">
                  <label className="field full">
                    Your full name
                    <input
                      aria-label="Your full name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => change("name", e.target.value)}
                    />
                  </label>
                  <label className="field full">
                    Email address
                    <input
                      aria-label="Email address"
                      autoComplete="email"
                      type="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={(e) => change("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="field full">
                    Phone number, including country code
                    <input
                      aria-label="Phone number, including country code"
                      autoComplete="tel"
                      type="tel"
                      required
                      minLength={7}
                      maxLength={25}
                      pattern="[+0-9\s\(\)\-]+"
                      value={form.phone}
                      onChange={(e) => change("phone", e.target.value)}
                      placeholder="+232 ..."
                    />
                  </label>
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    Website
                    <input
                      aria-label="Leave this website field empty"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => change("website", e.target.value)}
                    />
                  </label>
                </div>
                <div className="notice">
                  <ShieldCheck size={22} />
                  <p>
                    Only share basic contact details. Never include passport scans, bank details or
                    identity documents. Details are stored in this website’s database.
                  </p>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <dl className="review-list">
                  {[
                    ["Service", form.service],
                    ["Route", `${form.origin} → ${form.destination}`],
                    [
                      "Travel dates",
                      `${form.departure}${form.returnDate ? ` to ${form.returnDate}` : ""}`,
                    ],
                    ["Travellers", String(form.travellers)],
                    ["Name", form.name],
                    ["Email", form.email],
                    ["Phone", form.phone],
                    ["Your notes", form.notes || "No extra notes"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="notice">
                  <ShieldCheck size={23} />
                  <p>
                    <strong>Website preview:</strong> submitting saves your request here. It does
                    not notify the agency or reserve travel. After saving, send your plans to the
                    team using WhatsApp or email.
                  </p>
                </div>
                <label className="consent">
                  <input
                    aria-label="I consent to storing this enquiry and accept the privacy notice"
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => change("consent", e.target.checked)}
                  />
                  <span>
                    I agree to store these details for this enquiry, understand this is not a
                    booking, and have read the{" "}
                    <Link href="/privacy" target="_blank">
                      privacy notice
                    </Link>
                    .
                  </span>
                </label>
              </>
            )}
            {mutation.isError && (
              <p className="error-message" role="alert">
                {mutation.error.message ||
                  "We couldn’t save your enquiry. Please try again or contact the team directly."}
              </p>
            )}
            <div className="form-actions">
              {step > 1 ? (
                <button
                  className="text-link"
                  type="button"
                  disabled={mutation.isPending}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={17} />
                  Back
                </button>
              ) : (
                <span>Tailored to you, from the start.</span>
              )}
              <button className="button" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <LoaderCircle className="spin" size={18} />
                    Saving enquiry…
                  </>
                ) : (
                  <>
                    {step < 3 ? "Continue" : "Save my enquiry"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
        <aside className="quote-sidebar">
          <div className="quote-sidebar-icon">
            <Plane size={30} />
          </div>
          <h3>
            Your next story
            <br />
            starts right here.
          </h3>
          <p>A few details today. A world of possibilities tomorrow.</p>
          <ul className="check-list">
            <li>
              <Check size={17} />
              No payment to enquire
            </li>
            <li>
              <Check size={17} />A trip shaped around you
            </li>
            <li>
              <Check size={17} />
              Direct contact with the team
            </li>
          </ul>
          <div className="sidebar-contact">
            <span>Prefer a real conversation?</span>
            <a href={business.telephone}>{business.phone}</a>
            <a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp <ArrowRight size={17} />
            </a>
          </div>
          <small>
            This concept is awaiting business approval. Agency inbox notifications are not yet
            enabled.
          </small>
        </aside>
      </div>
    </>
  );
}
export function Track() {
  const [reference, setReference] = useState(
    new URLSearchParams(window.location.search).get("reference") || "",
  );
  const [email, setEmail] = useState("");
  const mutation = useTrackEnquiry();
  return (
    <>
      <PageIntro
        eyebrow="KEEP YOUR PLANS IN VIEW"
        title="Track your saved enquiry."
        text="Enter the private reference from your receipt and the email you used. This tracks website requests—not airline reservations."
      />
      <section className="container track-section">
        <form
          className="track-form"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({ reference: reference.trim().toUpperCase(), email: email.trim() });
          }}
        >
          <label className="field">
            Your enquiry reference
            <input
              aria-label="Your enquiry reference"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
                mutation.reset();
              }}
              placeholder="KT- followed by 20 characters"
              pattern="[Kk][Tt]-[a-fA-F0-9]{20}"
              required
            />
          </label>
          <label className="field">
            Email used for the enquiry
            <input
              aria-label="Email used for the enquiry"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                mutation.reset();
              }}
              placeholder="you@example.com"
            />
          </label>
          <button disabled={mutation.isPending} className="button" type="submit">
            {mutation.isPending ? (
              <LoaderCircle size={18} className="spin" />
            ) : (
              <Search size={18} />
            )}{" "}
            {mutation.isPending ? "Checking…" : "Find my enquiry"}
          </button>
          <p className="subtle-note">
            Keep your reference private. No name, phone or travel details are displayed in this
            lookup.
          </p>
        </form>
        {mutation.isError && (
          <div className="error-message" role="alert">
            {mutation.error.message}
          </div>
        )}
        {mutation.data && (
          <output className="track-result">
            <CheckCircle2 size={32} />
            <p className="eyebrow">ENQUIRY FOUND</p>
            <h2>Saved in the website.</h2>
            <p className="reference-text">{mutation.data.reference}</p>
            <p>
              Saved on{" "}
              {new Date(mutation.data.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <span className="status-pill">
              {mutation.data.status === "received" ? "Received in preview" : mutation.data.status}
            </span>
            <div className="notice">
              <p>
                No agency review or booking is confirmed. This preview is not connected to an agency
                inbox. Contact the team directly to discuss your plans.
              </p>
            </div>
            <a
              className="button"
              href={whatsapp(
                `Hello Krishna Travels Freetown, I would like help with a travel enquiry. My website reference is ${mutation.data.reference}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Talk to the team
            </a>
          </output>
        )}
        <div className="other-destination">
          <div>
            <h3>Don’t have a reference?</h3>
            <p>No automated receipt email was sent. Contact the team or start a new request.</p>
          </div>
          <Link href="/quote" className="text-link">
            Plan a trip <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
