import api from "./api";

export const getPlans = async () => {
    const response = await api.get('/plans');
    return response.data;
};

export const purchasePlan = async (planId) => {
    const response = await api.post(`/plans/comprar/${planId}`);
    return response.data;
};
export const getPlanById = (id) => api.get(`/plans/${id}`);
export const createPlan = (data) => api.post("/plans", data);
export const updatePlan = (id, data) => api.put(`/plans/${id}`, data);
export const deletePlan = (id) => api.delete(`/plans/${id}`);
