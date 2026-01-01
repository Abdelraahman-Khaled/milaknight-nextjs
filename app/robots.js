export default async function robots() {
    // Use an environment variable for the base URL in production, or localhost for development
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    try {
        const res = await fetch(`${baseUrl}/api/robots-data`, {
            cache: 'no-store', // Ensure dynamic fetching
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch robots data');
        }

        const data = await res.json();

        return {
            rules: data.rules,
            sitemap: data.sitemap,
        };
    } catch (error) {
        console.error('Error fetching robots data:', error);
        // Fallback static configuration if fetch fails
        return {
            rules: [
                {
                    userAgent: '*',
                    disallow: ['/admin', '/private'],
                },
            ],
            sitemap: 'https://milaknight.com/sitemap.xml',
        };
    }
}
