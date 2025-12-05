"use client";

import { PROJECT_DATA } from "../constants";
import ProjectItemCard from "../project-item-card";

const ProjectsSection = () => {
  return (
    <section className="w-full py-8 px-4 md:py-12 md:px-8" id="projects">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
