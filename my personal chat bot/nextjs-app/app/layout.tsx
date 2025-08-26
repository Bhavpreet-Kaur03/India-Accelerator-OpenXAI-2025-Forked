import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css"; // Make sure Tailwind is imported

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
