import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeekendWatch V1",
  description: "Monochrome e-ink smartwatch web app with admin console",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
