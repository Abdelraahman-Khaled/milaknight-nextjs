// import "bootstrap/dist/css/bootstrap.min.css"; // Removed: Already included in globals.css to reduce payload by ~150KB
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "../components/BootstrapClient";
import Providers from "../components/Providers";
import Script from "next/script";
import localFont from "next/font/local";
import DynamicSEO from "../components/DynamicSEO";
import Preloader from "../components/Preloader";
import Cursor from "../components/Cursor";
import LegacyScripts from "../components/LegacyScripts";
import Navbar from "../components/Navbar";
import Footer from "../components/ui/Footer";
import RevealObserver from "../components/RevealObserver";
import "../globals.css";

// Configure local fonts (Tajawal for Arabic/English)
const tajawal = localFont({
  src: [
    { path: "../fonts/tajawal-v12-arabic_latin-200.woff2", weight: "200" },
    { path: "../fonts/tajawal-v12-arabic_latin-300.woff2", weight: "300" },
    { path: "../fonts/tajawal-v12-arabic_latin-regular.woff2", weight: "400" },
    { path: "../fonts/tajawal-v12-arabic_latin-500.woff2", weight: "500" },
    { path: "../fonts/tajawal-v12-arabic_latin-700.woff2", weight: "700" },
    { path: "../fonts/tajawal-v12-arabic_latin-800.woff2", weight: "800" },
    { path: "../fonts/tajawal-v12-arabic_latin-900.woff2", weight: "900" },
  ],
  variable: "--font-tajawal",
  display: "swap",
});

// Fustat fallback or secondary font
const fustat = localFont({
  src: [
    { path: "../fonts/fustat-v4-latin_latin-ext-200.woff2", weight: "200" },
    { path: "../fonts/fustat-v4-latin_latin-ext-300.woff2", weight: "300" },
    { path: "../fonts/fustat-v4-latin_latin-ext-regular.woff2", weight: "400" },
    { path: "../fonts/fustat-v4-latin_latin-ext-500.woff2", weight: "500" },
    { path: "../fonts/fustat-v4-latin_latin-ext-600.woff2", weight: "600" },
    { path: "../fonts/fustat-v4-latin_latin-ext-700.woff2", weight: "700" },
    { path: "../fonts/fustat-v4-latin_latin-ext-800.woff2", weight: "800" },
  ],
  variable: "--font-fustat",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Improved Accessibility
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    metadataBase: new URL("https://mila-knight.com"),
    alternates: {
      canonical: "./",
      languages: {
        ar: "./",
        en: "./",
      },
    },
    title:
      lang === "en"
        ? " Digital Marketing milestones"
        : "Milaknight علامة فارقة في مجال التسويق الالكتروني",
    description:
      lang === "en"
        ? "We develop innovative marketing plans blending latest tech with market insights, believing every brand deserves its success story."
        : "نسعى إلى تطوير خطط تسويقية مبتكرة تمزج بين أحدث التقنيات وأدق رؤى السوق ونؤمن بأن كل علامة تجارية تستحق قصة نجاحها الخاصة",
    keywords:
      "تصميم و برمجة المواقع, تخطيط و تنفيذ الفعاليات, إنتاج الفيديوهات, التجارة الإلكترونية, التصميم الجرافيكي, التسويق الرقمي",
    authors: [{ name: "Milaknight LLC-FZ" }],
    manifest: lang === "en" ? "/manifest-en.json" : "/manifest-ar.json",
    verification: {
      google: "sqr_XrhbIC_Q9Y0ZnpTsc6JrOkYMoCBmdASKMLNz7aA",
    },
    openGraph: {
      locale: lang === "en" ? "en_US" : "ar_SA",
      siteName: "Milaknight",
      type: "website",
      title:
        lang === "en"
          ? " Digital Marketing milestones"
          : "Milaknight علامة فارقة في مجال التسويق الالكتروني",
      description:
        lang === "en"
          ? "We develop innovative marketing plans blending latest tech with market insights, believing every brand deserves its success story."
          : " نسعى إلى تطوير خطط تسويقية مبتكرة تمزج بين أحدث التقنيات وأدق رؤى السوق ونؤمن بأن كل علامة تجارية تستحق قصة نجاحها الخاصة",
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
      title:
        lang === "en"
          ? " Digital Marketing milestones"
          : "Milaknight علامة فارقة في مجال التسويق الالكتروني",
      description:
        lang === "en"
          ? "We develop innovative marketing plans blending latest tech with market insights, believing every brand deserves its success story."
          : " نسعى إلى تطوير خطط تسويقية مبتكرة تمزج بين أحدث التقنيات وأدق رؤى السوق ونؤمن بأن كل علامة تجارية تستحق قصة نجاحها الخاصة",
      images: ["https://mila-knight.com/images/logo-dark-footer.webp"],
    },
  };
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://mila-knight.com/#business",
      name: "MilaKnight LLC-FZ",
      url: "https://mila-knight.com/",
      logo: "https://mila-knight.com/images/logo.svg",
      image: "https://mila-knight.com/images/logo.svg",
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
      "@id": "https://mila-knight.com/#website",
      url: "https://mila-knight.com/",
      name: "MilaKnight",
      publisher: {
        "@id": "https://mila-knight.com/#business",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://mila-knight.com/#home",
      url: "https://mila-knight.com/",
      name: "الصفحة الرئيسية",
      isPartOf: {
        "@id": "https://mila-knight.com/#website",
      },
      about: {
        "@id": "https://mila-knight.com/#business",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://mila-knight.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://mila-knight.com/",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/digital-marketing",
      name: "التسويق الإلكتروني",
      url: "https://mila-knight.com/service/digital-marketing",
      provider: {
        "@id": "https://mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/web-development",
      name: "تصميم وبرمجة المواقع",
      url: "https://mila-knight.com/service/web-development",
      provider: {
        "@id": "https://mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/graphic-design",
      name: "التصميم الجرافيكي",
      url: "https://mila-knight.com/service/graphic-design",
      provider: {
        "@id": "https://mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/e-commerce",
      name: "التجارة الإلكترونية",
      url: "https://mila-knight.com/service/e-commerce",
      provider: {
        "@id": "https://mila-knight.com/#business",
      },
    },
    {
      "@type": "Service",
      "@id": "https://mila-knight.com/service/video-production",
      name: "إنتاج الفيديو",
      url: "https://mila-knight.com/service/video-production",
      provider: {
        "@id": "https://mila-knight.com/#business",
      },
    },
  ],
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${tajawal.variable} ${fustat.variable}`}
    >
      <head>
        <link rel="stylesheet" href="/css/tech-partners.css" />

        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NSPXXGG5');`}
        </Script>
        <link rel="preload" href="/images/page-header-bg.webp" as="image" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSPXXGG5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Script src="/js/jquery-3.7.1.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.slicknav.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.waypoints.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
        {/* <Script src="/js/SplitText.min.js" strategy="lazyOnload" /> */}
        {/* <Script src="/js/gsap.min.js" strategy="lazyOnload" /> */}
        {/* <Script src="/js/ScrollTrigger.min.js" strategy="lazyOnload" /> */}
        <Script src="/js/swiper-bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/function.min.js" strategy="lazyOnload" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers lang={lang}>
          <DynamicSEO />
          <Preloader />
          <Cursor />
          <RevealObserver />
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
