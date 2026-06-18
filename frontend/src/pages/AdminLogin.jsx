import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { SCHOOL } from "@/data/content";

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const result = await login(email.trim(), password);
    setBusy(false);
    if (result.ok) {
      toast.success("Welcome back");
      navigate("/admin");
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#07050A] text-[#F5E9D9] flex items-center justify-center px-6">
      <div className="absolute inset-0 pattern-rangoli opacity-80 pointer-events-none" />
      <div className="glow-warm w-[600px] h-[600px] -top-40 -right-40" />
      <div className="glow-warm w-[400px] h-[400px] bottom-[-100px] left-[-50px]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 justify-center mb-10" data-testid="admin-login-home-link">
          <img src={SCHOOL.logo} alt="Gurukul" className="h-12 w-12 object-contain rounded-full ring-1 ring-[#E1B168]/40" />
          <div className="text-center">
            <div className="font-grand text-2xl text-tilak">GURUKUL</div>
            <div className="kicker text-[10px]">School of Music · Admin</div>
          </div>
        </Link>

        <div className="surface p-8 md:p-10">
          <h1 className="font-display text-4xl md:text-5xl text-[#F5E9D9] leading-[0.95]">
            Admin
            <span className="italic text-[#E1B168]"> sign in.</span>
          </h1>
          <p className="mt-2 text-sm text-[#9C8B7A]">Manage gallery, testimonials & bookings.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" data-testid="admin-login-form">
            <div>
              <Label htmlFor="email" className="kicker">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C8B7A]" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9] placeholder:text-[#9C8B7A]"
                  data-testid="admin-login-email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="kicker">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C8B7A]" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#2A1E1B] border-[#3A2A26] text-[#F5E9D9]"
                  data-testid="admin-login-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy || loading}
              className="btn-saffron w-full justify-center disabled:opacity-60"
              data-testid="admin-login-submit"
            >
              {busy ? "Signing in…" : "Sign In"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-[#9C8B7A] hover:text-[#E8754B] transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </main>
  );
}
