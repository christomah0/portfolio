"use client";

import Image from "next/image";
import { FaReact, FaJava, FaDocker, FaLaravel } from "react-icons/fa";
import { SiSpringboot, SiJetpackcompose, SiPostgresql, SiMongodb, SiMysql, SiGithub } from "react-icons/si";
import { useTranslation } from "@/lib/i18n/i18n-context";

const AboutMeSection = ({ photoUrl }: { photoUrl: string }) => {
  const { t } = useTranslation();

  return (
    <section id="about-me" className="w-full min-h-screen flex flex-col gap-8 items-center justify-center p-6 md:p-8">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 max-w-4xl">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t.publicSections.aboutMeTitle}</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {t.publicSections.aboutMeDescription}
          </p>
        </div>
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-slate-200">
          <Image
            src={photoUrl}
            alt="Jean Christophe MAHALOMBA"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4">{t.publicSections.techTitle}</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-11 gap-6 justify-center text-3xl sm:text-4xl md:text-5xl text-gray-800">
          <div className="flex flex-col items-center">
            <FaReact />
            <span className="text-xs sm:text-sm mt-2">React</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMysql />
            <span className="text-xs sm:text-sm mt-2">MySQL</span>
          </div>
          <div className="flex flex-col items-center">
            <SiSpringboot />
            <span className="text-xs sm:text-sm mt-2">Spring Boot</span>
          </div>
          <div className="flex flex-col items-center">
            <FaJava />
            <span className="text-xs sm:text-sm mt-2">Java</span>
          </div>
          <div className="flex flex-col items-center">
            <SiJetpackcompose />
            <span className="text-xs sm:text-sm mt-2">Jetpack</span>
          </div>
          <div className="flex flex-col items-center">
            <SiPostgresql />
            <span className="text-xs sm:text-sm mt-2">Postgres</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMongodb />
            <span className="text-xs sm:text-sm mt-2">MongoDB</span>
          </div>
          <div className="flex flex-col items-center">
            <FaLaravel />
            <span className="text-xs sm:text-sm mt-2">Laravel</span>
          </div>
          <div className="flex flex-col items-center">
            <FaDocker />
            <span className="text-xs sm:text-sm mt-2">Docker</span>
          </div>
          <div className="flex flex-col items-center">
            <SiGithub />
            <span className="text-xs sm:text-sm mt-2">GitHub</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
