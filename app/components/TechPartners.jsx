"use client";
import React, { useContext, useRef } from "react";
import Image from "next/image";
import { LanguageContext } from "../context/LanguageContext";
import SectionTitle from "./ui/SectionTitle";

const LOGO_DEV_PUBLIC_KEY = 'pk_Xq8rfVKDQFWRKnFrlawKSA';

const techPartners = [
  { name: "Meta", domain: "meta.com", url: "https://www.meta.com" },
  { name: "Microsoft", domain: "microsoft.com", url: "https://www.microsoft.com" },
  { name: "GoDaddy", domain: "godaddy.com", url: "https://www.godaddy.com" },
  { name: "WordPress", domain: "wordpress.org", url: "https://wordpress.org" },
  { name: "PrestaShop", domain: "prestashop.com", url: "https://www.prestashop.com" },
  { name: "cPanel", domain: "cpanel.net", url: "https://cpanel.net" },
  { name: "Hetzner", domain: "hetzner.com", url: "https://www.hetzner.com" },
  { name: "EspoCRM", domain: "espocrm.com", url: "https://www.espocrm.com" },
  { name: "Name.com", domain: "name.com", url: "https://www.name.com" },
];

const content = {
  ar: {
    badge: "شركاؤنا التقنيون",
    title: "نعمل مع أبرز المنصات العالمية",
    description: "لنقدم لك حلولاً متكاملة وموثوقة على أعلى مستوى.",
  },
  en: {
    badge: "Our Tech Partners",
    title: "Working with the World's Leading Platforms",
    description: "to deliver comprehensive, reliable, and best-in-class solutions.",
  },
};

const TechPartners = () => {
  const { language } = useContext(LanguageContext);
  const c = content[language];
  const containerRef = useRef(null);

  // Duplicate for seamless infinite scroll
  const allPartners = [...techPartners, ...techPartners, ...techPartners];
  const direction = language === 'ar' ? 'scroll-rtl' : 'scroll-ltr';

  return (
    <section className="tech-partners-section" aria-label={c.badge} ref={containerRef}>
      <div className="tech-partners-bg-glow tech-partners-glow-1" />
      <div className="tech-partners-bg-glow tech-partners-glow-2" />

      <div className="container">
        <SectionTitle
          title={c.badge}
          subtitle={c.title}
          span={c.description}
          className={`mb-5 ${language === 'ar' ? 'text-end' : 'text-start'}`}
        />
      </div>

      <div className="tech-partners-slider-container" style={{ overflow: 'hidden' }}>
        {/* Pure CSS infinite scroll — no GSAP needed */}
        <div
          className={`tech-partners-track tech-partners-track--${direction}`}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          style={{ display: 'flex', gap: '40px', width: 'max-content' }}
        >
          {allPartners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-partner-item"
              title={partner.name}
            >
              <Image
                src={`https://img.logo.dev/${partner.domain}?token=${LOGO_DEV_PUBLIC_KEY}`}
                alt={partner.name}
                className="tech-partner-logo"
                width={128}
                height={128}
                loading="lazy"
                onError={(e) => {
                  const target = e.target;
                  target.style.display = 'none';
                  const parent = target.parentNode;
                  if (parent) {
                    const span = document.createElement('span');
                    span.innerText = partner.name;
                    span.style.cssText = 'font-size:14px;font-weight:bold;color:#6f42c1;';
                    parent.appendChild(span);
                  }
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechPartners;
