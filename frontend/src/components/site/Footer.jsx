import { SCHOOL } from "@/data/content";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0E0908] to-[#000000] text-[#F5E9D9] pt-20 pb-10 border-t border-[#3A2A26]" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={SCHOOL.logo} alt="Gurukul" className="h-14 w-14 object-contain rounded-full bg-[#F5E9D9]/8 ring-1 ring-[#E1B168]/30" />
              <div>
                <div className="font-display text-3xl">Gurukul</div>
                <div className="kicker">School of Music · Bangalore</div>
              </div>
            </div>
            <p className="font-serif italic text-2xl mt-6 text-[#E1B168]">&ldquo;Nurturing Talent. Enriching Lives.&rdquo;</p>
            <p className="mt-4 text-[#9C8B7A] max-w-md">
              A living tradition of music in the heart of Bangalore. Online & offline classes for every age.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="kicker mb-4">Explore</div>
            <ul className="space-y-2 text-[#D4C2A8]">
              <li><a href="#about" className="hover:text-[#E8754B] transition-colors">About</a></li>
              <li><a href="#courses" className="hover:text-[#E8754B] transition-colors">Courses</a></li>
              <li><a href="#gurus" className="hover:text-[#E8754B] transition-colors">Gurus</a></li>
              <li><a href="#annual-day" className="hover:text-[#E8754B] transition-colors">Annual Day</a></li>
              <li><a href="#faq" className="hover:text-[#E8754B] transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="kicker mb-4">Reach Us</div>
            <ul className="space-y-3 text-[#D4C2A8]">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#E8754B]" /> <a href={`tel:${SCHOOL.phones[0]}`} className="hover:text-[#E8754B] transition-colors">{SCHOOL.phones[0]}</a></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#E8754B]" /> <a href={`tel:${SCHOOL.phones[1]}`} className="hover:text-[#E8754B] transition-colors">{SCHOOL.phones[1]}</a></li>
              <li className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-[#E8754B]" /> <a href={`https://wa.me/91${SCHOOL.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8754B] transition-colors">WhatsApp Chat</a></li>
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 text-[#E8754B]" /> {SCHOOL.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#3A2A26] flex flex-col md:flex-row justify-between gap-3 text-xs text-[#9C8B7A]">
          <div>© {new Date().getFullYear()} Gurukul School of Music. All rights reserved.</div>
          <div>Crafted with care · Bangalore, India</div>
        </div>
      </div>
    </footer>
  );
}
