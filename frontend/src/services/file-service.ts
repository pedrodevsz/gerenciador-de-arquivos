import { api } from "../lib/api";

export const fileService = {
    async downloadFile(folder: string, fileName: string) {
        const res = await api.get("/storage/download-file", {
            params: { folder, fileName },
            responseType: "blob",
        });

        return res.data;
    }
};
