"use client";
import React, { useContext, useState } from 'react';
import { LanguageContext } from '@/app/context/LanguageContext';
import HeroSection from '@/app/components/ui/HeroSection';
import ScrollTicker from '@/app/components/ui/ScrollTicker';
import PricingPackages from './PricingPackages';
import CustomPackage from './CustomPackage';
import PricingNotes from './PricingNotes';
import QuoteModal from './QuoteModal';
import { pricingTranslations } from '@/app/data/pricingData';

const PricingContent = () => {
    const { language } = useContext(LanguageContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');

    const t = pricingTranslations[language] || pricingTranslations.ar;

    const handleGetQuote = (packageName) => {
        setSelectedPackage(packageName);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPackage('');
    };

    return (
        <>
            <HeroSection
                title=""
                subtitle={t.pageTitle}
                breadcrumb={t.home}
                page={t.pageTitle}
            />

            <ScrollTicker />

            <PricingPackages
                language={language}
                translations={t}
                onGetQuote={handleGetQuote}
            />

            <CustomPackage
                language={language}
                translations={t}
                onGetQuote={handleGetQuote}
            />

            <PricingNotes language={language} />

            <QuoteModal
                show={showModal}
                onClose={closeModal}
                selectedPackage={selectedPackage}
                translations={t}
            />
        </>
    );
};

export default PricingContent;
