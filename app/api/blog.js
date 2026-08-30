const API = process.env.NEXT_PUBLIC_BASE_URL;

// The backend marks a deleted post with 301 + {"error":"Moved permanently"} and
// no Location header, rather than 404. That status is kept on purpose (SEO), so
// the frontend is what has to act on it.
export const isDeleted = (error) => error?.response?.status === 301;

// A genuine miss, for if the backend ever starts reporting one properly.
export const isMissing = (error) => [404, 410].includes(error?.response?.status);

export const isGone = (error) => isDeleted(error) || isMissing(error);

export const getBlogs = async () => {
  const res = await fetch(`${API}/plogs_landing`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const getBlogDetails = async (slug) => {
  // No caching here on purpose. A deleted post answers 301, so `res.ok` is false
  // and the revalidating fetch throws. Next.js does not overwrite a cache entry
  // with a failed revalidation, so a cached copy of a post deleted after it was
  // first fetched would be served forever.
  const res = await fetch(`${API}/plog_show?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch (e) {
      errorData = { message: "Non-JSON error response or empty body" };
    }

    const error = new Error(`API Error: ${res.status}`);
    error.response = {
      status: res.status,
      data: errorData,
    };
    throw error;
  }

  const data = await res.json();
  return Array.isArray(data) ? data[0] : data || null;
};
