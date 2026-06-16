import { motion } from "framer-motion";
import { Phone, ArrowDownRight } from "lucide-react";
import { SCHOOL } from "@/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 md:pt-40 pb-24 overflow-hidden bg-[#0A0605]"
      data-testid="hero-section"
    >
      {/* Deep traditional background — layered: solid dark, vignette, rangoli pattern, warm radial glow */}
      <div className="absolute inset-0 -z-10 bg-[#0A0605]" />
      <div className="absolute inset-0 -z-10 pattern-rangoli opacity-90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0A0605]/60 to-[#0A0605]" />

      {/* Warm diya glows */}
      <div className="glow-warm diya-glow w-[700px] h-[700px] top-[-200px] right-[-150px] opacity-60" />
      <div className="glow-warm diya-glow w-[500px] h-[500px] bottom-[-150px] left-[-100px] opacity-40" style={{ animationDelay: "1.5s" }} />

      {/* Ornamental brass top border */}
      <div className="absolute top-20 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A4C]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#B58A4C]" />
              <span className="font-grand text-[#E1B168] text-xs tracking-[0.32em] uppercase">
                Bangalore · Est. 2012
              </span>
            </motion.div>

            {/* Devanagari-style flourish */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
              className="mt-6 font-indic text-[#E1B168]/80 text-xl md:text-2xl"
            >
              ॥ संगीतम् आत्मनः वाणी ॥
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={2}
              className="font-grand mt-5 text-6xl md:text-8xl lg:text-[8.5rem] text-tilak leading-[0.92]"
              data-testid="hero-title"
            >
              GURUKUL
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={3}
              className="mt-2 font-display italic text-4xl md:text-5xl lg:text-6xl text-[#F5E9D9]"
            >
              School of Music
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={4}
              className="ornament mt-8"
            >
              <span className="font-serif italic text-lg md:text-xl text-[#E1B168]">
                Nurturing Talent · Enriching Lives
              </span>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={5}
              className="mt-8 max-w-2xl text-lg md:text-xl text-[#D4C2A8] leading-relaxed"
            >
              Learn from experienced musicians in a nurturing{" "}
              <em className="font-serif text-[#E8754B] not-italic">Guru–Shishya</em> tradition.
              Whether you are a curious beginner or an advanced learner, discover the joy of music
              through personalised guidance and structured training.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={6}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="btn-saffron" data-testid="hero-book-demo-btn">
                Book a Free Demo Class <ArrowDownRight className="w-4 h-4" />
              </a>
              <a href={`tel:${SCHOOL.phones[0]}`} className="btn-ghost" data-testid="hero-call-btn">
                <Phone className="w-4 h-4" /> {SCHOOL.phones[0]}
              </a>
              <a
                href={`tel:${SCHOOL.phones[1]}`}
                className="text-sm text-[#9C8B7A] hover:text-[#E8754B] transition-colors"
              >
                or {SCHOOL.phones[1]}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={7}
            className="lg:col-span-4 lg:pl-10 lg:border-l lg:border-[#3A2A26]/70"
          >
            <ul className="space-y-6 text-[#D4C2A8]" data-testid="hero-badges">
              {[
                ["13+", "Years of Excellence"],
                ["200+", "Students Trained"],
                ["5.0★", "On UrbanPro · 69 Reviews"],
                ["3 → 70+", "Ages Welcomed"],
                ["Online & Offline", "Classes Available"],
              ].map(([k, v]) => (
                <li key={v} className="flex items-baseline gap-4">
                  <span className="font-grand text-2xl md:text-3xl text-tilak">{k}</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#9C8B7A]">{v}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Ornamental brass bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A4C]/40 to-transparent" />
    </section>
  );
}
