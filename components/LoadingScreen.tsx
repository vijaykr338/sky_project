"use client";
import React, { useEffect, useState } from "react";
import Signature from "./Signature";
import gsap from "gsap";
import { animateSignature } from "@/lib/animation";
export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);

    useEffect(() => {
  const path = document.querySelector(
    "#signature"
  ) as SVGPathElement;

  if (!path) return;

  animateSignature(path);
}, []);


  useEffect(() => {
    const duration = 2000;
    const start = performance.now();

    let frame: number;

    const update = (now: number) => {
      const progress = Math.min(
        ((now - start) / duration) * 100,
        100
      );

      setPercent(Math.round(progress));

      if (progress < 100) {
        frame = requestAnimationFrame(update);
      } else {
        setReady(true);
      }
    };

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleContinue = () => {
    if (!ready) return;

    sessionStorage.setItem("intro-seen", "true");

    const screen = document.querySelector(
      ".loading-container"
    ) as HTMLElement;

    if (!screen) return;

    screen.style.transform = "translateY(-100%)";

    setTimeout(() => {
      setHidden(true);
    }, 1000);
  };

  if (hidden) return null;

  return (
  <div
    className="loading-container"
    onClick={handleContinue}
  >
    <div className="signature-wrapper">
      <Signature />
    </div>

    {ready && (
      <div className="continue">
        CLICK ANYWHERE TO CONTINUE
      </div>
    )}

    <div
      className="loading-bar"
      style={{ width: `${percent}%` }}
    />

    <span className="loading-percent">
      {percent}%
    </span>

    <style jsx>{`
      .loading-container {
        position: fixed;
        inset: 0;

        background: white;

        z-index: 9999;

        transition: transform 1s ease-in-out;
      }

      .signature-wrapper {
        position: absolute;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .loading-bar {
        position: fixed;

        left: 0;
        bottom: 0;

        height: 12px;

        background: red;

        transition: width 0.05s linear;
      }

      .loading-percent {
        position: fixed;

        left: 8px;
        bottom: 20px;

        font-size: 0.875rem;

        color: red;

        font-family: monospace;
      }

      .continue {
        position: fixed;

        top: 70%;
        left: 50%;

        transform: translateX(-50%);

        color: black;

        font-size: 14px;

        letter-spacing: 0.3em;

        font-family: monospace;

        cursor: pointer;

        animation: blink 1s infinite;
      }

      @keyframes blink {
        0% {
          opacity: 0.2;
        }

        50% {
          opacity: 1;
        }

        100% {
          opacity: 0.2;
        }
      }
    `}</style>
  </div>
);
}

