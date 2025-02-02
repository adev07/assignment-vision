"use client";

import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {isLoginPage ? (
            <>{children}</>
          ) : (
            <AdminPanelLayout>{children}</AdminPanelLayout>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
