"use client";

import PixelTransition from "./PixelTransition";
import "./PixelTransitionGallery.css";

/*
  Add/remove images here.

  Every path is relative to the `public` folder.
  Example:
  public/Tia/mascot.png  ->  src: "/Tia/mascot.png"
*/
const IMAGES = [
  { src: "/Tia/mascot.png", alt: "Tia mascot illustration" },
  { src: "/Tia/seal_of_approval.png", alt: "Seal of approval illustration" },
  { src: "/Tia/tia_avatar.png", alt: "Tia avatar portrait" },
  { src: "/Tia/tia_h.png", alt: "Tia character H illustration" },
  { src: "/Tia/tia_play.png", alt: "Tia play illustration" },
  { src: "/Tia/tia_scare.png", alt: "Tia scare illustration" },
  { src: "/Tia/Tia_seal.jpg", alt: "Tia seal image" },
  { src: "/Tia/tia_smile.png", alt: "Tia smile illustration" },
  { src: "/Tia/tia_hamster.png", alt: "Tia hamster illustration" },
  { src: "/Tia/tia_u.png", alt: "Tia character U illustration" },
  { src: "/Tia/tia_hamster2.png", alt: "Second Tia hamster illustration" },
];

/*
  Each object maps to one card.
  The order is intentional: every card has its own grid slot,
  so cards cannot overlap.
*/
const CARD_LAYOUTS = [
  { className: "card--one", rotation: "-6deg" },
  { className: "card--two", rotation: "5deg" },
  { className: "card--three", rotation: "-4deg" },
  { className: "card--four", rotation: "7deg" },
  { className: "card--five", rotation: "-5deg" },
  { className: "card--six", rotation: "4deg" },
  { className: "card--seven", rotation: "-7deg" },
  { className: "card--eight", rotation: "6deg" },
  { className: "card--nine", rotation: "-3deg" },
  { className: "card--ten", rotation: "5deg" },
  { className: "card--eleven", rotation: "-5deg" },
];

const REVEALS = [
  "Listen here you little sh*t.",
  "Mods cut off his balls",
  "Asteroid destroyer panties",
  "German trains suck.",
  "I am the law.",
  "Bah!",
  "I am...so HOT",
  "Such a great Ablublublup",
  "Still on my knee, barking for lycaon",
  "Last thing the boss sees before he dies.",
  "We are all horny here.",
];

const REVEAL_STYLES = [
  { background: "#1e1e1e", color: "#ffffff", icon: "✦" },
  { background: "#d60031", color: "#ffffff", icon: "♥" },
  { background: "#252525", color: "#f04470", icon: "∞" },
  { background: "#41101d", color: "#ffffff", icon: "✷" },
  { background: "#f04470", color: "#ffffff", icon: "✦" },
  { background: "#171717", color: "#d60031", icon: "○" },
  { background: "#6b1328", color: "#ffffff", icon: "✹" },
  { background: "#222222", color: "#ff5c7d", icon: "↗" },
  { background: "#b4002b", color: "#ffffff", icon: "✦" },
  { background: "#292929", color: "#ffffff", icon: "♡" },
  { background: "#4c0f20", color: "#ffffff", icon: "✷" },
];

export default function PixelTransitionGallery() {
  return (
    <section className="pixel-gallery">
      <div className="pixel-gallery__heading">
        <p className="pixel-gallery__eyebrow">INTERACTIVE ARCHIVE</p>
        <h2>HOVER THE CARDS</h2>
        <p>
          A collection of moments. Hover or tap each card to uncover a little
          more.
        </p>
      </div>

      <div className="gallery-cards">
        {IMAGES.map((image, index) => {
          const layout = CARD_LAYOUTS[index % CARD_LAYOUTS.length];
          const revealStyle = REVEAL_STYLES[index % REVEAL_STYLES.length];

          return (
            <div
              className={`gallery-card-wrap ${layout.className}`}
              key={image.src}
              style={{ "--card-rotation": layout.rotation }}
            >
              <PixelTransition
                gridSize={12}
                animationStepDuration={0.35}
                once={false}
                pixelColor="#ffffff"
                className="gallery-card"
                aspectRatio="100%"
                firstContent={
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                }
                secondContent={
                  <div
                    className="reveal-content"
                    style={{
                      background: revealStyle.background,
                      color: revealStyle.color,
                    }}
                  >
                    <span className="reveal-content__icon" aria-hidden="true">
                      {revealStyle.icon}
                    </span>
                    <p>{REVEALS[index % REVEALS.length]}</p>
                  </div>
                }
              />
            </div>
          );
        })}
      </div>

      <p className="pixel-gallery__instruction">
        Hover or tap a card to reveal what is underneath.
      </p>
    </section>
  );
}