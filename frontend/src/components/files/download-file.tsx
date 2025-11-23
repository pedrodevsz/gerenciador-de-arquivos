"use client";

import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fileService } from "@/services/file-service";

interface DownloadFileProps {
    folderName: string;
    fileName: string;
}

export function DownloadFile({ folderName, fileName }: DownloadFileProps) {
    const download = async () => {
        try {
            const blob = await fileService.downloadFile(folderName, fileName);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erro ao baixar arquivo:", err);
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={download}>
            <DownloadIcon className="h-4 w-4" />
        </Button>
    );
}
