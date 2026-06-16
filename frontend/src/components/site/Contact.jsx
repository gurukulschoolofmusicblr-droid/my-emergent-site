import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SCHOOL, COURSES } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = { name: "", phone: "", email: "", age: "", course: "", mode: "online", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const update = (k) => (v) => setForm((s) => ({ ...s, [k]: typeof v === "string" ? v : v.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please share your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/demo-bookings`, {
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        age: form.age || null,
        course: form.course || null,
        mode: form.mode || null,
        message: form.message || null,
      });

      const waText = encodeURIComponent(
        `Namaste! I'd like to book a free demo class at Gurukul School of Music.\n\n` +
          `Name: ${form.name}\nPhone: ${form.phone}` +
          (form.email ? `\nEmail: ${form.email}` : "") +
          (form.age ? `\nAge: ${form.age}` : "") +
          (form.course ? `\nCourse interested: ${form.course}` : "") +
          (form.mode ? `\nMode: ${form.mode}` : "") +
          (form.message ? `\nMessage: ${form.message}` : "")
      );
      toast.success("Booking received! Opening WhatsApp to confirm…");
      setForm(initial);
      window.open(`https://wa.me/91${SCHOOL.whatsapp}?text=${waText}`, "_blank", "noopener");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please call us directly at " + SCHOOL.phones[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#07050A]" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="kicker">Begin your journey</span>
            <h2 className="font-display text-5xl md:text-6xl text-[#F5E9D9] mt-4 leading-[0.95]">
              Book a free
              <span className="italic text-[#E1B168]"> demo class.</span>
            </h2>
            <p className="mt-6 text-lg text-[#D4C2A8]">
              Tell us a little about yourself and we’ll be in touch the same day. Submit the form and you’ll be redirected to WhatsApp to confirm directly with Nilanjan Sir.
            </p>

            <div className="mt-10 space-y-5 text-[#D4C2A8]">
              <a href={`tel:${SCHOOL.phones[0]}`} className="flex items-start gap-4 group" data-testid="contact-phone-1">
                <Phone className="w-5 h-5 mt-1 text-[#E8754B]" />
                <div>
                  <div className="kicker">Nilanjan Sen</div>
                  <div className="font-serif text-2xl group-hover:text-[#E8754B] transition-colors">{SCHOOL.phones[0]}</div>
                </div>
              </a>
              <a href={`tel:${SCHOOL.phones[1]}`} className="flex items-start gap-4 group" data-testid="contact-phone-2">
                <Phone className="w-5 h-5 mt-1 text-[#E8754B]" />
                <div>
                  <div className="kicker">Alternative</div>
                  <div className="font-serif text-2xl group-hover:text-[#E8754B] transition-colors">{SCHOOL.phones[1]}</div>
                </div>
              </a>
              <a
                href={`https://wa.me/91${SCHOOL.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
                data-testid="contact-whatsapp"
              >
                <MessageCircle className="w-5 h-5 mt-1 text-[#E8754B]" />
                <div>
                  <div className="kicker">WhatsApp</div>
                  <div className="font-serif text-2xl group-hover:text-[#E8754B] transition-colors">
                    Chat with us <ArrowUpRight className="inline w-4 h-4" />
                  </div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 text-[#E8754B]" />
                <div>
                  <div className="kicker">Visit</div>
                  <div className="font-serif text-2xl">{SCHOOL.address}</div>
                </div>
              </div>
              <a href={`mailto:${SCHOOL.emails[0]}`} className="flex items-start gap-4 group" data-testid="contact-email-1">
                <Mail className="w-5 h-5 mt-1 text-[#E8754B]" />
                <div>
                  <div className="kicker">Nilanjan Sen · Email</div>
                  <div className="font-serif text-xl md:text-2xl group-hover:text-[#E8754B] transition-colors break-all">{SCHOOL.emails[0]}</div>
                </div>
              </a>
              <a href={`mailto:${SCHOOL.emails[1]}`} className="flex items-start gap-4 group" data-testid="contact-email-2">
                <Mail className="w-5 h-5 mt-1 text-[#E8754B]" />
                <div>
                  <div className="kicker">Rupali Sen Mukherjee · Email</div>
                  <div className="font-serif text-xl md:text-2xl group-hover:text-[#E8754B] transition-colors break-all">{SCHOOL.emails[1]}</div>
                </div>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-[#100A10] border border-[#3A2A26] rounded-2xl p-7 md:p-10"
            data-testid="demo-booking-form"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="kicker">Your Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  required
                  className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] placeholder:text-[#9C8B7A] focus-visible:ring-[#E8754B]"
                  data-testid="form-name"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="kicker">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  required
                  className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] placeholder:text-[#9C8B7A]"
                  data-testid="form-phone"
                />
              </div>
              <div>
                <Label htmlFor="email" className="kicker">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] placeholder:text-[#9C8B7A]"
                  data-testid="form-email"
                />
              </div>
              <div>
                <Label htmlFor="age" className="kicker">Student Age</Label>
                <Input
                  id="age"
                  value={form.age}
                  onChange={update("age")}
                  placeholder="e.g. 12, 35, 65"
                  className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] placeholder:text-[#9C8B7A]"
                  data-testid="form-age"
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="kicker">Course Interested In</Label>
                <Select value={form.course} onValueChange={update("course")}>
                  <SelectTrigger className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] h-11" data-testid="form-course">
                    <SelectValue placeholder="Select a discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c.id} value={c.name} data-testid={`form-course-${c.id}`}>
                        {c.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Not sure yet" data-testid="form-course-unsure">Not sure yet — please advise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Label className="kicker">Preferred Mode</Label>
                <RadioGroup value={form.mode} onValueChange={update("mode")} className="mt-3 flex gap-6" data-testid="form-mode">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="online" id="mode-online" />
                    <span className="font-serif text-lg">Online</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="offline" id="mode-offline" />
                    <span className="font-serif text-lg">Offline (Bangalore)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="either" id="mode-either" />
                    <span className="font-serif text-lg">Either</span>
                  </label>
                </RadioGroup>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="message" className="kicker">Anything you&apos;d like us to know?</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] placeholder:text-[#9C8B7A]"
                  data-testid="form-message"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-saffron mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
              data-testid="form-submit"
            >
              {loading ? "Sending…" : "Send & Continue on WhatsApp"}
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="mt-3 text-xs text-[#9C8B7A]">By submitting you agree to be contacted about your demo class.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
