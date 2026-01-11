import axiosInstance from './axiosInstance';

/**
 * Fetch all faqs from the backend API.
 * @returns {Promise<Array>} List of faqs.
 */
export const getFaqs = async () => {
    try {
        const response = await axiosInstance.get('/faqs', {
            headers: {
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.zwxUKGhncy_iOsKaHVeQlA79rXNJUyVnvjizEZ1yzGY"}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching faqs:', error);
        throw error;
    }
};

