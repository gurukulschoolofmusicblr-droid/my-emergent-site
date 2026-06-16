import { SCHOOL } from "@/data/content";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2B1414] text-[#FDFBF7] pt-20 pb-10" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={SCHOOL.logo} alt="Gurukul" className="h-14 w-14 object-contain rounded-full bg-[#FDFBF7]/10" />
              <div>
                <div className="font-display text-3xl">Gurukul</div>
                <div className="kicker" style={{ color: "#E1B168" }}>School of Music · Bangalore</div>
              </div>
            </div>
            <p className="font-serif italic text-2xl mt-6 text-[#E1B168]">&ldquo;Nurturing Talent. Enriching Lives.&rdquo;</p>
            <p className="mt-4 text-[#FAF7F2]/70 max-w-md">
              A living tradition of music in the heart of Bangalore. Online & offline classes for every age.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="kicker mb-4" style={{ color: "#E1B168" }}>Explore</div>
            <ul className="space-y-2 text-[#FAF7F2]/80">
              <li><a href="#about" className="hover:text-[#D95D39]">About</a></li>
              <li><a href="#courses" className="hover:text-[#D95D39]">Courses</a></li>
              <li><a href="#gurus" className="hover:text-[#D95D39]">Gurus</a></li>
              <li><a href="#annual-day" className="hover:text-[#D95D39]">Annual Day</a></li>
              <li><a href="#faq" className="hover:text-[#D95D39]">FAQ</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="kicker mb-4" style={{ color: "#E1B168" }}>Reach Us</div>
            <ul className="space-y-3 text-[#FAF7F2]/85">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#D95D39]" /> <a href={`tel:${SCHOOL.phones[0]}`}>{SCHOOL.phones[0]}</a></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#D95D39]" /> <a href={`tel:${SCHOOL.phones[1]}`}>{SCHOOL.phones[1]}</a></li>
              <li className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-[#D95D39]" /> <a href={`https://wa.me/91${SCHOOL.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Chat</a></li>
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 text-[#D95D39]" /> {SCHOOL.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#FDFBF7]/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-[#FAF7F2]/50">
          <div>© {new Date().getFullYear()} Gurukul School of Music. All rights reserved.</div>
          <div>Crafted with care · Bangalore, India</div>
        </div>
      </div>
    </footer>
  );
}
