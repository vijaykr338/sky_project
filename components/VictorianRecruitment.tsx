'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function VictorianRecruitment() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(decorRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'back.out(1.5)',
          },
          '<0.2'
        )
        .from(
          sealRef.current,
          {
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
          },
          '<0.3'
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          },
          '<0.2'
        )

      // Add subtle floating motion to seal
      gsap.to(sealRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Add floating decorative elements
      gsap.to(decorRef.current, {
        opacity: 0.6,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-12 px-4 bg-background border-t-2 border-b-2 border-accent">
      <div className="max-w-3xl mx-auto relative">
        {/* Ornate Victorian Border Frame */}
        <div className="relative pt-12 pb-12 px-4 md:px-8 lg:px-12 border-4 border-black">
          {/* Corner flourishes - top left */}
          <div className="absolute top-2 left-2 w-8 h-8">
            <svg viewBox="0 0 40 40" className="w-full h-full stroke-accent fill-none" strokeWidth="1.5">
              <path d="M 5 35 Q 5 5 35 5" />
              <circle cx="5" cy="35" r="2" fill="currentColor" />
              <circle cx="35" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Corner flourishes - top right */}
          <div className="absolute top-2 right-2 w-8 h-8 transform scale-x-[-1]">
            <svg viewBox="0 0 40 40" className="w-full h-full stroke-accent fill-none" strokeWidth="1.5">
              <path d="M 5 35 Q 5 5 35 5" />
              <circle cx="5" cy="35" r="2" fill="currentColor" />
              <circle cx="35" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Corner flourishes - bottom left */}
          <div className="absolute bottom-2 left-2 w-8 h-8 transform scale-y-[-1]">
            <svg viewBox="0 0 40 40" className="w-full h-full stroke-accent fill-none" strokeWidth="1.5">
              <path d="M 5 35 Q 5 5 35 5" />
              <circle cx="5" cy="35" r="2" fill="currentColor" />
              <circle cx="35" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Corner flourishes - bottom right */}
          <div className="absolute bottom-2 right-2 w-8 h-8 transform scale-x-[-1] scale-y-[-1]">
            <svg viewBox="0 0 40 40" className="w-full h-full stroke-accent fill-none" strokeWidth="1.5">
              <path d="M 5 35 Q 5 5 35 5" />
              <circle cx="5" cy="35" r="2" fill="currentColor" />
              <circle cx="35" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Decorative top border */}
          <div
  ref={decorRef}
  className="flex justify-center mb-10 text-xl tracking-[0.3em] text-accent"
>
  ◆ ✦ ◆ ✦ ◆
</div>

          {/* Main Headline */}
          <h2
  ref={headlineRef}
  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground text-center mb-10 tracking-[0.15em] leading-none"
>
  WE NEED YOU
</h2>

          

          {/* Seal Container - positioned as a wax stamp overlay */}
          <div className="flex justify-center mb-12 relative mt-10">
            <div
              ref={sealRef}
              className="relative w-72 h-72 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border-4 border-accent shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow duration-300"
            >
              {/* Outer decorative rings */}
              <div className="absolute inset-2 rounded-full border-2 border-accent/50" />
              <div className="absolute inset-6 rounded-full border-1 border-accent/30" />

              {/* Avatar with ornate styling */}
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-accent bg-black/20 flex items-center justify-center shadow-inner">
                <Image
                  src="/Tia/Tia_seal.jpg"
                  alt="Seal of Artezia Aurae"
                  fill
                  className="object-cover"
                />
              </div>

              

           
            </div>
          </div>

          {/* Call to Action Text */}
          <p
  ref={textRef}
  className="text-center text-xl md:text-2xl text-foreground font-serif leading-8 max-w-2xl mx-auto mb-12 italic"
>
  Join the ranks of those who&apos;ve found salvation through dreaming.
  Become an Impling. Exchange your nightmares for the peace you deserve.
</p>

          
          {/* Top 5 Reasons Section */}
          <div className="max-w-2xl mx-auto mb-12">
           <p className="text-center text-base font-display font-semibold text-accent tracking-[0.2em] uppercase mb-10">
  ✦ Five Sacred Reasons to Join ✦
</p>
            <div className="space-y-4">
              {/* Reason 1 */}
              <div className="border-l-2 border-accent/40 pl-4 py-2 group hover:border-accent/80 transition-all duration-300">
                <p className="text-base md:text-lg font-display font-semibold text-foreground uppercase tracking-[0.08em]">
  The Coziest Sanctuary
</p>
                <p className="text-sm text-foreground/70 mt-1 font-serif italic">
                  Find solace in voices that soothe the weary soul...
                </p>
              </div>

              {/* Reason 2 */}
              <div className="border-l-2 border-accent/40 pl-4 py-2 group hover:border-accent/80 transition-all duration-300">
                <p className="text-base md:text-lg font-display font-semibold text-foreground uppercase tracking-[0.08em]">
                  Witness the Enchantment
                </p>
                <p className="text-sm text-foreground/70 mt-1 font-serif italic">
                  Behold beauty that captivates all who lay eyes upon it...
                </p>
              </div>

              {/* Reason 3 */}
              <div className="border-l-2 border-accent/40 pl-4 py-2 group hover:border-accent/80 transition-all duration-300">
                <p className="text-base md:text-lg font-display font-semibold text-foreground uppercase tracking-[0.08em]">
                  Unite with the Implings
                </p>
                <p className="text-sm text-foreground/70 mt-1 font-serif italic">
                  Join a collective bound by devotion and purpose...
                </p>
              </div>

              {/* Reason 4 */}
              <div className="border-l-2 border-accent/40 pl-4 py-2 group hover:border-accent/80 transition-all duration-300">
                <p className="text-base md:text-lg font-display font-semibold text-foreground uppercase tracking-[0.08em]">
                  Mysterious Allure
                </p>
                <p className="text-sm text-foreground/70 mt-1 font-serif italic">
                  Discover secrets that cannot be spoken aloud here...
                </p>
              </div>

              {/* Reason 5 */}
              <div className="border-l-2 border-accent/40 pl-4 py-2 group hover:border-accent/80 transition-all duration-300">
                <p className="text-base md:text-lg font-display font-semibold text-foreground/80 uppercase tracking-[0.08em]">
                  Boundless Welcome
                </p>
                <p className="text-sm text-foreground/50 mt-1 font-serif italic">
                  All are embraced in this sacred circle of belonging...
                </p>
              </div>
            </div>

            {/* Website Reference - Sketchy and Mysterious */}
            <div className="mt-10 pt-8 border-t border-accent/20 text-center">
              <p className="text-base text-foreground/70 font-serif italic mb-3">
              Whispers speak of a place where truth is told...
              </p>

  <a
  href="https://www.tiaiscutepassiton.org"
  target="_blank"
  rel="noopener noreferrer"
  className="text-lg font-display font-semibold text-accent hover:text-accent/80 transition-colors duration-300 tracking-[0.15em]"
>
  TiaIsCutePassItOn.org
</a>

<p className="text-sm text-foreground/60 font-serif italic mt-3 leading-relaxed">
  (For those brave enough to seek enlightenment)
  </p>
            </div>
          </div>


          <div className="flex justify-center mb-4 text-lg tracking-[0.3em] text-accent">
  ◆ ✦ ◆ ✦ ◆
</div>

          {/* Bottom signature line */}
          <div className="flex justify-center mt-8">
            <div className="h-1 w-40 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
