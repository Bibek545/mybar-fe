// 

import React, { useState } from "react";
import HeroParallax from "../components/HeroParallax.jsx";
// import heroMenu from "../assets/restMenuBack.png"

/* ---- Example data (swap with your real menu later) ---- */
const MENU_DATA = {
  "Lunch & Dinner": [
    { name: "Coal-roasted chicken", desc: "garlic & herb jus", price: 34 },
    { name: "Market fish", desc: "burnt lemon & dill", price: 36 },
    { name: "Crispy Potatoes with French onion dip and chives", price: 22 },
  ],
  Banquets: [
    { name: "Chef’s Feast", desc: "Shared courses for the table", price: 79 },
    { name: "Vegetarian Feast", desc: "Seasonal veg & grains", price: 69 },
  ],
  "Family Feast": [
    { name: "Whole roast chicken + 3 sides", desc: "feeds 3–4", price: 95 },
  ],
  "Bar Snacks": [
    { name: "Crispy potatoes", desc: "French onion dip, chives", price: 16 },
    { name: "Eggplant chips", desc: "spiced honey", price: 14 },
  ],
  Cocktails: [
    { name: "Smoked Velvet", desc: "Mezcal, vanilla, cacao bitters", price: 23 },
    { name: "Velour Negroni", desc: "Barrel gin, cacao nib Campari", price: 23 },
  ],
  Wines: [
    { name: "Prosecco — Veneto", desc: "glass", price: 14 },
    { name: "Pinot Noir — Yarra Valley", desc: "glass", price: 15 },
  ],
  Beer: [
    { name: "Lager — local", desc: "tap", price: 10 },
    { name: "Pale Ale — can", desc: "375ml", price: 11 },
  ],
  "Free From Booze": [
    { name: "Plum & Myrtle Spritz", desc: "Davidson plum, fizz", price: 16 },
    { name: "Citrus Garden", desc: "Mandarin, verbena, tonic", price: 16 },
  ],
  "Happy Hour": [
    { name: "House Spritz", desc: "4–6pm", price: 12 },
    { name: "Selected beers", desc: "4–6pm", price: 7 },
  ],
};

const categories = Object.keys(MENU_DATA);

export default function TabsMenu() {
  const [active, setActive] = useState(categories[0]);

  return (
    <div className="menu-tabs-page">
            <HeroParallax
        title="The Hidden Pour Menu "
        subtitle="Seasonal plates, crafted cocktails."
        image="/images/restMenuBack.png"
        titleColor="#f8f3f3ff"
        height={600}
      />
      {/* Sticky tab bar */}
      <div className="menu-tabs-wrapper sticky-top">
        <div className="container">
          <div className="menu-tabs overflow-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-tab ${active === cat ? "active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="menu-tabs-underline" />
        </div>
      </div>

      {/* Content */}
      <div className="container py-4 py-md-5">
        <h2 className="cm-title mb-3">{active}</h2>
        <ul className="list-unstyled mb-0">
          {MENU_DATA[active].map((it, i) => (
            <li key={i} className="cm-row">
              <div className="cm-line">
                <div className="cm-item">
                  <div className="cm-name">{it.name}</div>
                  <div className="cm-desc text-muted">{it.desc}</div>
                </div>
                <div className="cm-price">${it.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
