import ClickSpark from "@/components/ClickSpark";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { type Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Header />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "black",
            color: "#00ff00",
            border: "1px solid #00ff00",
          },
          className: "class",
        }}
      />
      <Footer />
    </ClickSpark>
  );
}
