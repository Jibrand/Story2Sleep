import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Story2Sleep - Audio Bedtime Stories for All Ages",
  description: "Discover a world of enchanting bedtime stories with Story2Sleep. Listen to audio stories from various categories designed to help you and your children relax and fall asleep peacefully.",
  keywords: "bedtime stories, audio stories, children's stories, sleep stories, relaxing stories, bedtime audio, sleep aid, storytelling, night time stories, story2sleep",
  author: "Story2Sleep Team",
  openGraph: {
    type: "website",
    url: "https://story2sleep.vercel.app/",
    title: "Story2Sleep - Audio Bedtime Stories for All Ages",
    description: "Discover a world of enchanting bedtime stories with Story2Sleep. Listen to audio stories from various categories designed to help you and your children relax and fall asleep peacefully.",
    images: [
      {
        url: "https://story2sleep.vercel.app/",
        width: 800,
        height: 600,
        alt: "Story2Sleep - Bedtime Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://story2sleep.vercel.app/",
    title: "Story2Sleep - Audio Bedtime Stories for All Ages",
    description: "Discover a world of enchanting bedtime stories with Story2Sleep. Listen to audio stories from various categories designed to help you and your children relax and fall asleep peacefully.",
    image: "https://story2sleep.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1.0",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
