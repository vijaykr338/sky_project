"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
          },
          "<0.2"
        )
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "<0.2"
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
          },
          "<0.1"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
          },
          "<0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="max-w-7xl mx-auto px-8 py-20 lg:py-32 min-h-[600px] flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center w-full">
          {/* Left Side - Avatar */}
          <div
            ref={imageRef}
            className="lg:col-span-2 flex justify-center lg:justify-start"
          >
              <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden border-2 border-accent/30 hover:border-accent/60 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/Tia/tia_play.png"
                  alt="Artezia Aurae"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Red accent frame */}
              </div>
          </div>

          {/* Right Side - Content */}
          <div
            ref={contentRef}
            className="lg:col-span-3 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-2">
              <h1 className="hero-title text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                Artezia Aurae
              </h1>
              <p className="hero-subtitle text-2xl lg:text-3xl font-serif font-light text-accent tracking-widest">
                THE FALLEN PRINCESS
              </p>
            </div>

            <div className="w-12 h-1 bg-accent" />

            <div className="hero-description space-y-4 text-lg leading-relaxed text-foreground/90 max-w-2xl font-body">
              <p>
                Once the heir to Hell&apos;s greatest domain. Now, a sovereign rebuilding her empire
                through dreams and devotion.
              </p>
              <p>
                Stripped of her throne in a night of fire and blood, Artezia discovered an
                unprecedented source of power: she offers the haunted and sleepless a bargain—
                deep, peaceful rest in exchange for the nightmares that poison their dreams.
              </p>
              <p>
                Her followers, bound by consent and devotion, become her Implings. A found family.
                An army not forged through fear, but through salvation.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-display">
                ✦ Rebuilding ✦
              </p>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}