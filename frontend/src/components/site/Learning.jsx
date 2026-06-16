import { User, Users, Globe, Home as HomeIcon } from "lucide-react";
import { LEARNING_OPTIONS } from "@/data/content";

const ICONS = { user: User, users: Users, globe: Globe, home: HomeIcon };

export default function Learning() {
  return (
    <section id="learning" className="py-24 md:py-32 bg-[#100A10] text-[#F5E9D9] relative overflow-hidden" data-testid="learning-section">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mandala" />
      <div className="glow-warm w-[600px] h-[600px] -top-40 -right-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="max-w-3xl">
          <span className="kicker">Flexible Learning</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 leading-[0.95]">
            Learn the way
            <span className="italic text-[#E1B168]"> that suits you.</span>
          </h2>
          <p className="mt-6 text-lg text-[#D4C2A8]">
            Individual or group. Online via Zoom & Google Meet, or in-person at our Bangalore centre.
            We meet you where you are.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#3A2A26]/40 rounded-2xl overflow-hidden border border-[#3A2A26]" data-testid="learning-options">
          {LEARNING_OPTIONS.map((o) => {
            const Icon = ICONS[o.icon] || User;
            return (
              <div key={o.title} className="bg-gradient-to-b from-[#211816] to-[#100A10] p-8 hover:from-[#2A1E1B] hover:to-[#211816] transition-colors duration-500 group">
                <Icon className="w-7 h-7 text-[#E1B168] group-hover:text-[#E8754B] transition-colors" />
                <h3 className="font-display text-2xl md:text-3xl mt-6 text-[#F5E9D9]">{o.title}</h3>
                <p className="mt-3 text-sm text-[#9C8B7A] leading-relaxed">{o.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
