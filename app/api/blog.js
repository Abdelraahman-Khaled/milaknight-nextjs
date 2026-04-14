const API = process.env.NEXT_PUBLIC_BASE_URL;

export const getBlogs = async () => {
    const res = await fetch(`${API}/plogs_landing`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const getBlogDetails = async (slug) => {
    const res = await fetch(`${API}/plog_show?slug=${slug}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        let errorData = {};
        try {
            errorData = await res.json();
        } catch (e) {
            errorData = { message: 'Non-JSON error response or empty body' };
        }
        
        const error = new Error(`API Error: ${res.status}`);
        error.response = {
            status: res.status,
            data: errorData
        };
        throw error;
    }

    const data = await res.json();
    return Array.isArray(data) ? data[0] : (data || null);
};
