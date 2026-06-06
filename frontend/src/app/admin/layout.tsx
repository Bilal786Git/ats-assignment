"use client";

import { useRouter } from "next/navigation";
import { AdminSidebar } from "@ats/components/layout/AdminSidebar/AdminSidebar";
import { useAuthStore } from "@ats/store/authStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    router.replace("/auth/login");
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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

  return (
    <div>
      <AdminSidebar />
      <main
        style={{ marginLeft: 240, padding: "24px 32px", minHeight: "100vh" }}
      >
        {children}
      </main>
    </div>
  );
}
