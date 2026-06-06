import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATS - Applicant Tracking System",
  description: "Modern Applicant Tracking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
