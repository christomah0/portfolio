import { getSkills } from "@/app/actions/skills";
import SkillsItemCard from "../skill-item-card";

const SkillsSection = async () => {
  const skills = await getSkills();

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Skills</h2>
      <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
        I have a range of skills designed to bring your ideas to life. From building full-stack applications to crafting beautiful user interfaces, I've got you covered.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {skills.map((s) => (
          <SkillsItemCard
            key={s.id}
            title={s.title}
            description={s.description}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
