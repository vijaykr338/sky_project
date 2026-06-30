"use client";

import Hero from "@/components/Hero";
import VictorianRecruitment from "@/components/VictorianRecruitment";
import EditorialCover from "@/components/EditorialCover";
import Navigation from "@/components/Navigation";
import ClipsGallery from "@/components/ClipsGallery";
import CurvedLoop from "@/components/CurvedLoop";
import FindMeElsewhere from "@/components/FindMeElsewhere";
import { useState } from "react";
import PixelTransitionGallery from "@/components/PixelTransitionGallery";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("info");

  return (
    <div>
      <EditorialCover />
      <Hero />
      <PixelTransitionGallery />
      <ClipsGallery />
      <VictorianRecruitment />
      <FindMeElsewhere />
    </div>
  );
}