import { SKILLS_MOCK_DATA } from "../constants";
import SkillsItemCard from "../skill-item-card";

const SkillsSection = () => {
  return (
    <section id="skills" className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Skills</h2>
      <p className="text-center text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mb-12">
        I have a range of skills designed to bring your ideas to life. From building full-stack applications to crafting beautiful user interfaces, I've got you covered.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
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
