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
  title: "Milaknight | حلول تسويق رقمي واستراتيجيات نمو متكاملة",
  description:
    "وكالة تسويق رقمي خدمات تحسين محركات البحث تسويق عبر السوشيال ميديا إدارة حملات إعلانية تصميم مواقع الكترونية تحسين ظهور المواقع تسويق محتوى احترافي تحليل بيانات السوق حلول تسويقية ذكية",
  keywords: "تصميم و برمجة المواقع, تخطيط و تنفيذ الفعاليات, إنتاج الفيديوهات, التجارة الإلكترونية, التصميم الجرافيكي, التسويق الرقمي",
  authors: [{ name: "Milaknight LLC-FZ" }],
  icons: {
    icon: "images/icons/favicon.ico",
    shortcut: "images/icons/favicon.ico",
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
    url: "https://mila-knight.com/",
    images: [
      {
        url: "https://mila-knight.com/images/logo-dark-footer.webp",
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
    images: ["https://mila-knight.com/images/logo-dark-footer.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Corporation",
      "@id": "https://mila-knight.com/#localbusiness",
      name: "MilaKnight LLC-FZ",
      description:
        "نحن وكالة تسويق رقمي خبراء سيو خبراء تسويق إلكتروني متخصصون في بناء العلامات التجارية نبتكر حلول تسويقية ذكية نستخدم أحدث أدوات التحليل نساعدك على النمو والانتشار",
      url: "https://mila-knight.com/",
      logo: "https://mila-knight.com/assets/images/logo-dark.webp",
      image: "https://mila-knight.com/assets/images/logo-dark.webp",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "الطابق السادس، مركز الأعمال، المدرج الكبير بفندق ميدان، شارع ميدان",
        addressLocality: "دبي",
        addressCountry: "الإمارات العربية المتحدة",
      },
      telephone: "+971585856774",
      openingHours: "Mo-Su 00:00-23:59",
      sameAs: [
        "https://www.linkedin.com/company/milaknight/",
        "https://www.instagram.com/milaknight.1//",
        "https://x.com/milaknight731",
        "https://www.snapchat.com/add/milaknight.mk",
        "https://www.facebook.com/people/milaknight/61557223981208/",
        "https://www.tiktok.com/@milaknight.mk",
        "https://www.youtube.com/channel/UCAYtPE9bp6ygjmJPmhA3GiA",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://mila-knight.com/#home",
      url: "https://mila-knight.com/",
      name: "الصفحة الرئيسية",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
    },
    {
      "@type": "AboutPage",
      "@id": "https://mila-knight.com/about.html",
      url: "https://mila-knight.com/about.html",
      name: "من نحن",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://mila-knight.com/services.html",
      url: "https://mila-knight.com/services.html",
      name: "خدماتنا",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/web-development.html",
      url: "https://mila-knight.com/service/web-development.html",
      name: "تصميم و برمجة المواقع",
      isPartOf: { "@id": "https://mila-knight.com/services.html" },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/digital-marketing.html",
      url: "https://mila-knight.com/service/digital-marketing.html",
      name: "التسويق الإلكتروني",
      isPartOf: { "@id": "https://mila-knight.com/services.html" },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/graphic-design.html",
      url: "https://mila-knight.com/service/graphic-design.html",
      name: "التصميم الجرافيكي",
      isPartOf: { "@id": "https://mila-knight.com/services.html" },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/e-commerce.html",
      url: "https://mila-knight.com/service/e-commerce.html",
      name: "التجارة الإلكترونية",
      isPartOf: { "@id": "https://mila-knight.com/services.html" },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/video-production.html",
      url: "https://mila-knight.com/service/video-production.html",
      name: "إنتاج الفيديو",
      isPartOf: { "@id": "https://mila-knight.com/services.html" },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/event-planning.html",
      url: "https://mila-knight.com/service/event-planning.html",
      name: "تخطيط وتنفيذ الفعاليات",
      isPartOf: { "@id": "https://mila-knight.com/services.html" },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://mila-knight.com/projects.html",
      url: "https://mila-knight.com/projects.html",
      name: "أعمالنا",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
    },
    {
      "@type": "WebPage",
      "@id": "https://mila-knight.com/pricing.html",
      url: "https://mila-knight.com/pricing.html",
      name: "الأسعار",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
    },
    {
      "@type": "Blog",
      "@id": "https://mila-knight.com/blog.html",
      url: "https://mila-knight.com/blog.html",
      name: "المدونة",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
    },
    {
      "@type": "ContactPage",
      "@id": "https://mila-knight.com/contact.html",
      url: "https://mila-knight.com/contact.html",
      name: "اتصل بنا",
      isPartOf: { "@id": "https://mila-knight.com/#localbusiness" },
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
            })(window,document,'script','dataLayer','GTM-K2R6JGSQ');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
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
