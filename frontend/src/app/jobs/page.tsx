"use client";

import { useEffect, useState } from "react";
import { PublicHeader } from "@ats/components/layout/PublicHeader/PublicHeader";
import { JobCard } from "@ats/components/jobs/JobCard/JobCard";
import { Select } from "@ats/components/ui/Select/Select";
import { CardSkeleton } from "@ats/components/ui/Skeleton/CardSkeleton";
import { JobTypes } from "@ats/constants/jobs-meta";
import { Input } from "@ats/components/ui/Input/Input";
import { useDebounceValue } from "@ats/hooks/useDebounce";
import { useApi } from "@ats/hooks/useApi";
import type { Job } from "@ats/types";
import styles from "./page.module.less";

export default function PublicJobsPage() {
  const { request, loading } = useApi<Job[]>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const debouncedSearch = useDebounceValue(search, 500);

  useEffect(() => {
    request(
      "GET",
      `/jobs?status=live&${debouncedSearch ? `search=${debouncedSearch}` : ""}&${typeFilter ? `type=${typeFilter}` : ""}`,
    )
      .then(setJobs)
      .catch((error) => {
        console.log("ERROR", error);
      });
  }, [request, debouncedSearch, typeFilter]);

  const filtered = jobs.filter((job) => {
    const q = debouncedSearch.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q);
    const matchesType = !typeFilter || job.jobType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className={styles.jobsPage}>
      <PublicHeader />

      <div className={styles.titleSection}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
            Find Your Next Role
          </h1>
          <p style={{ fontSize: 16, color: "#bfdbfe", maxWidth: 500 }}>
            Browse open positions and apply directly. No account needed.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          marginTop: -24,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            border: "1px solid #e5e7eb",
            padding: 16,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
            <Input
              prefix={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    color: "#9ca3af",
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
              type="text"
              placeholder="Search jobs, location, keywords..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: "100%",
                height: 40,
                paddingLeft: 36,
                paddingRight: 12,
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <Select
            options={[
              { value: "", label: "All Types" },
              { value: JobTypes.full_time, label: "Full-time" },
              { value: JobTypes.part_time, label: "Part-time" },
              { value: JobTypes.internship, label: "Internship" },
            ]}
            size="large"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value)}
            style={{ width: 160 }}
          />
        </div>
      </div>

      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 64px" }}
      >
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 24,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 64 }}>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              No jobs found
            </h3>
            <p style={{ color: "#6b7280" }}>
              {search || typeFilter
                ? "Try adjusting your search or filters"
                : "No open positions right now."}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
