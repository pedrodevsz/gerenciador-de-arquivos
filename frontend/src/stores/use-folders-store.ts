import { create } from "zustand";
import { folderService } from "@/services/folder-service";

export interface FileItem {
    name: string;
    url: string;
    size?: number;
    type?: string;
}

export interface Folder {
    name: string;
    files: FileItem[];
}

interface FolderStore {
    folders: Folder[];
    error: string | null;

    isLoadingFolders: boolean;
    isCreatingFolder: boolean;
    isUploadingFile: boolean;
    isDownloadingFolder: boolean;

    retryCount: number;

    loadFolders: () => Promise<void>;
    retryLoadFolders: () => Promise<void>;
    addFolder: (name: string) => Promise<void>;
    addFileToFolder: (folderName: string, file: File) => Promise<void>;
    removeFolder: (folder: string) => Promise<void>;

    downloadFolder: (folderName: string) => Promise<void>;

    clearAll: () => void;
}

export const useFolderStore = create<FolderStore>((set, get) => ({
    folders: [],
    error: null,

    isLoadingFolders: false,
    isCreatingFolder: false,
    isUploadingFile: false,
    isDownloadingFolder: false,

    retryCount: 0,

    loadFolders: async () => {
        set({ isLoadingFolders: true, error: null });

        try {
            const data = await folderService.getFolders();
            set({
                folders: data,
                isLoadingFolders: false,
                retryCount: 0,
            });
        } catch (e) {
            const retryCount = get().retryCount + 1;

            set({
                error: "Nenhuma pasta encontrada",
                isLoadingFolders: false,
                retryCount,
            });

            if (retryCount <= 3) {
                setTimeout(() => get().loadFolders(), 800 * retryCount);
            }
        }
    },

    retryLoadFolders: async () => {
        set({ retryCount: 0 });
        await get().loadFolders();
    },

    addFolder: async (name) => {
        set({ isCreatingFolder: true, error: null });

        try {
            await folderService.createFolder(name);

            set((state) => ({
                folders: [...state.folders, { name, files: [] }],
            }));
        } catch {
            set({ error: "Erro ao criar pasta" });
        } finally {
            set({ isCreatingFolder: false });
        }
    },

    addFileToFolder: async (folderName, file) => {
        set({ isUploadingFile: true, error: null });

        try {
            const url = await folderService.uploadFile(folderName, file);

            set((state) => ({
                folders: state.folders.map((folder) =>
                    folder.name === folderName
                        ? {
                            ...folder,
                            files: [
                                ...folder.files,
                                {
                                    name: file.name,
                                    url,
                                    size: file.size,
                                    type: file.type,
                                },
                            ],
                        }
                        : folder
                ),
            }));
        } catch {
            set({ error: "Erro ao enviar arquivo" });
        } finally {
            set({ isUploadingFile: false });
        }
    },

    removeFolder: async (folderName) => {
        set({ error: null });

        try {
            await folderService.deleteFolder(folderName);

            set((state) => ({
                folders: state.folders.filter((f) => f.name !== folderName),
            }));
        } catch {
            set({ error: "Erro ao remover pasta" });
        }
    },

    downloadFolder: async (folderName) => {
        set({ isDownloadingFolder: true, error: null });

        try {
            const blob = await folderService.downloadFolder(folderName);

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${folderName}.zip`;
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            set({ error: "Falha ao fazer download da pasta" });
        } finally {
            set({ isDownloadingFolder: false });
        }
    },

    clearAll: () => set({ folders: [], error: null }),
}));
