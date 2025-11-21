import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15000,
});

api.interceptors.request.use(
    (config) => {
        // Ex: incluir token futuramente:
        // const token = localStorage.getItem("token");
        // if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        switch (status) {
            case 400:
                toast.error("Requisição inválida.");
                break;

            case 401:
                toast.error("Não autorizado.");
                break;

            case 404:
                toast.error("Não encontrado.");
                break;

            case 500:
                toast.error("Erro interno no servidor.");
                break;

            default:
                toast.error("Erro inesperado ao chamar a API.");
        }

        return Promise.reject(error);
    }
);
