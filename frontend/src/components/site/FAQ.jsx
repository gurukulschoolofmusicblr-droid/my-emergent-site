import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FAQS } from "@/data/content";

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-[#FAF7F2]" data-testid="faq-section">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-7">
            <span className="kicker">Frequently Asked</span>
            <h2 className="font-display text-5xl md:text-6xl text-[#2B1414] mt-4 leading-[0.95]">
              Questions,
              <span className="italic text-[#9C4B35]"> gently answered.</span>
            </h2>
          </div>
        </div>

        <Accordion type="single" collapsible className="border-t border-[#EADDD7]" data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#EADDD7]">
              <AccordionTrigger
                className="font-serif text-xl md:text-2xl text-[#2B1414] hover:text-[#D95D39] hover:no-underline py-6 text-left"
                data-testid={`faq-q-${i}`}
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#3A2A26] text-base md:text-lg leading-relaxed pb-7">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
