import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViajeXMundo - Dashboard de Leads",
  description: "Dashboard de análisis y KPIs para leads de ViajeXMundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
