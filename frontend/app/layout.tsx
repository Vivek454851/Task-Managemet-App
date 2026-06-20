import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { SnackbarProvider } from "@/components/SnackbarProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TaskFlow — Modern Task Management",
  description:
    "A modern, production-ready task management application. Create, organize, track, and manage your tasks with a beautiful SaaS dashboard interface.",
  keywords: ["task management", "project management", "todo", "dashboard", "productivity"],
  authors: [{ name: "TaskFlow" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <ThemeRegistry>
          <SnackbarProvider>
            <div className="page-background">
              <div className="page-content">{children}</div>
            </div>
          </SnackbarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
