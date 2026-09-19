import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const authApiInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function register({ email, password, phoneno, fullname, isSeller = false }) {
    const response = await authApiInstance.post("/register", {
        email,
        phoneno,
        password,
        isSeller: Boolean(isSeller),
        fullname
    });
    return response.data;
}
export async function login({ email, password }) {
    const response = await authApiInstance.post("/login", {
        email, password
    })

    return response.data
}
