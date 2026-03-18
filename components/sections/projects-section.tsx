import { getProjects } from "@/app/actions/projects";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import ProjectItemCard from "../project-item-card";

const ProjectsSection = async () => {
  const [projects, t] = await Promise.all([getProjects(), getServerDictionary()]);

  if (projects.length === 0) return null;

  return (
    <section className="w-full py-8 px-4 md:py-12 md:px-8" id="projects">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">{t.publicSections.projectsTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((pt) => (
          <ProjectItemCard
            key={pt.id}
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
