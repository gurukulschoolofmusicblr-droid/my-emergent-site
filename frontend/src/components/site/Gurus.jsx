import { motion } from "framer-motion";
import { GURUS } from "@/data/content";

export default function Gurus() {
  return (
    <section id="gurus" className="py-24 md:py-32 bg-[#07050A]" data-testid="gurus-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <span className="kicker">Meet Your Gurus</span>
          <h2 className="font-display text-5xl md:text-6xl text-[#F5E9D9] mt-4 leading-[0.95]">
            Teachers who have
            <span className="italic text-[#E1B168]"> walked the path.</span>
          </h2>
        </div>

        <div className="space-y-24">
          {GURUS.map((g, idx) => (
            <motion.article
              key={g.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-12 gap-10 items-start ${
                idx % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
              data-testid={`guru-${idx}`}
            >
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-3 bg-[#E1B168]/30 rounded-2xl -z-10 translate-x-3 translate-y-3" />
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[#100A10] border border-[#3A2A26]">
                    <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <span className="kicker">{g.role}</span>
                <h3 className="font-display text-4xl md:text-5xl text-[#F5E9D9] mt-3 leading-tight">{g.name}</h3>
                <p className="mt-5 text-lg text-[#D4C2A8] leading-relaxed">{g.bio}</p>

                {g.qualifications?.length > 0 && (
                  <div className="mt-8">
                    <div className="kicker mb-3">Qualifications</div>
                    <ul className="space-y-1 text-[#D4C2A8]">
                      {g.qualifications.map((q) => (
                        <li key={q} className="font-serif text-lg">— {q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="kicker mb-3">Expertise</div>
                    <ul className="space-y-1 text-[#D4C2A8]">
                      {g.expertise.map((e) => (
                        <li key={e} className="text-base">· {e}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="kicker mb-3">Highlights</div>
                    <ul className="space-y-1 text-[#D4C2A8]">
                      {g.highlights.map((h) => (
                        <li key={h} className="text-base">· {h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
