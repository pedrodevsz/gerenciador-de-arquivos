import { api } from "../lib/api";

export const folderService = {
    async getFolders() {
        const res = await api.get("/storage/list");
        return res.data;
    },

    async createFolder(name: string) {
        return api.post("/storage/folder", { folderName: name });
    },

    async uploadFile(folder: string, file: File) {
        const formData = new FormData();
        formData.append("folder", folder);
        formData.append("file", file);

        const res = await api.post("/storage/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data;
    },

    async deleteFolder(name: string) {
        return api.delete(`/storage/folder/${name}`);
    },

    downloadFolder: async (folderName: string): Promise<Blob> => {
        const res = await api.get("/storage/download-folder", {
            params: { folder: folderName },
            responseType: "blob"
        })

        return res.data
    }
};
