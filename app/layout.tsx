import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cinzel, Crimson_Text, Spectral } from 'next/font/google'
import "./globals.css";
import LoadingScreen from "../components/LoadingScreen";
import Ribbons from "../components/Ribbons";
import LoadingProvider from "@/components/LoadingProvider";

const cinzel = Cinzel({
  variable: '--font-display',
  subsets: ['latin'],
})

const crimsonText = Crimson_Text({
  weight: ['400', '600'],
  variable: '--font-serif',
  subsets: ['latin'],
})

const spectral = Spectral({
  weight: ['400', '600'],
  variable: '--font-body',
  subsets: ['latin'],
})


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artezia Aurae",
  description: "made by sky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${cinzel.variable} ${crimsonText.variable} ${spectral.variable}  ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col">
        <LoadingProvider />
        {children}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10000 }}>
          <Ribbons
            colors={["#B11226","#000000"]}
            baseSpring={0.03}
            baseFriction={0.9}
            baseThickness={30}
            offsetFactor={0.05}
            maxAge={500}
            pointCount={50}
            speedMultiplier={0.6}
            enableFade={false}
            enableShaderEffect={false}
            effectAmplitude={2}
          />
        </div>
      </body>
    </html>
  );
}
