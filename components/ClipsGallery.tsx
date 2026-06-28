"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Clip {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  embedUrl: string;
  twitchUrl: string;
  objectPosition?: string;
}

const COMMUNITY_FAVORITE_ID =
  "RespectfulBlitheWebNotLikeThis-GSEV1wXlL9CZDwM1";

const COMMUNITY_FAVORITE_URL =
  "https://www.twitch.tv/arteziaaurae/clip/RespectfulBlitheWebNotLikeThis-GSEV1wXlL9CZDwM1";

/*
  Twitch requires the hostname where the embed is shown.

  Local development:
  localhost

  Production:
  Set NEXT_PUBLIC_TWITCH_PARENT=your-domain.com in .env.local / Vercel.
*/
const TWITCH_PARENT =
  process.env.NEXT_PUBLIC_TWITCH_PARENT ?? "localhost";

function formatClip(rawClip: any): Clip {
  return {
    id: rawClip.id,
    title: rawClip.title || "Untitled clip",
    thumbnail:
      rawClip.thumbnail_url
        ?.replace("{width}", "840")
        .replace("{height}", "472") || "",
    date: new Date(rawClip.created_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    embedUrl: rawClip.embed_url,
    twitchUrl: rawClip.url,
    objectPosition: "center",
  };
}

function TwitchPlayer({
  clip,
  className = "",
}: {
  clip: Clip;
  className?: string;
}) {
  const separator = clip.embedUrl.includes("?") ? "&" : "?";

  return (
    <iframe
      src={`${clip.embedUrl}${separator}parent=${TWITCH_PARENT}&autoplay=false`}
      title={clip.title}
      className={className}
      allow="autoplay; fullscreen"
      allowFullScreen
      loading="lazy"
    />
  );
}

export default function ClipsGallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [featuredClip, setFeaturedClip] = useState<Clip | null>(null);
  const [carouselClips, setCarouselClips] = useState<Clip[]>([]);
  const [playingClipId, setPlayingClipId] = useState<string | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchClips = async () => {
      try {
        /*
          Fetch the featured clip separately.

          This is the important part:
          Twitch returns the real thumbnail_url for this exact clip.
        */
        const favoriteResponse = await fetch(
          `/api/twitch/clips?id=${COMMUNITY_FAVORITE_ID}`
        );

        if (!favoriteResponse.ok) {
          throw new Error("Could not fetch Community Favorite clip");
        }

        const favoriteJson = await favoriteResponse.json();
        const favoriteRawClip = favoriteJson.data?.[0];

        if (favoriteRawClip) {
          setFeaturedClip(formatClip(favoriteRawClip));
        } else {
          /*
            Fallback: the clip can still play even if Twitch API
            does not return its thumbnail.
          */
          setFeaturedClip({
            id: COMMUNITY_FAVORITE_ID,
            title: "Community's Favorite",
            thumbnail: "",
            date: "Community Favorite",
            embedUrl: `https://clips.twitch.tv/embed?clip=${COMMUNITY_FAVORITE_ID}`,
            twitchUrl: COMMUNITY_FAVORITE_URL,
            objectPosition: "center",
          });
        }

        /*
          Fetch latest clips for the horizontal carousel.
        */
        const clipsResponse = await fetch(
          "/api/twitch/clips?broadcaster_id=1318103793&first=10"
        );

        if (!clipsResponse.ok) {
          throw new Error("Could not fetch carousel clips");
        }

        const clipsJson = await clipsResponse.json();

        const clips: Clip[] = (clipsJson.data ?? [])
          .map(formatClip)
          .filter((clip: Clip) => clip.id !== COMMUNITY_FAVORITE_ID);

        setCarouselClips(clips);
      } catch (error) {
        console.error("Failed to load Twitch clips:", error);

        /*
          Keep a playable fallback even if the API fails.
        */
        setFeaturedClip({
          id: COMMUNITY_FAVORITE_ID,
          title: "Community's Favorite",
          thumbnail: "",
          date: "Community Favorite",
          embedUrl: `https://clips.twitch.tv/embed?clip=${COMMUNITY_FAVORITE_ID}`,
          twitchUrl: COMMUNITY_FAVORITE_URL,
          objectPosition: "center",
        });
      }
    };

    fetchClips();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from("[data-featured-clip], [data-featured-info]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });

      const carouselCards = gsap.utils.toArray("[data-carousel-card]");

      carouselCards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [carouselClips]);

  const checkScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 5);

    setCanScrollRight(
      carousel.scrollLeft <
        carousel.scrollWidth - carousel.clientWidth - 5
    );
  };

  const scroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = 400;

    gsap.to(carousel, {
      scrollLeft:
        carousel.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount),
      duration: 0.7,
      ease: "power2.out",
      onComplete: checkScroll,
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    checkScroll();

    return () => {
      carousel.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [carouselClips]);

  function renderClipMedia(clip: Clip, isFeatured = false) {
    const isPlaying = playingClipId === clip.id;

    if (isPlaying) {
      return (
        <TwitchPlayer
          clip={clip}
          className="aspect-video w-full rounded-lg border-0"
        />
      );
    }

    /*
      If Twitch did not return a thumbnail, show a playable
      black fallback panel instead of a broken image.
    */
    if (!clip.thumbnail) {
      return (
        <button
          type="button"
          onClick={() => setPlayingClipId(clip.id)}
          className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-950 text-white"
          aria-label={`Play ${clip.title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-background">
            <svg
              className="ml-1 h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setPlayingClipId(clip.id)}
        className="group relative block w-full overflow-hidden rounded-lg bg-neutral-900 text-left"
        aria-label={`Play ${clip.title}`}
      >
        <img
          src={clip.thumbnail}
          alt=""
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{
            objectPosition: clip.objectPosition ?? "center",
          }}
        />

        <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/45" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`flex items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              isFeatured ? "h-16 w-16" : "h-12 w-12"
            }`}
          >
            <svg
              className={isFeatured ? "ml-1 h-8 w-8" : "ml-0.5 h-6 w-6"}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </button>
    );
  }

  return (
    <section
      ref={containerRef}
      className="border-t border-border bg-background px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="mb-2 font-display text-5xl font-bold text-foreground">
            Clips Gallery
          </h2>
          <p className="font-serif text-lg text-muted-foreground">
            Memorable moments from the community
          </p>
        </div>

        {!featuredClip ? (
          <p className="font-serif text-muted-foreground">
            Loading community clips…
          </p>
        ) : (
          <div className="mb-12 flex flex-col gap-12 xl:flex-row xl:items-start">
            <article
              data-featured-clip
              className="w-full border-4 border-accent p-3 xl:w-[460px]"
            >
              <div className="relative">
                <div className="absolute -top-11 left-0 z-10">
                  <span className="inline-block border-2 border-accent bg-background px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-accent">
                    Community&apos;s Favorite
                  </span>
                </div>

                {renderClipMedia(featuredClip, true)}
              </div>

              <div data-featured-info className="mt-5">
                <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                  {featuredClip.title}
                </h3>

                <p className="mb-4 font-serif text-muted-foreground">
                  {featuredClip.date}
                </p>

                <a
                  href={featuredClip.twitchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-display text-sm font-bold uppercase tracking-wider text-accent transition-opacity hover:opacity-70"
                >
                  Watch on Twitch
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <div className="min-w-0 flex-1">
              <div className="mb-6 flex items-center gap-4">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  More Moments
                </h3>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    aria-label="Scroll clips left"
                    className="border-2 border-border p-2 transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    aria-label="Scroll clips right"
                    className="border-2 border-border p-2 transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                ref={carouselRef}
                className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-10 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {carouselClips.map((clip) => (
                  <article
                    key={clip.id}
                    data-carousel-card
                    className="w-[320px] flex-none snap-start lg:w-[340px]"
                  >
                    {renderClipMedia(clip)}

                    <div className="mt-4 min-w-0">
                      <h4 className="truncate font-serif font-semibold text-foreground">
                        {clip.title}
                      </h4>

                      <p className="mt-1 truncate font-serif text-sm text-muted-foreground">
                        {clip.date}
                      </p>

                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 