import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogOut, Image as ImageIcon, MessageSquareQuote, ClipboardList, ExternalLink } from "lucide-react";
import { SCHOOL } from "@/data/content";
import GalleryManager from "@/components/admin/GalleryManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import BookingsList from "@/components/admin/BookingsList";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("gallery");

  return (
    <main className="min-h-screen bg-[#07050A] text-[#F5E9D9]" data-testid="admin-dashboard">
      <header className="sticky top-0 z-30 bg-[#07050A]/90 backdrop-blur-md border-b border-[#3A2A26]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={SCHOOL.logo} alt="Gurukul" className="h-10 w-10 object-contain rounded-full ring-1 ring-[#E1B168]/40" />
            <div>
              <div className="font-grand text-lg text-tilak leading-none">GURUKUL · ADMIN</div>
              <div className="text-[11px] text-[#9C8B7A] mt-1">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" className="btn-ghost text-sm" data-testid="admin-view-site">
              View Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button onClick={logout} className="btn-ghost text-sm" data-testid="admin-logout">
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <h1 className="font-display text-5xl md:text-6xl text-[#F5E9D9]">
          Manage <span className="italic text-[#E1B168]">your school.</span>
        </h1>
        <p className="mt-3 text-[#9C8B7A]">Upload photos, add testimonials and review demo bookings.</p>

        <Tabs value={tab} onValueChange={setTab} className="mt-10">
          <TabsList className="bg-transparent gap-2 p-0 mb-8 flex flex-wrap">
            <TabsTrigger value="gallery" data-testid="admin-tab-gallery" className="tab-pill rounded-full border border-[#3A2A26] bg-[#100A10] text-[#D4C2A8] px-5 py-2 text-sm">
              <ImageIcon className="w-4 h-4 mr-2 inline" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="admin-tab-testimonials" className="tab-pill rounded-full border border-[#3A2A26] bg-[#100A10] text-[#D4C2A8] px-5 py-2 text-sm">
              <MessageSquareQuote className="w-4 h-4 mr-2 inline" /> Testimonials
            </TabsTrigger>
            <TabsTrigger value="bookings" data-testid="admin-tab-bookings" className="tab-pill rounded-full border border-[#3A2A26] bg-[#100A10] text-[#D4C2A8] px-5 py-2 text-sm">
              <ClipboardList className="w-4 h-4 mr-2 inline" /> Demo Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery"><GalleryManager /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsManager /></TabsContent>
          <TabsContent value="bookings"><BookingsList /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
