import { getSiteSettings } from "@/app/actions/settings";
import AboutMeSection from "./sections/about-me-section";
import ContactSection from "./sections/contact-section";
import ExperiencesSection from "./sections/experiences-section";
import HeroSection from "./sections/hero-section";
import ProjectsSection from "./sections/projects-section";
import SkillsSection from "./sections/skills-section";
import Separator from "./separator";

const Main = async () => {
  const settings = await getSiteSettings();

  return (
    <main className="pt-[50px] h-full">
      <div className="container w-full mx-auto border">
        <HeroSection />
        <Separator color={undefined} />
        <ProjectsSection />
        <Separator color={undefined} />
        <SkillsSection />
        <Separator color={undefined} />
        <ExperiencesSection />
        <Separator color={undefined} />
        <ContactSection />
        <Separator color={undefined} />
        <AboutMeSection photoUrl={settings.photoUrl} />
      </div>
    </main>
  )
}

export default Main;
