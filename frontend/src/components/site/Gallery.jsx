import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GALLERY as STATIC_GALLERY } from "@/data/content";
import { api } from "@/lib/api";

const YEARS = ["2026", "2025", "2024"];

export default function Gallery() {
  const [year, setYear] = useState("2026");
  const [dynamicByYear, setDynamicByYear] = useState({ 2024: [], 2025: [], 2026: [] });

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => {
        const grouped = { 2024: [], 2025: [], 2026: [] };
        (res.data || []).forEach((it) => {
          if (grouped[it.year]) {
            grouped[it.year].push({ src: it.image_data, cat: it.category, caption: it.caption });
          }
        });
        setDynamicByYear(grouped);
      })
      .catch(() => {});
  }, []);

  const merged = (y) => {
    const dynamic = dynamicByYear[y] || [];
    if (dynamic.length > 0) return dynamic;
    return STATIC_GALLERY[y] || [];
  };

  const items = merged(year);

  return (
    <section id="annual-day" className="py-24 md:py-32 bg-[#100A10]" data-testid="annual-day-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="kicker">Annual Day Celebrations</span>
            <h2 className="font-display text-5xl md:text-6xl text-[#F5E9D9] mt-4 leading-[0.95]">
              The stage,
              <span className="italic text-[#E1B168]"> our students.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[#D4C2A8] text-lg">
            Every year, more than <strong>80 students</strong> perform at our Annual Day at the
            Prabhath Kaladwaraka Auditorium, Koramangala — a grand celebration of music, learning, and community.
          </p>
        </div>

        <Tabs value={year} onValueChange={setYear} className="w-full" data-testid="gallery-tabs">
          <TabsList className="bg-transparent gap-2 p-0 mb-10 flex flex-wrap">
            {YEARS.map((y) => (
              <TabsTrigger
                key={y}
                value={y}
                data-testid={`gallery-year-${y}`}
                className="tab-pill rounded-full border border-[#3A2A26] bg-[#07050A] text-[#D4C2A8] px-5 py-2 text-sm hover:border-[#E8754B] transition-colors"
              >
                Annual Day {y}
              </TabsTrigger>
            ))}
          </TabsList>

          {YEARS.map((y) => (
            <TabsContent key={y} value={y} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={y}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                >
                  {merged(y).map((img, i) => {
                    const spans = ["row-span-2", "", "", "col-span-2", "", ""];
                    return (
                      <motion.figure
                        key={(img.src || "") + i}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.6 }}
                        className={`relative overflow-hidden rounded-xl border border-[#3A2A26] group ${spans[i % spans.length] || ""}`}
                        data-testid={`gallery-img-${y}-${i}`}
                      >
                        <img
                          src={img.src}
                          alt={img.caption || img.cat || ""}
                          className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#07050A] to-transparent text-[#F5E9D9] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Badge className="bg-[#E8754B] hover:bg-[#E8754B] text-[#07050A] mb-2">{img.cat}</Badge>
                          <div className="font-serif text-base leading-snug">{img.caption}</div>
                        </figcaption>
                      </motion.figure>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-10 flex flex-wrap gap-2">
          {["Student Performances", "Group Choirs", "Solo Performances", "Trophy Distribution", "Parents & Students", "Grand Finale"].map((c) => (
            <span key={c} className="text-xs uppercase tracking-[0.18em] text-[#9C8B7A] border border-[#3A2A26] rounded-full px-3 py-1">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
