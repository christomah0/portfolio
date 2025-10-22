"use client";

import { PROJECT_DATA } from "../constants";
import ProjectItemCard from "../project-item-card";

const ProjectsSection = () => {
  return (
    <section className="w-full py-12 px-4" id="projects">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Projects</h2>
      <div className="grid grid-cols-3 gap-4">
        {PROJECT_DATA.map((pt, idx) => (
          <ProjectItemCard
            key={idx}
            imageUrl={pt.imageUrl}
            name={pt.name}
            shortDescription={pt.shortDescription}
            linkName={pt.linkName}
            link={pt.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
