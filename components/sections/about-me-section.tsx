import Image from 'next/image';
import { FaReact, FaNodeJs, FaJava, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiSpringboot, SiJetpackcompose, SiPostgresql, SiMongodb, SiKubernetes } from 'react-icons/si';

const AboutMeSection = () => {
  return (
    <section id="about-me" className="w-full min-h-screen flex flex-col gap-12 items-center justify-center p-8">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl">
        <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/my-photo.png"
            alt="Jean Christophe MAHALOMBA"
            width={400}
            height={400}
            objectFit="cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Hi, I'm <span className="font-semibold">Jean Christophe MAHALOMBA</span>, a passionate and results-driven software developer with expertise in building scalable and robust applications. I thrive on solving complex problems and am dedicated to writing clean, efficient, and maintainable code. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life from concept to deployment.
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">Technologies I Use</h3>
        <div className="flex flex-wrap justify-center gap-8 text-5xl text-gray-800">
          <div className="flex flex-col items-center">
            <FaReact />
            <span className="text-sm mt-2">React</span>
          </div>
          <div className="flex flex-col items-center">
            <SiTypescript />
            <span className="text-sm mt-2">TypeScript</span>
          </div>
          <div className="flex flex-col items-center">
            <FaNodeJs />
            <span className="text-sm mt-2">Node.js</span>
          </div>
          <div className="flex flex-col items-center">
            <SiSpringboot />
            <span className="text-sm mt-2">Spring Boot</span>
          </div>
          <div className="flex flex-col items-center">
            <FaJava />
            <span className="text-sm mt-2">Java</span>
          </div>
          <div className="flex flex-col items-center">
            <SiJetpackcompose />
            <span className="text-sm mt-2">Jetpack Compose</span>
          </div>
          <div className="flex flex-col items-center">
            <SiPostgresql />
            <span className="text-sm mt-2">PostgreSQL</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMongodb />
            <span className="text-sm mt-2">MongoDB</span>
          </div>
          <div className="flex flex-col items-center">
            <FaAws />
            <span className="text-sm mt-2">AWS</span>
          </div>
          <div className="flex flex-col items-center">
            <FaDocker />
            <span className="text-sm mt-2">Docker</span>
          </div>
          <div className="flex flex-col items-center">
            <SiKubernetes />
            <span className="text-sm mt-2">Kubernetes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
