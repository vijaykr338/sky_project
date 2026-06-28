'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function EditorialCover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typographyLeftRef = useRef<HTMLDivElement>(null);
  const typographyRightRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const topLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main background text
      gsap.from([typographyLeftRef.current, typographyRightRef.current], {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      });

      // Avatar with scale and fade
      gsap.from(avatarRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2,
      });

      // Top label
      gsap.from(topLabelRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      });

      // Side labels stagger
      gsap.from('[data-side-label]', {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -30 : 30),
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white"
    >
      {/* Top Label Section */}
      <div ref={topLabelRef} className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 z-20 text-center w-full max-w-xs md:max-w-none px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-red-700 text-sm">◆</span>
          <h2 className="text-[10px] md:text-xl font-display font-semibold tracking-widest text-black/70 uppercase">
            THE FALLEN PRINCESS
          </h2>
          <span className="text-red-700 text-sm">◆</span>
        </div>
        <svg width="100" height="24" viewBox="0 0 100 24" className="mx-auto" preserveAspectRatio="none">
          <path
            d="M 20 12 Q 50 8 80 12"
            stroke="#991B1B"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,4"
          />
          <path d="M 45 6 L 50 12 L 55 6" stroke="#991B1B" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Left Side Labels */}
      <div 
        ref={typographyLeftRef}
        style={{
          paddingTop: 'clamp(7rem, 12vh, 10rem)',
          paddingBottom: 'clamp(7rem, 12vh, 10rem)',
          paddingLeft: 'clamp(1rem, 2vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 2vw, 2.5rem)',
        }}
        className="hidden lg:flex absolute left-0 top-0 w-[22vw] min-w-[180px] max-w-[320px] h-full flex-col justify-between items-start pointer-events-none z-20"
      >
        {/* Left side labels */}
        <div data-side-label className="flex flex-col gap-2 text-left">
          <p className="text-[clamp(0.75rem,0.8vw,1rem)] font-display font-semibold text-black uppercase tracking-[0.18em]">
            Freaky as Hell
          </p>
          <p className="text-[clamp(0.7rem,0.7vw,0.9rem)] font-body text-black/60 uppercase tracking-[0.14em] leading-tight">
            Demon Empress
          </p>
          <div className="w-[clamp(2rem,2.4vw,3.5rem)] h-0.5 bg-red-700 mt-2" />
        </div>

        <div data-side-label className="flex flex-col gap-2 text-left">
          <p className="text-[clamp(0.75rem,0.8vw,1rem)] font-display font-semibold text-black uppercase tracking-[0.18em]">
            Sleep Paralysis
          </p>
          <p className="text-[clamp(0.7rem,0.7vw,0.9rem)] font-body text-black/60 uppercase tracking-[0.14em] leading-tight">
            Demon Lord 
          </p>
          <div className="w-[clamp(2rem,2.4vw,3.5rem)] h-0.5 bg-red-700 mt-2" />
        </div>

        <div data-side-label className="flex flex-col gap-2 text-left">
          <p className="text-[clamp(0.75rem,0.8vw,1rem)] font-display font-semibold text-black uppercase tracking-[0.18em]">
            Harbinger
          </p>
          <p className="text-[clamp(0.7rem,0.7vw,0.9rem)] font-body text-black/60 uppercase tracking-[0.14em] leading-tight">
            of the plastic wheel.
          </p>
          <div className="w-[clamp(2rem,2.4vw,3.5rem)] h-0.5 bg-red-700 mt-2" />
        </div>

        {/* Left decorative element */}
        <div className="text-red-700 text-[clamp(1rem,1.5vw,1.6rem)] self-start">✦</div>
      </div>

      {/* Center Avatar - Layered on Typography */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-[-35%] lg:translate-y-[-38%] z-30 mt-16 md:mt-[65px]">
        <div
          ref={avatarRef}
          className="
            relative
            w-[75vw] sm:w-[55vw] md:w-[48vw] lg:w-[clamp(340px,42vw,760px)]
            aspect-[3/5]
          "
        >
          <Image
            src="/Tia/tia_avatar.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 60vw, 42vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Center Oversized Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
        <div className="text-center whitespace-nowrap">
          <div className="text-[clamp(3.5rem,14vw,7rem)] md:text-[clamp(7rem,15vw,17rem)] font-display font-black text-black tracking-tight lg:tracking-normal select-none leading-[0.88]">
            ARTEZIA
          </div>
          <div className="text-[clamp(3.5rem,14vw,7rem)] md:text-[clamp(7rem,15vw,17rem)] font-display font-black text-red-700 tracking-tight lg:tracking-normal select-none leading-[0.88] mt-1">
            AURAE
          </div>
        </div>
      </div>

      {/* Right Side Labels */}
      <div 
        ref={typographyRightRef}
        style={{
          paddingTop: 'clamp(7rem, 12vh, 10rem)',
          paddingBottom: 'clamp(7rem, 12vh, 10rem)',
          paddingLeft: 'clamp(1rem, 2vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 2vw, 2.5rem)',
        }}
        className="hidden lg:flex absolute right-0 top-0 w-[22vw] min-w-[180px] max-w-[320px] h-full flex-col justify-between items-end pointer-events-none z-20"
      >
        {/* Right side labels */}
        <div data-side-label className="flex flex-col gap-2 text-right">
          <p className="text-[clamp(0.75rem,0.8vw,1rem)] font-display font-semibold text-black uppercase tracking-[0.18em]">
            Destroyer
          </p>
          <p className="text-[clamp(0.7rem,0.7vw,0.9rem)] font-body text-black/60 uppercase tracking-[0.14em] leading-tight">
            of Drywalls
          </p>
          <div className="w-[clamp(2rem,2.4vw,3.5rem)] h-0.5 bg-red-700 mt-2 ml-auto" />
        </div>

        <div data-side-label className="flex flex-col gap-2 text-right">
          <p className="text-[clamp(0.75rem,0.8vw,1rem)] font-display font-semibold text-black uppercase tracking-[0.18em]">
            Mother
          </p>
          <p className="text-[clamp(0.7rem,0.7vw,0.9rem)] font-body text-black/60 uppercase tracking-[0.14em] leading-tight">
            To All Implings
          </p>
          <div className="w-[clamp(2rem,2.4vw,3.5rem)] h-0.5 bg-red-700 mt-2 ml-auto" />
        </div>

        <div data-side-label className="flex flex-col gap-2 text-right">
          <p className="text-[clamp(0.75rem,0.8vw,1rem)] font-display font-semibold text-black uppercase tracking-[0.18em]">
            Oracle
          </p>
          <p className="text-[clamp(0.7rem,0.7vw,0.9rem)] font-body text-black/60 uppercase tracking-[0.14em] leading-tight">
            of the lake
          </p>
          <div className="w-[clamp(2rem,2.4vw,3.5rem)] h-0.5 bg-red-700 mt-2 ml-auto" />
        </div>

        {/* Right decorative element */}
        <div className="text-red-700 text-[clamp(1rem,1.5vw,1.6rem)] self-end">✦</div>
      </div>
    </section>
  );
}