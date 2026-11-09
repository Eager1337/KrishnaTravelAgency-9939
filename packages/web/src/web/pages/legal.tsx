import { Link, useLocation } from "wouter";
import { PageIntro } from "./explore";
import { business } from "../lib/travel";

export default function Legal() {
  const [location] = useLocation();
  const privacy = location === "/privacy";
  return (
    <>
      <PageIntro
        eyebrow="CLEAR INFORMATION. BETTER DECISIONS."
        title={privacy ? "Your privacy matters." : "A few important travel details."}
        text="This is an independent website concept for Krishna Travels Freetown. It is awaiting owner approval and is not an official booking platform."
      />
      <article className="container legal-content">
        <p className="subtle-note">
          Website notice · 9 November 2026 · Draft for owner review before public launch
        </p>
        {privacy ? (
          <>
            <h2>What this website stores</h2>
            <p>
              When you save an enquiry, the website database stores your name, email, phone,
              requested service, route, dates, traveller count and notes, along with a private
              reference and submission/consent timestamp. Only submit details you have permission to
              share.
            </p>
            <h2>Why we collect it</h2>
            <p>
              These details create a saved enquiry receipt and allow you to look up whether your
              request was received. This preview does not send enquiries or automated email
              notifications to the agency. You can choose to send your plans directly through
              WhatsApp or your email application after saving.
            </p>
            <h2>Who is responsible</h2>
            <p>
              The concept website is operated in the developer’s preview environment, not an
              owner-approved business system. Do not submit sensitive or real customer data during
              demonstration. Before public launch, the business and developer must agree the data
              controller, processing arrangements, authorised access and contact for privacy
              requests.
            </p>
            <h2>Data access and retention</h2>
            <p>
              Tracking requires the private reference and matching email. Tracking returns only the
              reference, status and creation date—not contact or travel details. Database
              administrators can access stored enquiries. No automated deletion schedule is enabled
              in this preview; the developer must remove demonstration data after testing and agree
              a production retention policy with the owner before launch.
            </p>
            <h2>Your choices</h2>
            <p>
              Use direct phone or email contact instead of the form if you prefer not to store an
              enquiry here. For preview data access, correction or removal, contact the developer
              who shared this website. For the agency’s own records, contact{" "}
              <a href={`mailto:${business.email}`}>{business.email}</a>. The agency has not been
              appointed to administer this preview.
            </p>
            <h2>Analytics and external services</h2>
            <p>
              The hosting platform includes website analytics, which may collect page visits,
              device/browser information and related technical usage data. The developer must verify
              cookie/storage behaviour and obtain any required consent before production launch.
              This website does not add a separate advertising tracker.
            </p>
            <p>
              WhatsApp, email and Google Maps links open external services, which have their own
              privacy terms. Clicking “send plans” prepares a message in your app; you decide
              whether to send it. No message is sent automatically.
            </p>
            <h2>Keep sensitive documents offline</h2>
            <p>
              Never enter passport numbers, identity scans, payment card data, bank details or
              private medical information in the enquiry form. Discuss secure document transfer
              directly with the agency if required.
            </p>
          </>
        ) : (
          <>
            <h2>Enquiries, not reservations</h2>
            <p>
              This website is a concept for browsing travel services and saving enquiry details.
              Submission does not reserve flights, hotel rooms, vehicles, insurance or packages. No
              payment is collected and no contract for travel is formed by using this site.
            </p>
            <h2>Quotes and booking terms</h2>
            <p>
              All routes, prices, inclusions and supplier availability must be confirmed directly by
              Krishna Travels. Ask for an itemised quote, payment instructions, cancellation
              conditions and written booking confirmation. Airline and other supplier conditions may
              apply.
            </p>
            <h2>Destination inspiration</h2>
            <p>
              Photos and activities illustrate travel ideas only. They do not represent an
              advertised or guaranteed package, included activity, agency-owned facility or direct
              flight route. Entry and health requirements depend on your nationality, destination
              and travel dates.
            </p>
            <h2>Visa and insurance services</h2>
            <p>
              Visa assistance does not guarantee approval; decisions belong to the relevant
              authority. Insurance availability, cover and exclusions depend on the insurer and
              policy. Confirm the documents and terms directly before proceeding.
            </p>
            <h2>Contact information</h2>
            <p>
              The Freetown address, phone and email were sourced from the official branch page and
              company brochure. Opening hours were not verified. Confirm details directly before
              visiting or sending money. Social profiles and review claims that could not be
              verified are not presented as branch endorsements.
            </p>
            <h2>Limitations of the preview</h2>
            <p>
              Saved enquiries remain in this website’s database. There is no connected agency inbox,
              staff status management, live fare integration or payment checkout. Data and
              operational policies require owner approval before launch. Nothing on this website
              promises visa outcomes, travel availability, response times or guaranteed savings.
            </p>
            <h2>Responsible use</h2>
            <p>
              Provide accurate information, keep enquiry references private and do not submit
              unauthorised personal data, unlawful material or automated spam. Do not treat this
              concept as the agency’s official published site until authorised by the owner.
            </p>
          </>
        )}
        <Link href="/contact" className="button">
          Contact information
        </Link>
      </article>
    </>
  );
}
