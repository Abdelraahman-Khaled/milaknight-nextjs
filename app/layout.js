import { Tajawal, Fustat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";
import Providers from "./components/Providers";
import Script from "next/script";

import DynamicSEO from "./components/DynamicSEO";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import LegacyScripts from "./components/LegacyScripts";
import Navbar from "./components/Navbar";
import Footer from "./components/ui/Footer";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://www.mila-knight.com"),
  alternates: {
    canonical: "./",
    languages: {
      ar: "./",
      en: "./",
      "x-default": "./",
    },
  },
  title: "Milaknight | حلول تسويق رقمي واستراتيجيات نمو متكاملة",
  description:
    "وكالة تسويق رقمي خدمات تحسين محركات البحث تسويق عبر السوشيال ميديا إدارة حملات إعلانية تصميم مواقع الكترونية تحسين ظهور المواقع تسويق محتوى احترافي تحليل بيانات السوق حلول تسويقية ذكية",
  keywords:
    "تصميم و برمجة المواقع, تخطيط و تنفيذ الفعاليات, إنتاج الفيديوهات, التجارة الإلكترونية, التصميم الجرافيكي, التسويق الرقمي",
  authors: [{ name: "Milaknight LLC-FZ" }],
  icons: {
    icon: "/images/icons/favicon.ico",
    shortcut: "/images/icons/favicon.ico",
  },
  manifest: "/manifest-ar.json",
  verification: {
    google: "sqr_XrhbIC_Q9Y0ZnpTsc6JrOkYMoCBmdASKMLNz7aA",
  },
  openGraph: {
    locale: "KSA",
    siteName: "Milaknight",
    type: "website",
    title: "Milaknight | حلول تسويق رقمي واستراتيجيات نمو متكاملة",
    description:
      "وكالة تسويق رقمي خدمات تحسين محركات البحث تسويق عبر السوشيال ميديا إدارة حملات إعلانية تصميم مواقع الكترونية تحسين ظهور المواقع تسويق محتوى احترافي تحليل بيانات السوق حلول تسويقية ذكية",
    url: "https://www.mila-knight.com/",
    images: [
      {
        url: "https://www.mila-knight.com/images/logo-dark-footer.webp",
        width: 1200,
        height: 630,
        alt: "شعار Mila Knight لتسويق رقمي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milaknight | حلول تسويق رقمي واستراتيجيات نمو متكاملة",
    description:
      "وكالة تسويق رقمي خدمات تحسين محركات البحث تسويق عبر السوشيال ميديا إدارة حملات إعلانية تصميم مواقع الكترونية تحسين ظهور المواقع تسويق محتوى احترافي تحليل بيانات السوق حلول تسويقية ذكية",
    images: ["https://www.mila-knight.com/images/logo-dark-footer.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.mila-knight.com/#business",
      name: "MilaKnight LLC-FZ",
      url: "https://www.mila-knight.com/",
      logo: "https://www.mila-knight.com/images/logo.svg",
      image: "https://www.mila-knight.com/images/logo.svg",
      description:
        "وكالة تسويق رقمي متخصصة في السيو والتسويق الإلكتروني وبناء العلامات التجارية وتطوير الحلول الرقمية.",
      telephone: "+971585856774",
      priceRange: "$$",
      areaServed: "AE",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "الطابق السادس، مركز الأعمال، المدرج الكبير بفندق ميدان، شارع ميدان",
        addressLocality: "دبي",
        addressCountry: "AE",
      },
      sameAs: [
        "https://www.linkedin.com/company/milaknight/",
        "https://www.instagram.com/milaknight.mena/",
        "https://x.com/milaknight731",
        "https://www.snapchat.com/add/milaknight.mk",
        "https://www.facebook.com/milaknight.mena",
        "https://www.tiktok.com/@milaknight.mk",
        "https://www.youtube.com/channel/UCAYtPE9bp6ygjmJPmhA3GiA",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mila-knight.com/#website",
      url: "https://www.mila-knight.com/",
      name: "MilaKnight",
      publisher: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.mila-knight.com/#home",
      url: "https://www.mila-knight.com/",
      name: "الصفحة الرئيسية",
      isPartOf: {
        "@id": "https://www.mila-knight.com/#website",
      },
      about: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.mila-knight.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://www.mila-knight.com/",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.mila-knight.com/service/digital-marketing",
      name: "التسويق الإلكتروني",
      url: "https://www.mila-knight.com/service/digital-marketing",
      provider: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.mila-knight.com/service/web-development",
      name: "تصميم وبرمجة المواقع",
      url: "https://www.mila-knight.com/service/web-development",
      provider: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.mila-knight.com/service/graphic-design",
      name: "التصميم الجرافيكي",
      url: "https://www.mila-knight.com/service/graphic-design",
      provider: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.mila-knight.com/service/e-commerce",
      name: "التجارة الإلكترونية",
      url: "https://www.mila-knight.com/service/e-commerce",
      provider: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.mila-knight.com/service/video-production",
      name: "إنتاج الفيديو",
      url: "https://www.mila-knight.com/service/video-production",
      provider: {
        "@id": "https://www.mila-knight.com/#business",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NSPXXGG5');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSPXXGG5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <DynamicSEO />
          <Preloader />
          <Cursor />
          <BootstrapClient />
          <Navbar />
          {children}
          <Footer />
          <LegacyScripts />
        </Providers>
      </body>
    </html>
  );
}
