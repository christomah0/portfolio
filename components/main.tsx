"use client";

import AboutMeSection from "./sections/about-me-section";
import HeroSection from "./sections/hero-section";
import ProjectsSection from "./sections/projects-section";
import SkillsSection from "./sections/skills-section";
import Separator from "./separator";

const Main = () => {
  return (
    <main className="pt-[50px] h-full">
      <div className="container w-full mx-auto border">
        <HeroSection />
        <Separator color={undefined} />
        <ProjectsSection />
        <Separator color={undefined} />
        <SkillsSection />
        <Separator color={undefined} />
        <AboutMeSection />
      </div>
    </main>
  )
}

export default Main;
