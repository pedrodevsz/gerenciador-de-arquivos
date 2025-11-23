"use client";

import { useFolderStore } from "@/stores/use-folders-store";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
    folderName: string;
}

export function DownloadFolder({ folderName }: Props) {
    const downloadFolder = useFolderStore((s) => s.downloadFolder);
    const isDownloading = useFolderStore((s) => s.isDownloadingFolder);

    const handleDownload = async () => {
        await downloadFolder(folderName);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="text-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <DownloadIcon className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                Baixar pasta
            </TooltipContent>
        </Tooltip>
    );
}
