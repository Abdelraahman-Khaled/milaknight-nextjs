'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { LanguageContext } from './context/LanguageContext';

export default function NotFound() {
    const context = useContext(LanguageContext);
    const language = context?.language || 'ar';

    const content = {
        ar: {
            title: 'لم يتم العثور على الصفحة',
            description: 'الصفحة التي تبحث عنها غير موجودة',
            homeButton: 'الصفحة الرئيسية'
        },
        en: {
            title: 'Page Not Found',
            description: 'The page you are looking for does not exist',
            homeButton: 'Home Page'
        }
    };

    const t = content[language] || content.ar;

    return (
        <div className="error-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="error-page-image">
                            <Image
                                src="/images/404.svg"
                                alt="404"
                                width={600}
                                height={400}
                                priority
                            />
                        </div>
                        <div className="error-page-content">
                            <div className="section-title">
                                <h2>
                                    {t.title}
                                </h2>
                            </div>
                            <div className="error-page-content-body">
                                <p>
                                    {t.description}
                                </p>
                                <Link className="btn-default" href="/">
                                    {t.homeButton}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
