import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Save, Pencil, X } from "lucide-react";

const empty = { quote: "", author: "", role: "", order: 0 };

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/testimonials");
      setItems(data);
    } catch {
      toast.error("Could not load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const upd = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.quote.trim() || !form.author.trim()) {
      toast.error("Quote and author are required");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        quote: form.quote.trim(),
        author: form.author.trim(),
        role: form.role.trim() || "",
        order: Number(form.order) || 0,
      };
      if (editingId) {
        await api.put(`/admin/testimonials/${editingId}`, payload);
        toast.success("Updated");
      } else {
        await api.post("/admin/testimonials", payload);
        toast.success("Added");
      }
      setForm(empty);
      setEditingId(null);
      refresh();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (it) => {
    setEditingId(it.id);
    setForm({ quote: it.quote, author: it.author, role: it.role || "", order: it.order || 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      setItems((arr) => arr.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-10" data-testid="testimonials-manager">
      <form onSubmit={submit} className="surface p-6 md:p-8" data-testid="testimonial-form">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-2xl text-[#F5E9D9]">
            {editingId ? "Edit testimonial" : "Add a testimonial"}
          </h3>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="text-sm text-[#9C8B7A] hover:text-[#E8754B]" data-testid="testimonial-cancel-edit">
              <X className="inline w-4 h-4" /> Cancel
            </button>
          )}
        </div>
        <div className="grid gap-4">
          <div>
            <Label className="kicker">Quote *</Label>
            <Textarea
              required
              rows={4}
              value={form.quote}
              onChange={upd("quote")}
              className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]"
              data-testid="testimonial-quote-input"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label className="kicker">Author *</Label>
              <Input required value={form.author} onChange={upd("author")} className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]" data-testid="testimonial-author-input" />
            </div>
            <div>
              <Label className="kicker">Role</Label>
              <Input value={form.role} onChange={upd("role")} placeholder="Parent / Student" className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]" data-testid="testimonial-role-input" />
            </div>
            <div>
              <Label className="kicker">Display Order</Label>
              <Input type="number" value={form.order} onChange={upd("order")} className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]" data-testid="testimonial-order-input" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn-saffron mt-6 disabled:opacity-60" data-testid="testimonial-submit-btn">
          {editingId ? (<><Save className="w-4 h-4" /> Save changes</>) : (<><Plus className="w-4 h-4" /> Add testimonial</>)}
        </button>
      </form>

      {loading ? (
        <p className="text-[#9C8B7A]">Loading testimonials…</p>
      ) : items.length === 0 ? (
        <div className="surface p-6 text-[#9C8B7A]">No testimonials yet. Add your first one above.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="surface p-5 flex items-start gap-4" data-testid={`testimonial-${it.id}`}>
              <div className="flex-1">
                <p className="font-serif italic text-lg text-[#F5E9D9]">&ldquo;{it.quote}&rdquo;</p>
                <p className="mt-2 text-sm text-[#E1B168]">
                  {it.author} <span className="text-[#9C8B7A]">· {it.role || "—"}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => startEdit(it)} className="p-2 border border-[#3A2A26] rounded-full text-[#E1B168] hover:bg-[#2A1E1B]" data-testid={`testimonial-edit-${it.id}`} aria-label="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(it.id)} className="p-2 border border-[#3A2A26] rounded-full text-[#E8754B] hover:bg-[#2A1E1B]" data-testid={`testimonial-delete-${it.id}`} aria-label="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
