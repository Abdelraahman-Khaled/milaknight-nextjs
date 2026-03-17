import { mainServicesData } from '@/app/data/servicesData';
import { cookies } from 'next/headers';
import ServicesPageClient from './ServicesPageClient';

export async function generateMetadata() {
    const cookieStore = await cookies();
    const language = cookieStore.get('NEXT_LOCALE')?.value || 'ar';
    const data = mainServicesData[language];

    return {
        title: data.meta_title,
        description: data.meta_description,
        openGraph: {
            title: data.meta_title,
            description: data.meta_description,
        },
    };
}

export default async function Page() {
    return <ServicesPageClient />;
}
