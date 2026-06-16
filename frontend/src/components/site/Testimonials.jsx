import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/data/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#07050A]" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <span className="kicker">Voices from our Gurukul</span>
          <h2 className="font-display text-5xl md:text-6xl text-[#F5E9D9] mt-4 leading-[0.95]">
            What students &
            <span className="italic text-[#E1B168]"> parents say.</span>
          </h2>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3" data-testid={`testimonial-${i}`}>
                <figure className="h-full bg-[#100A10] border border-[#3A2A26] rounded-2xl p-8 md:p-10 flex flex-col">
                  <span className="font-serif text-7xl leading-none text-[#E8754B] -mt-2">“</span>
                  <blockquote className="font-serif text-xl md:text-2xl text-[#F5E9D9] leading-snug mt-2 flex-1">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 pt-6 border-t border-[#3A2A26]">
                    <div className="text-[#F5E9D9] font-semibold">{t.author}</div>
                    <div className="kicker mt-1">{t.role}</div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-3 mt-8">
            <CarouselPrevious className="static translate-y-0 border-[#3A2A26] text-[#F5E9D9] hover:bg-[#F5E9D9] hover:text-[#07050A]" data-testid="testimonial-prev" />
            <CarouselNext className="static translate-y-0 border-[#3A2A26] text-[#F5E9D9] hover:bg-[#F5E9D9] hover:text-[#07050A]" data-testid="testimonial-next" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
