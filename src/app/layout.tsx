import { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google"; // Inter ~ Geist Sans, Fira Code ~ Geist Mono
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BusLink App",
  description: "Affordable, reliable bus travel across South Africa",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4`}
      >
        <div className="w-full max-w-md">{children}</div>
      </body>
    </html>
  );
}
