import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import NavBar from "@/components/NavBar";
import Footer from "@/components/landing/Footer";
import MobileNav from "@/components/common/MobileNav";
import MobileNavContextProvider from "@/context/MobileNavContextProvider";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const siteUrl = "https://1beatclub.in";
const socialPreviewImage = `${siteUrl}/1beatclub-social-preview.png`;

export const metadata: Metadata = {
  title: {
    default: "1BeatClub — Let the Crowd Pick the Soundtrack",
    template: "%s | 1BeatClub",
  },
  applicationName: "1BeatClub",
  description:
    "Create music clubs, add songs, vote for the next track, and enjoy together — whether at a gym, party, wedding, or home gathering. 1Beatclub makes shared music experiences effortless and fun.",
  keywords: [
    "1Beatclub",
    "music club app",
    "shared playlists",
    "party music app",
    "group music voting",
    "real-time music experience",
    "social music platform",
    "club playlist",
    "music",
    "party"
  ],
  authors: [{ name: "1BeatClub" }],
  creator: "1BeatClub",
  publisher: "1BeatClub",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "1BeatClub — Let the Crowd Pick the Soundtrack",
    description:
      "Host the vibe. Vote for songs. Enjoy music together. 1Beatclub lets friends create shared playlists for any occasion — parties, gyms, or casual hangouts.",
    url: siteUrl,
    siteName: "1BeatClub",
    images: [
      {
        url: socialPreviewImage,
        width: 1731,
        height: 909,
        alt: "1BeatClub — collaborative music voting for every gathering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1BeatClub — Let the Crowd Pick the Soundtrack",
    description:
      "Create a club, add songs, and let everyone vote on what plays next. 1Beatclub turns any gathering into a shared music experience.",
    images: [socialPreviewImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "1BeatClub",
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "A collaborative music app where groups add songs and vote for what plays next.",
  image: socialPreviewImage,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ theme: dark, cssLayerName: "clerk" }}>
      <html lang="en" className="light">
        <body className={`${inter.className}  antialiased`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <main className=" bg-background relative">
            <MobileNavContextProvider>

            <NavBar />
             <MobileNav />
            {children}
            </MobileNavContextProvider>
            <Footer />
          </main>
                  <GoogleAnalytics gaId="G-GL9GTQX9YY" />
                       <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
