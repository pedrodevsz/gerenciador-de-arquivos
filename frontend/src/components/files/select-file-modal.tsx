"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DownloadIcon } from "lucide-react";

import { fileService } from "@/services/file-service";

interface FileItem {
    name: string;
    url: string; // não será mais usado para download
}

interface Props {
    files: FileItem[];
    folderName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SelectFileModal({ files, folderName, open, onOpenChange }: Props) {
    const downloadFile = async (file: FileItem) => {
        try {
            const blob = await fileService.downloadFile(folderName, file.name);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erro ao baixar arquivo:", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Baixar arquivo</DialogTitle>
                    <DialogDescription>
                        Escolha um arquivo da pasta <strong>{folderName}</strong> para baixar.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-80 p-2 border rounded-md">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className="flex justify-between items-center py-2 border-b last:border-b-0"
                        >
                            <span className="truncate">{file.name}</span>

                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => downloadFile(file)}
                            >
                                <DownloadIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
