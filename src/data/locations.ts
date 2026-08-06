/**
 * NAP + geo + hours — the canonical location record. Everything that shows the address,
 * phone, or hours pulls from here so NAP stays identical site-wide (local SEO). See
 * CLAUDE.md §2.
 */

export interface OpeningHours {
  /** Days this rule applies to, JSON-LD DayOfWeek names. */
  days: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  /** 24h "HH:MM". */
  opens: string;
  /** 24h "HH:MM"; may be past midnight (e.g. "02:00"). */
  closes: string;
  /** Human-readable label for display. */
  label: string;
}

export interface RestaurantLocation {
  name: string;
  street: string;
  unit: string;
  city: string;
  region: string; // province
  regionCode: string; // "ON"
  postalCode: string;
  country: string;
  countryCode: string; // "CA"
  phones: string[];
  /** Approx geo for the Woodstock, ON downtown / Main St address. */
  geo: { lat: number; lng: number };
  hours: OpeningHours[];
  delivery: {
    radiusKm: number;
    minSubtotal: number;
    note: string;
  };
  /** Google Maps embed query string (address, URL-encoded at use site). */
  mapQuery: string;
}

export const primaryLocation: RestaurantLocation = {
  name: "Noni's Pizza & Wings",
  street: "300 Main St",
  unit: "Unit 8",
  city: "Woodstock",
  region: "Ontario",
  regionCode: "ON",
  postalCode: "N4S 1T3",
  country: "Canada",
  countryCode: "CA",
  phones: ["(519) 290-9555", "(519) 290-9521"],
  geo: { lat: 43.1301, lng: -80.7477 },
  hours: [
    {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "21:00",
      label: "Sun–Thu: 11:00 AM – 9:00 PM",
    },
    {
      days: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "23:00",
      label: "Fri–Sat: 11:00 AM – 11:00 PM",
    },
  ],
  /**
   * Delivery terms. The radius/minimum are kept as data (operational fact) but are NOT
   * published as marketing copy — the client asked for every "free delivery"-flavoured
   * claim, including the 3 km / $25 framing, off the site. Say only that we deliver.
   */
  delivery: {
    radiusKm: 3,
    minSubtotal: 25,
    note: "Delivery available in Woodstock, plus pickup and dine-in.",
  },
  mapQuery: "300 Main St Unit 8, Woodstock, ON N4S 1T3, Canada",
};

/** Convenience one-line address string, used site-wide. */
export const formattedAddress = `${primaryLocation.street}, ${primaryLocation.unit}, ${primaryLocation.city}, ${primaryLocation.regionCode} ${primaryLocation.postalCode}`;
