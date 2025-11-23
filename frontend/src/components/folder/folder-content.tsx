"use client";

import { DragEvent, useState } from "react";
import { File, DownloadIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SelectFileModal } from "../files/select-file-modal";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface FileType {
    name: string;
    url: string;
}

interface FolderType {
    name: string;
    files: FileType[];
}

interface FolderContentProps {
    folder: FolderType;
    isExpanded: boolean;
}

export function FolderContent({ folder, isExpanded }: FolderContentProps) {
    const [openModal, setOpenModal] = useState(false);

    if (folder.files.length === 0) {
        return <span className="text-sm">Vazio</span>;
    }

    return (
        <>
            <SelectFileModal
                folderName={folder.name}
                files={folder.files}
                open={openModal}
                onOpenChange={setOpenModal}
            />

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setOpenModal(true)}
                    >
                        <DownloadIcon className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Baixar arquivos
                </TooltipContent>
            </Tooltip>

            <div className="flex items-start gap-2">
                <div className="max-h-40 max-w-full overflow-y-auto pr-2 flex-1">
                    <AnimatePresence initial={false}>
                        {isExpanded &&
                            folder.files.map((file) => (
                                <motion.div
                                    key={file.name}
                                    layout
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    draggable
                                    onDragStart={(e) => {
                                        const nativeEvent = e as unknown as DragEvent<HTMLDivElement>;

                                        nativeEvent.dataTransfer.setData("fileName", file.name);
                                        nativeEvent.dataTransfer.setData("sourceFolderName", folder.name);
                                    }}
                                    className="flex items-center gap-1 truncate cursor-grab active:cursor-grabbing py-0.5"
                                >
                                    <File size={12} className="shrink-0" />
                                    <span className="truncate">{file.name}</span>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>

            {!isExpanded && (
                <span className="text-xs text-muted-foreground">
                    {folder.files[0].name}
                </span>
            )}
        </>
    );
}
