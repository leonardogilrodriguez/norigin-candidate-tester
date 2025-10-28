import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CHANNELS_WIDTH, PIXELS_PER_MINUTE } from "@/src/utils/constants";
import HeaderComponent from "@/src/components/HeaderComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Norigin Media Candidate Test",
  description: "This is intended to used as instructions for completing the Norigin Media testing task for new candidates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --pixels-per-minute: ${PIXELS_PER_MINUTE};
                --channels-width: ${CHANNELS_WIDTH}px;
              }
            `,
          }}
        />
        <header>
          <HeaderComponent />
        </header>
        {children}
      </body>
    </html>
  );
}
