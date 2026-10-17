// src/data/homeData.js

import { menu } from "./menu.js";

// ======================================================
// HERO PRODUCT IMAGES
// ======================================================

import chocoShake from "../images/chocoshake.png";
import milkBarryShake from "../images/milkBarryShake.png";
import venella from "../images/venella.png";
import stawbarry from "../images/stawbarry.png";

// ======================================================
// FEATURED IMAGES
// ======================================================

import brownieCaramel from "../images/browniecaramelshake.png";
import dryFruitShake from "../images/dryfruitshake.png";
import morningDelight from "../images/morningsmoothies.png";
import pineappleShake from "../images/pineapple.png";
import enjirDates from "../images/enjirdates.png";
import chocolateIceCream from "../images/chocolateicecream.png";

// ======================================================
// WHY US IMAGES
// ======================================================

import realFruitImage from "../images/real-fruit.png";
import flavorsImage from "../images/flavors.png";
import outletsImage from "../images/outlets.jpg";
import whatsappImage from "../images/whatsapp-order.png";

// ======================================================
// CATEGORY NAMES
// ======================================================

export const CATEGORY_NAMES = menu.map((c) => c.name);

// ======================================================
// HERO PRODUCTS
// ======================================================

export const HERO_PRODUCTS = [
  {
    id: 1,
    name: "Choco Shake",
    type: "Shake",
    image: chocoShake,
    position: "top-left",
  },
  {
    id: 2,
    name: "Milk Berry Shake",
    type: "Shake",
    image: milkBarryShake,
    position: "top-right",
  },
  {
    id: 3,
    name: "Vanilla Ice Cream",
    type: "Ice Cream",
    image: venella,
    position: "bottom-left",
  },
  {
    id: 4,
    name: "Strawberry Ice Cream",
    type: "Ice Cream",
    image: stawbarry,
    position: "bottom-right",
  },
];

// ======================================================
// FEATURED ITEMS
// ======================================================

export const FEATURED = [
  {
    catId: "brownie-shakes",
    name: "Brownie Caramel",
    price: 400,
    image: brownieCaramel,
  },
  {
    catId: "milkshake",
    name: "Dryfruit Shake",
    price: 450,
    image: dryFruitShake,
  },
  {
    catId: "smoothies",
    name: "Morning Delight",
    price: 400,
    image: morningDelight,
  },
  {
    catId: "ice-cream-shakes",
    name: "Pineapple Shake",
    price: 350,
    image: pineappleShake,
  },
  {
    catId: "cocktails",
    name: "Enjir Dates",
    price: 450,
    image: enjirDates,
  },
  {
    catId: "ice-cream",
    name: "Chocolate",
    price: 250,
    image: chocolateIceCream,
  },
];

// ======================================================
// WHY US DATA
// ======================================================

export const WHY_US_DATA = [
  {
    id: 1,
    title: "Real fruit, daily",
    text: "Sourced and blended fresh every morning — no syrups pretending to be fruit.",
    image: realFruitImage,
  },
  {
    id: 2,
    title: "80+ flavors",
    text: "From refreshing juices and creamy shakes to smoothies and delicious ice creams, there is something for every mood.",
    image: flavorsImage,
  },
  {
    id: 3,
    title: "6 outlets",
    text: "Serving fresh and delicious drinks and desserts across our growing network of outlets.",
    image: outletsImage,
  },
  {
    id: 4,
    title: "WhatsApp ordering",
    text: "Pick your outlet, send your order on WhatsApp, and enjoy your favorite drinks and desserts without the wait.",
    image: whatsappImage,
  },
];

// ======================================================
// GET FEATURED ITEMS (helper)
// ======================================================

export function getFeaturedItems() {
  return FEATURED.map(({ catId, name, price, image }) => {
    const cat = menu.find((c) => c.id === catId);
    const item = cat?.items.find((i) => i.name === name);

    return item
      ? {
          item: { ...item, price, image },
          categoryName: cat.name,
        }
      : null;
  }).filter(Boolean);
}