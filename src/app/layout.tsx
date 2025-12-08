import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BYOC - Buy Your Own Clothes",
  description: "High-end techwear and editorial fashion. Identity unknown.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        {children}
        <Toaster
          theme="dark"
          className="toaster group"
          toastOptions={{
            classNames: {
              toast: "group toast bg-black border-neon/30 text-white",
              description: "text-white/70",
              actionButton: "bg-neon text-black",
              cancelButton: "bg-white/10 text-white",
              error: "border-red-500/50 text-red-500",
              success: "border-neon text-neon",
              warning: "border-yellow-500/50 text-yellow-500",
              info: "border-blue-500/50 text-blue-500",
            },
          }}
        />
      </body>
    </html>
  );
}
