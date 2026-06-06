import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@ats/components/ui/Toast/Toast";

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
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
