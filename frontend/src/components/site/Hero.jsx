import { motion } from "framer-motion";
import { Phone, ArrowDownRight } from "lucide-react";
import { SCHOOL } from "@/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 overflow-hidden" data-testid="hero-section">
      {/* Background — warm ambient image with cream wash */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1658428522304-45ea885a5a11?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0908] via-[#0E0908]/70 to-[#0E0908]" />
        <div className="absolute inset-0 mandala opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <span className="kicker">Bangalore · Est. 2012</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="font-display text-[#F5E9D9] mt-6 text-6xl md:text-7xl lg:text-[8.5rem]"
            data-testid="hero-title"
          >
            Gurukul
            <span className="block italic text-[#E1B168] -mt-2">School of Music</span>
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="ornament mt-8"
          >
            <span className="font-serif italic text-lg text-[#E1B168]">Nurturing Talent · Enriching Lives</span>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-8 max-w-2xl text-lg md:text-xl text-[#D4C2A8] leading-relaxed"
          >
            Learn from experienced musicians in a nurturing <em className="font-serif text-[#E8754B]">Guru–Shishya</em> tradition.
            Whether you are a curious beginner or an advanced learner, discover the joy of music through
            personalised guidance and structured training.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-saffron" data-testid="hero-book-demo-btn">
              Book a Free Demo Class <ArrowDownRight className="w-4 h-4" />
            </a>
            <a href={`tel:${SCHOOL.phones[0]}`} className="btn-ghost" data-testid="hero-call-btn">
              <Phone className="w-4 h-4" /> {SCHOOL.phones[0]}
            </a>
            <a href={`tel:${SCHOOL.phones[1]}`} className="text-sm text-[#9C8B7A] hover:text-[#E8754B] transition-colors">
              or {SCHOOL.phones[1]}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={5}
          className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-[#3A2A26]"
        >
          <ul className="space-y-5 text-[#D4C2A8]" data-testid="hero-badges">
            {[
              ["13+", "Years of Excellence"],
              ["200+", "Students Trained"],
              ["3 → 70+", "Ages Welcomed"],
              ["Online & Offline", "Classes Available"],
            ].map(([k, v]) => (
              <li key={v} className="flex items-baseline gap-4">
                <span className="font-serif text-3xl text-[#E8754B]">{k}</span>
                <span className="text-sm uppercase tracking-[0.18em] text-[#9C8B7A]">{v}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
