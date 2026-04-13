import HeroSection from '@/app/components/ui/HeroSection';
import PrivacyPolicyContent from './components/PrivacyPolicyContent';
import translations from '@/app/context/translations';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const language = lang || 'ar';
    const t = translations[language];

    return {
        title: t.privacy_policy_seo_title,
        description: t.privacy_policy_seo_description,
    };
}

export default async function PrivacyPolicyPage({ params }) {
    const { lang } = await params;
    
    return (
        <>
            <HeroSection 
                title="privacy_policy" 
                subtitle="" 
                breadcrumb="home" 
                page="privacy_policy" 
            />
            <PrivacyPolicyContent />
        </>
    );
}
