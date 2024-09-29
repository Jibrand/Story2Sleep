import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jibran'APIs",
  description: "Discover a world of enchanting bedtime stories with Story2Sleep. Listen to audio stories from various categories designed to help you and your children relax and fall asleep peacefully.",
  keywords: "bedtime stories, audio stories, children's stories, sleep stories, relaxing stories, bedtime audio, sleep aid, storytelling, night time stories, story2sleep",
  author: "Story2Sleep Team",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
