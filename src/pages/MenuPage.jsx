import React, { useState, useEffect } from "react";
import HeroParallax from "../components/HeroParallax.jsx";
import { getAllMenuItemsApi } from "../services/authAPI.jsx";

const CATEGORY_OPTIONS = [
  "Lunch & Dinner",
  "Banquets",
  "Family Feast",
  "Bar Snacks",
  "Cocktails",
  "Wines",
  "Beer",
  "Free From Booze",
  "Happy Hour",
];

export default function TabsMenu() {
  const [active, setActive] = useState(CATEGORY_OPTIONS[0]);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllMenuItemsApi();
      if (res.status === "success") {
        const grouped = res.data.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
      } else {
        setError(res.message || "Failed to load menu.");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="menu-page">
      <HeroParallax
        title="The Hidden Pour Menu"
        image="/images/restMenuBack.png"
        titleColor="#f8f3f3ff"
        height={520}
      />

      {/* Tabs */}
      <div className="menu-tabs-bar">
        <div className="container menu-tabs-scroll">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${active === cat ? "is-active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container py-5">
        <h2 className="menu-section-title mb-4">{active}</h2>
        {loading && <p>Loading…</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="menu-grid">
          {menuData[active]?.map((it) => (
            <div key={it._id} className="menu-card">
              {it.imageUrl && (
                <img src={it.imageUrl} alt="" className="menu-thumb" />
              )}
              <div className="menu-info">
                <h5 className="menu-name">{it.name}</h5>
                {it.description && (
                  <p className="menu-desc">{it.description}</p>
                )}
              </div>
              <div className="menu-price">${Number(it.price).toFixed(2)}</div>
            </div>
          ))}

          {!loading && !menuData[active]?.length && (
            <div className="empty-card">
              <p>🍽️ No items in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
