const API = process.env.NEXT_PUBLIC_BASE_URL;

export const getBlogs = async () => {
    const res = await fetch(`${API}/plogs_landing`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const getBlogDetails = async (slug) => {
    try {
        const res = await fetch(`${API}/plog_show?slug=${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return null;
        const data = await res.json();
        // Handle cases where the API returns an array instead of a single object
        return Array.isArray(data) ? data[0] : (data || null);
    } catch (error) {
        console.error('Error fetching blog details:', error);
        return null;
    }
};
