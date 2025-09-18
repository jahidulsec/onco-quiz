import type { Metadata } from "next";
import "./globals.css";
import ProgressProvider from "@/providers/progress-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Onco Mastermind",
  description: "Onco mastermind quiz challenge",
};

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-spacegrotesk`}>
        <ProgressProvider>
          {children}
          <Toaster closeButton richColors position="top-right" />
        </ProgressProvider>
      </body>
    </html>
  );
}
