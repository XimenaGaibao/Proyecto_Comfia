import api from './api';

export const CreditService = {
    getAll: async () => {
        const response = await api.get('/credits');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/credits/${id}`);
        return response.data;
    },

    create: async (creditData) => {
        const response = await api.post('/credits', creditData);
        return response.data;
    },

    update: async (id, creditData) => {
        const response = await api.put(`/credits/${id}`, creditData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/credits/${id}`);
        return response.data;
    },

    addPayment: async (id, paymentData) => {
        const response = await api.post(`/credits/${id}/payments`, paymentData);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/credits/stats');
        return response.data;
    }
};