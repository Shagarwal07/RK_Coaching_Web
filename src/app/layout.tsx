import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070B16",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "RK Coaching Classes Balotra | Best CBSE & RBSE Coaching in Balotra (Class 1st–10th)",
  description: "Balotra's premier coaching institute for CBSE & RBSE (Class 1st to 10th). Specializing in Mathematics & Science with 15+ years legacy of 90%+ board toppers. Located near Vardhman School, 65 Agrawal Colony, Balotra, Rajasthan.",
  keywords: [
    "Coaching in Balotra",
    "Best Coaching in Balotra",
    "RK Coaching Balotra",
    "R.K Coaching Classes",
    "CBSE Coaching Balotra",
    "RBSE Coaching Balotra",
    "Maths Science Coaching Balotra",
    "Class 10 Board Toppers Balotra",
    "Class 9 Coaching Balotra",
    "Class 8 Coaching Balotra",
    "Class 1st to 10th Coaching Balotra",
    "Coaching Near Vardhman School Balotra",
    "Rakesh Sir Balotra",
    "Rekha Ma'am Balotra",
    "Tuition in Balotra Rajasthan",
    "Agrawal Colony Balotra Coaching"
  ],
  authors: [{ name: "R.K Coaching Classes Balotra" }],
  creator: "R.K Coaching Classes",
  publisher: "R.K Coaching Classes",
  applicationName: "R.K Coaching Classes",
  category: "Education",
  classification: "Coaching Institute / Education",
  metadataBase: new URL("https://rkcoachingrajasthan.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "RK Coaching Classes Balotra — Premier CBSE & RBSE Coaching",
    description: "Balotra's highest-rated coaching classes for Class 1st to 10th. Concept-first teaching in Mathematics and Science, small batches, and 15+ years of 90%+ board results.",
    url: "https://rkcoachingrajasthan.in",
    siteName: "R.K Coaching Classes Balotra",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "R.K Coaching Classes Balotra Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Coaching Classes Balotra | Top CBSE & RBSE Results",
    description: "Concept-first classroom tutoring for Class 1st to 10th in Balotra, Rajasthan. 15+ years legacy.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  manifest: "/manifest.json",
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Balotra, Rajasthan",
    "geo.position": "25.827254;72.2363681",
    "ICBM": "25.827254, 72.2363681",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://rkcoachingrajasthan.in/#organization",
  "name": "R.K Coaching Classes Balotra",
  "alternateName": ["RK Coaching Classes", "RK Coaching Balotra", "RK Tuition Balotra"],
  "url": "https://rkcoachingrajasthan.in",
  "logo": "https://rkcoachingrajasthan.in/images/logo.png",
  "image": "https://rkcoachingrajasthan.in/images/logo.png",
  "description": "Leading coaching institute in Balotra, Rajasthan specializing in Class 1st to 10th CBSE and RBSE curriculum with special emphasis on Mathematics, Science, and board exam preparation.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "65, Agrawal Colony, Near Vardhman School",
    "addressLocality": "Balotra",
    "addressRegion": "Rajasthan",
    "postalCode": "344022",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.827254,
    "longitude": 72.2363681
  },
  "areaServed": [
    { "@type": "City", "name": "Balotra" },
    { "@type": "AdministrativeArea", "name": "Rajasthan" }
  ],
  "hasMap": "https://www.google.com/maps/dir//R.K+Coaching+Classes,+65,+Agarwal+Colony,+Balotra,+Rajasthan+344022/@25.8303025,72.2394526,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3943ef868378e527:0xe9b7faff3fd1c369!2m2!1d72.2363681!2d25.827254",
  "telephone": "+91-9414668795",
  "email": "rk.coachings20@gmail.com",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI",
  "priceRange": "₹₹",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9414668795",
    "contactType": "admissions",
    "areaServed": "IN",
    "availableLanguage": ["Hindi", "English"]
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "19:30"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "120",
    "bestRating": "5"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#070B16] text-white selection:bg-indigo-600 selection:text-white transition-colors duration-300">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
