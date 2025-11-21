"use client";

import { useFolderStore } from "@/stores/use-folders-store";
import { Input } from "@/components/ui/input";

export function AddFileInput({ folderName }: { folderName: string }) {
    const addFileToFolder = useFolderStore((state) => state.addFileToFolder);
    const isUploadingFile = useFolderStore((s) => s.isUploadingFile)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach((file) => {
            addFileToFolder(folderName, file);
        });
        e.target.value = "";
    };

    return (
        <Input
            type="file"
            disabled={isUploadingFile}
            multiple
            onChange={handleFileChange}
            variant="file"
            accept="*"
            label="Add"
        />
    );
}
