import Image from 'next/image';
import { FaReact, FaNodeJs, FaJava, FaAws, FaDocker, FaLaravel } from 'react-icons/fa';
import { SiTypescript, SiSpringboot, SiJetpackcompose, SiPostgresql, SiMongodb, SiKubernetes, SiMysql } from 'react-icons/si';

const AboutMeSection = () => {
  return (
    <section id="about-me" className="w-full min-h-screen flex flex-col gap-8 items-center justify-center p-6 md:p-8">
      <div className="flex flex-col-reverse md:flex-row items-center gap-6 max-w-4xl">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Hi, I'm <span className="font-semibold">Jean Christophe MAHALOMBA</span>, a passionate and results-driven software developer with expertise in building scalable and robust applications. I thrive on solving complex problems and am dedicated to writing clean, efficient, and maintainable code. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life from concept to deployment.
          </p>
        </div>
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/my-photo.png"
            alt="Jean Christophe MAHALOMBA"
            width={600}
            height={600}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4">Some Of Technologies I Use</h3>
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
          {/* <div className="flex flex-col items-center">
            <SiKubernetes />
            <span className="text-xs sm:text-sm mt-2">K8s</span>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
