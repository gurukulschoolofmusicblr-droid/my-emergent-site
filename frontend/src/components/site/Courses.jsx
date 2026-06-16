import { motion } from "framer-motion";
import { COURSES } from "@/data/content";

export default function Courses() {
  return (
    <section id="courses" className="py-24 md:py-32 bg-[#FDFBF7]" data-testid="courses-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <span className="kicker">Our Disciplines</span>
            <h2 className="font-display text-5xl md:text-6xl text-[#2B1414] mt-4 leading-[0.95]">
              Four paths,
              <span className="italic text-[#9C4B35]"> one music.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[#3A2A26] text-lg">
            From the foundational ragas of Hindustani Classical to the warmth of Bollywood, our curriculum
            honours tradition while inviting every voice in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6" data-testid="courses-grid">
          {COURSES.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="course-card group bg-[#FAF7F2] border border-[#EADDD7]"
              data-testid={`course-card-${c.id}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-7 md:p-9">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#75635E]">
                  <span className="w-6 h-px bg-[#D95D39]" />
                  {c.age}
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-[#2B1414] mt-3 leading-tight">{c.name}</h3>
                <p className="font-serif italic text-[#9C4B35] mt-2">{c.short}</p>
                <p className="mt-4 text-[#3A2A26] leading-relaxed">{c.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
