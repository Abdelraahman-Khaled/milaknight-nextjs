"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../context/LanguageContext";
import SectionTitle from "./ui/SectionTitle";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

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
  const isArabic = language === 'ar';

  return (
    <section className="tech-partners-section" aria-label={c.badge}>
      <div className="tech-partners-bg-glow tech-partners-glow-1" />
      <div className="tech-partners-bg-glow tech-partners-glow-2" />

      <div className="container">
        <SectionTitle
          title={c.badge}
          subtitle={c.title}
          span={c.description}
          className={`mb-5 ${isArabic ? 'text-end' : 'text-start'}`}
        />
      </div>

      <div className="tech-partners-slider-wrapper">
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={true}
          slidesPerView={'auto'}
          spaceBetween={40}
          dir={isArabic ? 'rtl' : 'ltr'}
          className="tech-partners-swiper"
        >
          {techPartners.map((partner, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <Link
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
              </Link>
            </SwiperSlide>
          ))}
          {/* Duplicate slides for smooth loop if needed by Swiper, 
              though loop={true} with slidesPerView auto often handles it */}
          {techPartners.map((partner, index) => (
            <SwiperSlide key={`extra-${index}`} style={{ width: 'auto' }}>
              <Link
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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TechPartners;
