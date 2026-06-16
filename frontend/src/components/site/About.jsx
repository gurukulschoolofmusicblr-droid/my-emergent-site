import { motion } from "framer-motion";
import { STATS } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#100A10]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="kicker">About Gurukul</span>
            <h2 className="font-display text-5xl md:text-6xl text-[#F5E9D9] mt-4 leading-[0.95]">
              A living tradition
              <span className="italic text-[#E1B168]"> of music.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-[#D4C2A8]">
            <p>
              Gurukul School of Music, Bangalore, is founded on the timeless <em className="font-serif">Guru-Shishya</em> tradition,
              where music is not merely taught but passed from heart to heart.
            </p>
            <p>
              Founded by <strong className="text-[#F5E9D9]">Rupali Sen Mukherjee</strong> and co-led by{" "}
              <strong className="text-[#F5E9D9]">Nilanjan Sen</strong>, Gurukul combines classical discipline with a warm,
              encouraging environment for learners of every age.
            </p>
            <p>
              Over the last 13+ years, we have helped more than 200 students discover and develop their musical
              abilities — from young children taking their first steps into music to adults fulfilling a
              lifelong dream.
            </p>
          </div>
        </div>

        {/* Stats — editorial */}
        <div className="mt-20 border-t border-[#3A2A26] pt-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6" data-testid="about-stats">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <span className="font-display text-5xl md:text-6xl text-[#E8754B]">{s.value}</span>
              <span className="mt-3 text-xs uppercase tracking-[0.2em] text-[#9C8B7A]">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
