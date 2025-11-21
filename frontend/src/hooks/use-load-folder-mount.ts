"use client";

import { useEffect } from "react";
import { useFolderStore } from "@/stores/use-folders-store";

export function useLoadFoldersOnMount() {
    const loadFolders = useFolderStore((state) => state.loadFolders);

    useEffect(() => {
        loadFolders();
    }, [loadFolders]);
}
