import axiosInstance from './axiosInstance';

/**
 * Fetch all faqs from the backend API.
 * @returns {Promise<Array>} List of faqs.
 */
export const getFaqs = async () => {
    try {
        const response = await axiosInstance.get('/faq_about_us');
        return response.data;
    } catch (error) {
        console.error('Error fetching faqs:', error);
        throw error;
    }
};

