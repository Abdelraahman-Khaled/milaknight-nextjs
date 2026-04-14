const API = process.env.NEXT_PUBLIC_BASE_URL;

export const getFaqs = async () => {
  const res = await fetch(`${API}/faq_about_us`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error("Failed to fetch faqs");
  return res.json();
};
