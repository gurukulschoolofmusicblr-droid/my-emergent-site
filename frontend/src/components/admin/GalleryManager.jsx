import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Trash2, Upload, ImageIcon } from "lucide-react";

const YEARS = ["2026", "2025", "2024"];
const CATEGORIES = ["Performance", "Solo & Duet", "Group Choir", "Trophy", "Hosts", "Inauguration", "Grand Finale", "Parents"];

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("2026");
  const [category, setCategory] = useState("Performance");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/gallery");
      setItems(data);
    } catch {
      toast.error("Could not load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) { toast.error("Please choose an image"); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("year", year);
      fd.append("category", category);
      fd.append("caption", caption);
      fd.append("order", 0);
      fd.append("file", file);
      await api.post("/admin/gallery", fd);
      toast.success("Image uploaded");
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
      refresh();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await api.delete(`/admin/gallery/${id}`);
      setItems((arr) => arr.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const grouped = YEARS.reduce((acc, y) => {
    acc[y] = items.filter((i) => i.year === y);
    return acc;
  }, {});

  return (
    <div className="space-y-10" data-testid="gallery-manager">
      {/* Uploader */}
      <form onSubmit={handleUpload} className="surface p-6 md:p-8" data-testid="gallery-upload-form">
        <div className="flex items-center gap-3 mb-5">
          <Upload className="w-5 h-5 text-[#E8754B]" />
          <h3 className="font-display text-2xl text-[#F5E9D9]">Upload new photo</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label className="kicker">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]" data-testid="gallery-year-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="kicker">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]" data-testid="gallery-category-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-2">
            <Label className="kicker">Caption</Label>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="A short caption (optional)"
              className="mt-2 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]"
              data-testid="gallery-caption-input"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            required
            className="text-sm text-[#D4C2A8] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2A1E1B] file:text-[#E1B168] hover:file:bg-[#3A2A26]"
            data-testid="gallery-file-input"
          />
          <button type="submit" disabled={uploading} className="btn-saffron disabled:opacity-60" data-testid="gallery-upload-btn">
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>
        <p className="mt-3 text-xs text-[#9C8B7A]">Max 6 MB. JPEG/PNG/WebP supported.</p>
      </form>

      {/* Gallery grouped by year */}
      {loading ? (
        <p className="text-[#9C8B7A]">Loading gallery…</p>
      ) : (
        YEARS.map((y) => (
          <section key={y} data-testid={`gallery-section-${y}`}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-3xl text-[#F5E9D9]">
                Annual Day <span className="italic text-[#E1B168]">{y}</span>
              </h3>
              <span className="text-xs text-[#9C8B7A]">{grouped[y].length} photo{grouped[y].length === 1 ? "" : "s"}</span>
            </div>
            {grouped[y].length === 0 ? (
              <div className="surface p-6 flex items-center gap-3 text-[#9C8B7A]">
                <ImageIcon className="w-4 h-4" /> No photos yet. Use the form above to upload.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {grouped[y].map((it) => (
                  <figure key={it.id} className="surface overflow-hidden group relative" data-testid={`gallery-item-${it.id}`}>
                    <img src={it.image_data} alt={it.caption || it.category} className="w-full aspect-square object-cover" />
                    <figcaption className="p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#E1B168]">{it.category}</div>
                      <div className="font-serif text-sm text-[#D4C2A8] mt-1 line-clamp-2">{it.caption || "—"}</div>
                    </figcaption>
                    <button
                      onClick={() => handleDelete(it.id)}
                      className="absolute top-2 right-2 bg-[#07050A]/85 border border-[#3A2A26] text-[#E8754B] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`gallery-delete-${it.id}`}
                      aria-label="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))
      )}
    </div>
  );
}
