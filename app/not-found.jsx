'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { LanguageContext } from './context/LanguageContext';
import translations from './context/translations';

export default function NotFound() {
    // Safe approach: Use optional chaining and default to 'ar'
    const context = useContext(LanguageContext);
    const language = context?.language || 'ar';
    const t = translations[language] || translations.ar;

    return (
        <div className="error-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="error-page-image">
                            <Image
                                src="/images/404.svg"
                                alt="404 - Page Not Found"
                                width={600}
                                height={400}
                                priority
                            />
                        </div>
                        <div className="error-page-content">
                            <div className="section-title">
                                <h2>
                                    {t.error_404_title}
                                </h2>
                            </div>
                            <div className="error-page-content-body">
                                <p>
                                    {t.error_404_description}
                                </p>
                                <Link className="btn-default" href="/">
                                    {t.error_404_home_button}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

