// components/HeroParallax.jsx
import React from "react";
// import "./HeroParallax.css";

export default function HeroParallax({ title, subtitle,titleColor, image, height = 600 }) {
  return (
    <header
      className="hero"
      style={{
        height: `${height}px`,
        backgroundImage: `url(${image})`
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <h1 style={{ color: titleColor || '#000' }}>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="hero-fade"></div>
    </header>
  );
}
