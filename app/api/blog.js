import axiosInstance from './axiosInstance';

/**
 * Fetch all blogs from the backend API.
 * @returns {Promise<Array>} List of blog posts.
 */
export const getBlogs = async () => {
    try {
        const response = await axiosInstance.get('/plogs_landing');
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

/**
 * Fetch a single blog post by its slug.
 * @param {string} slug - The unique slug of the blog.
 * @returns {Promise<Object>} The blog post details.
 */
export const getBlogDetails = async (slug) => {
    try {
        const response = await axiosInstance.get('/plog_show', {
            params: { slug }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog details for slug: ${slug}`, error);
        throw error;
    }
};
