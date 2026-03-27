'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { LanguageProvider } from '../context/LanguageContext';

export default function Providers({ children, lang }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // to avoid refetching immediately on the client
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <LanguageProvider lang={lang}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </LanguageProvider>
    );
}
