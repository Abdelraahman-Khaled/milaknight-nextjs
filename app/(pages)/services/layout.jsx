export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata = {
    metadataBase: new URL("https://mila-knight.com"),
    title: "ميلا نايت - وكالة تسويق ترويجية كاملة الخدمات",
    description:
        "في Milaknight نرى في علامتكم إمكانيات لا حدود له، ادعونا نعمل معاً على تنفيذ خطط تسويقية مبتكرة ضمن إطار احترافي من التسويق الالكتروني",
    keywords:
        "تصميم و برمجة المواقع, تخطيط و تنفيذ الفعاليات, إنتاج الفيديوهات, التجارة الإلكترونية, التصميم الجرافيكي, التسويق الرقمي",
    authors: [{ name: "Milaknight LLC-FZ" }],
    manifest: "/manifest-ar.json",
    verification: {
        google: "sqr_XrhbIC_Q9Y0ZnpTsc6JrOkYMoCBmdASKMLNz7aA",
    },
    openGraph: {
        locale: "KSA",
        siteName: "Milaknight",
        type: "website",
        title: "ميلا نايت - وكالة تسويق ترويجية كاملة الخدمات",
        description:
            "في Milaknight نرى في علامتكم إمكانيات لا حدود له، ادعونا نعمل معاً على تنفيذ خطط تسويقية مبتكرة ضمن إطار احترافي من التسويق الالكتروني",
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
        title: "ميلا نايت - وكالة تسويق ترويجية كاملة الخدمات",
        description:
            "في Milaknight نرى في علامتكم إمكانيات لا حدود له، ادعونا نعمل معاً على تنفيذ خطط تسويقية مبتكرة ضمن إطار احترافي من التسويق الالكتروني",
        images: ["https://mila-knight.com/images/logo-dark-footer.webp"],
    },
};


export default function ServicesLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}

