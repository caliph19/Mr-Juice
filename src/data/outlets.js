// All outlets currently share the single business WhatsApp number from the
// menu (0314-4432349 -> 923144432349 in international format).
// To give an outlet its own WhatsApp number later, just change its
// `whatsapp` field below — everything else (ordering, links) updates itself.
const DEFAULT_WHATSAPP = "923144432349";

export const outlets = [
  {
    id: "dha",
    name: "DHA",
    address: "Plot No. 42C, Lane 3, Khada Market, DHA",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice DHA Khada Market Karachi"
  },
  {
    id: "clifton",
    name: "Clifton",
    address: "Plot No. 14, Street No. 1, Near Jamiat Hospital, Clifton",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Clifton Karachi"
  },
  {
    id: "garden",
    name: "Garden",
    address: "Shop No. 7, Sweet Homes, Near Diamond Super Store, Garden",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Garden Karachi"
  },
  {
    id: "soldier-bazar",
    name: "Soldier Bazar",
    address: "Shop No. 12, Sania Arcade, Soldier Bazar No. 3 Signal, Near Hobnob Bakery",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Soldier Bazar Karachi"
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    address: "NLC Petrol Pump, Qasim Chowk, Hyderabad",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Qasim Chowk Hyderabad"
  },
  {
    id: "qasimabad",
    name: "Qasimabad",
    address: "Wadu Wah, Opp. Jannat Firdous Masjid, PS Tower, Qasimabad",
    whatsapp: DEFAULT_WHATSAPP,
    mapQuery: "Mr Juice Qasimabad Hyderabad"
  }
];

export const social = {
  whatsapp: "0314-4432349",
  whatsappLink: `https://wa.me/${DEFAULT_WHATSAPP}`,
  facebook: "https://facebook.com/mrjuice",
  instagram: "https://instagram.com/mrjuice4",
  email: "mrjuicelifton19@gmail.com",
  foodpanda: "Mr Juice"
};
