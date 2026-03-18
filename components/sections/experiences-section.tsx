import { getExperiences } from "@/app/actions/experiences";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import ExperienceItemCard from "../experience-item-card";

const ExperiencesSection = async () => {
  const [experiences, t] = await Promise.all([getExperiences(), getServerDictionary()]);

  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
        {t.publicSections.experienceTitle}
      </h2>
      <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
        {t.publicSections.experienceDescription}
      </p>

      <div className="w-full max-w-3xl">
        <div className="relative border-l-2 border-slate-300 ml-4 sm:ml-6">
          {experiences.map((exp, index) => (
            <ExperienceItemCard
              key={exp.id}
              role={exp.role}
              company={exp.company}
              location={exp.location}
              startDate={exp.startDate}
              endDate={exp.endDate}
              description={exp.description}
              presentLabel={t.publicSections.present}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
