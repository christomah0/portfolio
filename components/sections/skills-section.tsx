import { SKILLS_MOCK_DATA } from "../constants";
import SkillsItemCard from "../skill-item-card";

const SkillsSection = () => {
  return (
    <section id="skills" className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Skills</h2>
      <p className="text-center text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mb-8">
        I have a range of skills designed to bring your ideas to life. From building full-stack applications to crafting beautiful user interfaces, I've got you covered.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {SKILLS_MOCK_DATA.map((s, i) => (
          <SkillsItemCard
            key={i}
            title={s.title}
            description={s.description}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
