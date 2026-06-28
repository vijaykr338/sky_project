'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({
  activeSection,
  setActiveSection,
}: NavigationProps) {
  const navItems = ['INFO', 'CLIPS', 'LINKS']
  const underlineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['info', 'clips', 'links']
      const scrollPosition = window.scrollY

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  useEffect(() => {
    const activeIndex = navItems.map(item => item.toLowerCase()).indexOf(activeSection)
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const item = itemRefs.current[activeIndex]
      if (item && underlineRef.current) {
        gsap.to(underlineRef.current, {
          left: item.offsetLeft,
          width: item.offsetWidth,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }
  }, [activeSection])

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      })
      setActiveSection(section)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-center">
        <div className="flex gap-12 relative">
          {navItems.map((item, index) => (
            <a
              key={item}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.toLowerCase())
              }}
              href={`#${item.toLowerCase()}`}
              className="text-foreground text-sm font-display font-semibold tracking-widest hover:text-accent transition-colors cursor-pointer group relative"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <div
            ref={underlineRef}
            className="absolute bottom-0 h-0.5 bg-accent pointer-events-none"
          />
        </div>
      </div>
    </nav>
  )
}
