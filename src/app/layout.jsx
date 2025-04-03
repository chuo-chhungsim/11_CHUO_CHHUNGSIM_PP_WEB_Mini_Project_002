import "./globals.css";
import { Outfit, Geist_Mono } from "next/font/google";

const OutfitSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Planlt",
  description:
    "A to-do list app helps you organize and manage your tasks. It allows you to create lists, add items, set deadlines, and track your progress, ensuring you stay productive and on top of your responsibilities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${OutfitSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
