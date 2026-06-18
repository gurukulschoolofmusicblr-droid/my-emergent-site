import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { RefreshCcw, Phone, Mail, MessageCircle, Calendar, User } from "lucide-react";

const STATUSES = ["new", "contacted", "scheduled", "closed"];

export default function BookingsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/demo-bookings");
      setItems(data);
    } catch {
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/demo-bookings/${id}/status?status=${status}`);
      setItems((arr) => arr.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch {
      toast.error("Could not update status");
    }
  };

  return (
    <div className="space-y-6" data-testid="bookings-list">
      <div className="flex justify-between items-center">
        <p className="text-[#9C8B7A] text-sm">{items.length} booking{items.length === 1 ? "" : "s"} so far.</p>
        <button onClick={refresh} className="btn-ghost text-sm" data-testid="bookings-refresh">
          <RefreshCcw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-[#9C8B7A]">Loading…</p>
      ) : items.length === 0 ? (
        <div className="surface p-6 text-[#9C8B7A]">No bookings yet.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((b) => {
            const created = b.created_at ? new Date(b.created_at) : null;
            return (
              <li key={b.id} className="surface p-5" data-testid={`booking-${b.id}`}>
                <div className="grid md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-2 text-[#F5E9D9]">
                      <User className="w-4 h-4 text-[#E1B168]" />
                      <span className="font-serif text-xl">{b.name}</span>
                    </div>
                    <div className="mt-2 text-sm text-[#D4C2A8] space-y-1">
                      <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-[#E8754B]">
                        <Phone className="w-3.5 h-3.5" /> {b.phone}
                      </a>
                      <a href={`https://wa.me/91${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E8754B]">
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      {b.email && (
                        <a href={`mailto:${b.email}`} className="flex items-center gap-2 hover:text-[#E8754B] break-all">
                          <Mail className="w-3.5 h-3.5" /> {b.email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-5 text-sm text-[#D4C2A8] space-y-1">
                    {b.course && <div><span className="kicker mr-2">Course</span>{b.course}</div>}
                    {b.age && <div><span className="kicker mr-2">Age</span>{b.age}</div>}
                    {b.mode && <div><span className="kicker mr-2">Mode</span>{b.mode}</div>}
                    {b.message && <div className="pt-2 italic font-serif text-[#9C8B7A]">&ldquo;{b.message}&rdquo;</div>}
                  </div>

                  <div className="md:col-span-3 space-y-3">
                    {created && (
                      <div className="flex items-center gap-2 text-xs text-[#9C8B7A]">
                        <Calendar className="w-3 h-3" />
                        {created.toLocaleString()}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2" data-testid={`booking-status-${b.id}`}>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(b.id, s)}
                          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] transition-colors ${
                            (b.status || "new") === s
                              ? "bg-[#E1B168] text-[#07050A] border border-[#E1B168]"
                              : "border border-[#3A2A26] text-[#D4C2A8] hover:bg-[#2A1E1B]"
                          }`}
                          data-testid={`booking-${b.id}-status-${s}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
