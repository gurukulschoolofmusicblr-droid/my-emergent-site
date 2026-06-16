import { User, Users, Globe, Home as HomeIcon } from "lucide-react";
import { LEARNING_OPTIONS } from "@/data/content";

const ICONS = { user: User, users: Users, globe: Globe, home: HomeIcon };

export default function Learning() {
  return (
    <section id="learning" className="py-24 md:py-32 bg-[#2B1414] text-[#FDFBF7] relative overflow-hidden" data-testid="learning-section">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mandala" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="max-w-3xl">
          <span className="kicker" style={{ color: "#E1B168" }}>Flexible Learning</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 leading-[0.95]">
            Learn the way
            <span className="italic" style={{ color: "#E1B168" }}> that suits you.</span>
          </h2>
          <p className="mt-6 text-lg text-[#FAF7F2]/80">
            Individual or group. Online via Zoom & Google Meet, or in-person at our Bangalore centre.
            We meet you where you are.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#3A2A26]/60" data-testid="learning-options">
          {LEARNING_OPTIONS.map((o) => {
            const Icon = ICONS[o.icon] || User;
            return (
              <div key={o.title} className="bg-[#2B1414] p-8 hover:bg-[#3A2A26] transition-colors duration-500 group">
                <Icon className="w-7 h-7 text-[#E1B168] group-hover:text-[#D95D39] transition-colors" />
                <h3 className="font-display text-2xl md:text-3xl mt-6 text-[#FDFBF7]">{o.title}</h3>
                <p className="mt-3 text-sm text-[#FAF7F2]/70 leading-relaxed">{o.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
