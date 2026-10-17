// src/data/outlets.js

// All outlets currently share the single business WhatsApp number from the
// menu (0314-4432349 -> 923144432349 in international format).
// To give an outlet its own WhatsApp number later, just change its
// `whatsapp` field below — everything else (ordering, links) updates itself.
const DEFAULT_WHATSAPP = "923144432349";

export const outlets = [
  {
    id: "garden",
    name: "Garden",
    address: "Shop No. 7, Sweet Homes, Near Diamond Super Store, Garden",
    whatsapp: "923480863647",
    mapQuery: "Mr Juice Garden Karachi",
    coords: { lat: 24.889998740494903, lng: 67.03438150267783 },
    deliveryRadiusKm: 4,
    hours: { open: "11:00", close: "02:00" },
    deliveryHours: { open: "11:30", close: "01:30" },
  },
  {
    id: "soldier-bazar",
    name: "Soldier Bazar",
    address: "Shop No. 12, Sania Arcade, Soldier Bazar No. 3 Signal, Near Hobnob Bakery",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Soldier Bazar Karachi",
    coords: { lat: 24.877075333393137, lng: 67.03466949999999 },
    deliveryRadiusKm: 4,
    hours: { open: "11:00", close: "02:00" },
    deliveryHours: { open: "11:30", close: "01:30" },
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    address: "NLC Petrol Pump, Qasim Chowk, Hyderabad",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Qasim Chowk Hyderabad",
    coords: { lat: 25.411652163211677, lng: 68.35389080674318 },
    deliveryRadiusKm: 4,
    hours: { open: "11:00", close: "02:00" },
    deliveryHours: { open: "11:30", close: "01:30" },
  },
  {
    id: "qasimabad",
    name: "Qasimabad",
    address: "Wadu Wah, Opp. Jannat Firdous Masjid, PS Tower, Qasimabad",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Qasimabad Hyderabad",
    coords: { lat: 25.39910602612431, lng: 68.33962170427607 },
    deliveryRadiusKm: 4000,
    hours: { open: "11:00", close: "02:00" },
    deliveryHours: { open: "11:30", close: "01:30" },
  },
];

export const social = {
  whatsapp: "0314-4432349",
  whatsappLink: `https://wa.me/${DEFAULT_WHATSAPP}`,
  facebook: "https://facebook.com/mrjuice",
  instagram: "https://instagram.com/mrjuice4",
  email: "mrjuicelifton19@gmail.com",
  foodpanda: "Mr Juice",
};

// ✅ Global hours for display on the site
export const storeHours = {
  display: "06:00 pm – 2:00 AM (Daily)",
  deliveryDisplay: "06:30 pm – 1:30 AM",
};