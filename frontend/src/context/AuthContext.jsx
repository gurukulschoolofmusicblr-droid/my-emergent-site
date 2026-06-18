import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = checking, null = anon, object = signed in
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("gurukul_token");
    if (!token) {
      setUser(null);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("gurukul_token", data.token);
      localStorage.setItem("gurukul_user", JSON.stringify(data.user));
      setUser(data.user);
      return { ok: true };
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const message = typeof detail === "string" ? detail : "Login failed. Please try again.";
      return { ok: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("gurukul_token");
    localStorage.removeItem("gurukul_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
