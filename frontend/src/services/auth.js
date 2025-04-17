import api from "./api";

export const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const token = response.data?.token;
  
    if (token) {
      localStorage.setItem("token", token);
    }
  
    return response;
};
export const register = (data) => api.post("/auth/register", data);
export const logout = () => api.post("/auth/logout");
export const getCurrentUser = () => api.get("/auth/me");
