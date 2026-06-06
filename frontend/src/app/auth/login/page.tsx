"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { useAuthStore } from "@ats/store/authStore";
import { useApi } from "@ats/hooks/useApi";
import { toast } from "@ats/components/ui/Toast/Toast";
import type { AuthResponse, LoginPayload } from "@ats/types";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuthStore();
  const { request, loading } = useApi<AuthResponse>();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) {
    router.replace("/admin/dashboard");
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "3px solid #e5e7eb",
            borderTopColor: "#2563eb",
            animation: "spin 0.6s linear infinite",
          }}
        />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await request("POST", "/auth/login", {
        email,
        password,
      } as LoginPayload);
      setAuth(data.accessToken, data.user);
      toast("success", "Logged in successfully");
      router.push("/admin/dashboard");
    } catch {
      toast("error", "Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
        padding: "0 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "#2563eb",
              borderRadius: 16,
              marginBottom: 16,
              color: "white",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
            ATS Admin
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            borderRadius: 16,
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            border: "1px solid #f3f4f6",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Input
            label="Email"
            type="email"
            placeholder="admin@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: 34,
                border: "none",
                background: "transparent",
                color: "#9ca3af",
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>

          <Button type="submit" loading={loading} fullWidth size="lg">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
