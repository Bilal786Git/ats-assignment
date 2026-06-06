"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@ats/components/ui/Skeleton/Skeleton";
import { Button } from "@ats/components/ui/Button/Button";
import { useApi } from "@ats/hooks/useApi";
import type { Job } from "@ats/types";

const IconBriefcase = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const IconCheckCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClock = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconXCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const statCards = [
  {
    label: "Total Jobs",
    icon: IconBriefcase,
    color: "#eff6ff",
    iconColor: "#2563eb",
    key: "total" as const,
  },
  {
    label: "Live Jobs",
    icon: IconCheckCircle,
    color: "#f0fdf4",
    iconColor: "#16a34a",
    key: "live" as const,
  },
  {
    label: "Pending",
    icon: IconClock,
    color: "#fefce8",
    iconColor: "#d97706",
    key: "pending" as const,
  },
  {
    label: "Closed",
    icon: IconXCircle,
    color: "#fef2f2",
    iconColor: "#dc2626",
    key: "closed" as const,
  },
];

export default function DashboardPage() {
  const { request, loading } = useApi<Job[]>();
  const [stats, setStats] = useState({
    total: 0,
    live: 0,
    pending: 0,
    closed: 0,
  });

  useEffect(() => {
    request("GET", "/jobs")
      .then((data) => {
        setStats({
          total: data.length,
          live: data.filter((j) => j.status.toUpperCase() === "LIVE").length,
          pending: data.filter((j) => j.status.toUpperCase() === "PENDING")
            .length,
          closed: data.filter((j) => j.status.toUpperCase() === "CLOSED")
            .length,
        });
      })
      .catch(() => {});
  }, [request]);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Overview of your job listings
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.key}
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              padding: 20,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.iconColor,
                marginBottom: 12,
              }}
            >
              <card.icon />
            </div>
            {loading ? (
              <Skeleton height={28} width={60} />
            ) : (
              <p style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
                {stats[card.key]}
              </p>
            )}
            <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          padding: 24,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#111827",
            marginBottom: 8,
          }}
        >
          Quick Actions
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
          Manage your job postings from the Jobs section.
        </p>
        <a href="/admin/jobs/create">
          <Button>Create New Job</Button>
        </a>
      </div>
    </div>
  );
}
