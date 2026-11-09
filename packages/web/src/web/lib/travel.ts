export const business = {
  phone: "+232 72 100 100",
  telephone: "tel:+23272100100",
  email: "deepak@krishna-travels.in",
  address:
    "Shop No. 11, Lightfoot Boston Street, opposite Standard Chartered Bank, Freetown, Sierra Leone",
  map: "https://www.google.com/maps/search/?api=1&query=Krishna+Travels+11+Lightfoot+Boston+Street+Freetown+Sierra+Leone",
};
export function whatsapp(
  text = "Hello Krishna Travels Freetown, I would like help planning a trip.",
) {
  return `https://wa.me/23272100100?text=${encodeURIComponent(text)}`;
}
export const destinations = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    tag: "City escape",
    image: "/images/dubai.webp",
    line: "A little extraordinary. Every day.",
    description:
      "Sky-high views, old-town souks and warm evenings by the waterfront. Make space for both sides of Dubai: the striking skyline and the slower rhythm along the Creek.",
    highlights: [
      "Explore the souks and Dubai Creek",
      "Discover the city’s skyline",
      "Plan a desert experience",
    ],
    planning:
      "Share your preferred dates, hotel area and activities. Your travel consultant can check flight and stay options, plus entry requirements for your passport.",
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    region: "Islands",
    tag: "Island retreat",
    image: "/images/maldives.webp",
    line: "Trade your everyday for turquoise.",
    description:
      "Barefoot mornings, palm-fringed beaches and a whole new shade of blue. Whether it’s a honeymoon or a quiet reset, start with the island experience that feels right for you.",
    highlights: [
      "Unwind on a tropical beach",
      "Ask about reef and snorkelling experiences",
      "Find a stay that suits your pace",
    ],
    planning:
      "Tell us your preferred island style and budget. Transfers, meal plans and resort availability can make a big difference, so request an itemised quote.",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    tag: "Culture & connection",
    image: "/images/london.webp",
    line: "Old favourites. New discoveries.",
    description:
      "From riverside walks to world-class museums, London has something for every kind of traveller. Plan a city break, a family visit or your next business trip with local travel support.",
    highlights: [
      "Walk the Thames and see Tower Bridge",
      "Explore museums and neighbourhoods",
      "Reconnect with friends and family",
    ],
    planning:
      "Check visa requirements well ahead of your trip. Share your travel purpose, dates and preferred airports so the team can help you compare suitable options.",
  },
  {
    slug: "accra",
    name: "Accra",
    country: "Ghana",
    region: "Africa",
    tag: "Closer to home",
    image: "/images/accra.webp",
    line: "West African warmth. Endless energy.",
    description:
      "A city of art, food, coastal air and vibrant street life. Travel for business, reconnect with family or take time to explore Ghana’s capital at your own pace.",
    highlights: [
      "Discover Independence Square",
      "Explore local food and creative spaces",
      "Plan business or family travel",
    ],
    planning:
      "Ask the Freetown team about flights and hotel options. Confirm current entry and health requirements before making any non-refundable arrangements.",
  },
];
export const services = [
  {
    slug: "flights",
    name: "Air ticketing",
    quote: "Flights",
    icon: "plane",
    brief: "The right flight. A smoother journey.",
    description:
      "Compare flight options with a travel consultant, not a dozen open tabs. Share your route and dates, and ask for a clear quote including baggage and fare conditions.",
    includes: [
      "Route and schedule enquiries",
      "One-way, return and multi-city options",
      "Baggage and fare-rule guidance",
      "Change and cancellation enquiries",
    ],
    note: "Fares change and seats are subject to availability. Tickets are confirmed only after the agency issues your booking confirmation.",
  },
  {
    slug: "holidays",
    name: "Holiday packages",
    quote: "Holidays",
    icon: "palm",
    brief: "Less planning. More making memories.",
    description:
      "A holiday should feel like yours. Tell us what you love, where you want to go and how you like to travel. Ask the team to bring together suitable flights, stays and experiences.",
    includes: [
      "Personalised itinerary enquiries",
      "Family, couple and group travel",
      "Flight and accommodation options",
      "Activity and transfer enquiries",
    ],
    note: "Destination images are inspiration, not advertised packages. An itinerary, inclusions and total price will be agreed with the agency before booking.",
  },
  {
    slug: "visa",
    name: "Visa assistance",
    quote: "Visa assistance",
    icon: "passport",
    brief: "A clearer path through the paperwork.",
    description:
      "Get help understanding the next steps for your travel documents. Requirements depend on your nationality, destination and purpose of travel; always confirm them with the relevant authority.",
    includes: [
      "Document checklist guidance",
      "Application process enquiries",
      "Travel-purpose guidance",
      "Consular requirement enquiries",
    ],
    note: "Visa decisions rest with the issuing authority. Assistance does not guarantee approval. Do not submit passport scans or sensitive documents through this website.",
  },
  {
    slug: "hotels",
    name: "Hotel bookings",
    quote: "Hotel bookings",
    icon: "hotel",
    brief: "Somewhere you’ll love coming back to.",
    description:
      "A well-chosen stay makes all the difference. Share your destination, preferred area and room needs to request accommodation options that fit your plans.",
    includes: [
      "Business and leisure stay enquiries",
      "Location and room preferences",
      "Family and group accommodation",
      "Cancellation and meal-plan guidance",
    ],
    note: "Room availability, facilities and cancellation terms must be confirmed in the agency’s quote before booking.",
  },
  {
    slug: "cars",
    name: "Car rentals",
    quote: "Car rentals",
    icon: "car",
    brief: "Your journey, beyond the airport.",
    description:
      "Ask about vehicle rental and transfer options for your trip. Let the team know your pickup point, dates, group size and any luggage or accessibility needs.",
    includes: [
      "Vehicle rental enquiries",
      "Airport transfer enquiries",
      "Group size and luggage planning",
      "Pickup and drop-off requirements",
    ],
    note: "Vehicle types, driver arrangements, insurance and pickup locations are subject to agency and supplier confirmation.",
  },
  {
    slug: "insurance",
    name: "Travel insurance",
    quote: "Travel insurance",
    icon: "shield",
    brief: "Think ahead. Travel with more clarity.",
    description:
      "Ask about insurance options for your journey and how to compare cover. Read the policy terms, exclusions and claim process carefully before deciding.",
    includes: [
      "Travel insurance enquiries",
      "Trip duration and destination guidance",
      "Policy terms and exclusions to check",
      "Supplier and cover enquiries",
    ],
    note: "Coverage depends on the insurer and policy. This website does not issue policies or provide personalised financial advice.",
  },
];
export const faqs = [
  [
    "How do I book with Krishna Travels?",
    "Start with a quote request or contact the Freetown team on WhatsApp. Share your destination, dates and traveller count. The agency confirms options, prices and terms with you before any booking is made.",
  ],
  [
    "Can you help with visas and travel documents?",
    "Visa assistance is one of the company’s listed services. Requirements vary by passport, destination and trip purpose. The relevant embassy or consulate makes the final decision; approval is never guaranteed.",
  ],
  [
    "Are the prices and bookings confirmed online?",
    "No. This website collects enquiries, not live reservations or payments. Flight fares, hotel availability, insurance and package inclusions must be confirmed directly by the agency.",
  ],
  [
    "Do you arrange business and group travel?",
    "You can request business or group arrangements through the trip planner. Share your route, group size and requirements, and confirm the available services and terms with the Freetown team.",
  ],
  [
    "Where is your Freetown office?",
    "The official branch page lists Shop No. 11, Lightfoot Boston Street, opposite Standard Chartered Bank, Freetown. Call +232 72 100 100 to confirm opening hours before visiting.",
  ],
  [
    "Can I change or cancel a booking?",
    "Changes and refunds depend on the airline, hotel or supplier’s terms and your specific booking. Contact the agency with your booking details to check eligibility, fees and next steps.",
  ],
];
