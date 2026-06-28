"use client";

interface Platform {
  name: string;
  description: string;
  url: string;
}

const PLATFORMS: Platform[] = [

  {
    name: "TWITCH",
    description: "Live Streams",
    url: "https://www.twitch.tv/arteziaaurae",
  },
  {
    name: "YOUTUBE",
    description: "Videos & Highlights",
    url: "https://www.youtube.com/@Artezia-Aurae",
  },
  {
    name: "YOUTUBE LIVE",
    description: "Live VODs & Streams",
    url: "https://www.youtube.com/@ArteziaAuraeLIVE",
  },
  {
    name: "CLIPS",
    description: "Short Clips",
    url: "https://www.youtube.com/@DailyArtezia",
  },
  {
    name: "TIKTOK",
    description: "Short Videos",
    url: "https://www.tiktok.com/@arteziaaurae",
  },
  {
    name: "BLUESKY",
    description: "Updates & Posts",
    url: "https://bsky.app/profile/arteziaaurae.bsky.social",
  },
  {
    name: "TWITTER / X",
    description: "Updates & Memes",
    url: "https://x.com/ArteziaAurae",
  },
  {
    name: "DISCORD",
    description: "Join the Implings",
    url: "https://discord.gg/EVeXWaTf",
  },
  {
    name: "THRONE",
    description: "Wishlist & Gifts",
    url: "https://throne.com/arteziaaurae",
  },

];

export default function FindMeElsewhere() {
  return (
    <section
      id="links"
      className="relative overflow-hidden border-y bg-[#f8f7f5]"
      style={{ borderColor: "#d60031" }}
    >
      {/* Decorative Diamonds */}
      <div
        className="absolute left-8 top-8 h-16 w-16 rotate-45 border"
        style={{ borderColor: "rgba(214,0,49,.18)" }}
      />
      <div
        className="absolute right-10 bottom-10 h-20 w-20 rotate-45 border"
        style={{ borderColor: "rgba(214,0,49,.18)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-3 text-xs font-bold tracking-[0.35em]"
            style={{ color: "#d60031" }}
          >
            FIND ME ELSEWHERE
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#111111] md:text-6xl">
            Keep up with streams,
            <br />
            clips, announcements
            <br />
            and chaos.
          </h2>

          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ background: "#d60031" }}
          />
        </div>

        {/* Directory */}
        <div className="mx-auto mt-20 max-w-5xl">
          {PLATFORMS.map((platform, index) => (
            <PlatformRow
              key={platform.name}
              platform={platform}
              index={index}
            />
          ))}
        </div>

        <p className="mt-20 text-center font-serif text-neutral-500">
          made by sky 💖
        </p>
      </div>
    </section>
  );
}

function PlatformRow({
  platform,
  index,
}: {
  platform: Platform;
  index: number;
}) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        relative
        flex
        items-center
        border-b
        border-neutral-300
        py-10
        transition-all
        duration-500
        hover:border-[#d60031]
      "
    >
      {/* Animated underline */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-[#d60031]
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* Number */}
      <div className="w-20 shrink-0">
        <span className="font-serif text-sm text-neutral-400">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Name */}
      <div className="flex-1">
        <h3
          className="
            font-display
            text-2xl
            tracking-[0.15em]
            text-[#111111]
            transition-colors
            duration-300
            group-hover:text-[#d60031]
          "
        >
          {platform.name}
        </h3>

        <p className="mt-2 font-serif text-neutral-500">
          {platform.description}
        </p>
      </div>

      {/* Arrow */}
      <div
        className="
          text-3xl
          text-neutral-400
          transition-all
          duration-300
          group-hover:-translate-y-1
          group-hover:translate-x-2
          group-hover:text-[#d60031]
        "
      >
        ↗
      </div>
    </a>
  );
}