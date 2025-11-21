"use client";

import { DragEvent } from "react";
import { File } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileType {
    name: string;
    url?: string;
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
    if (folder.files.length === 0) {
        return <span className="text-sm">Vazio</span>;
    }

    return (
        <>
            <div className="max-h-40 max-w-full overflow-y-auto pr-2">
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

            {!isExpanded && (
                <span className="text-xs text-muted-foreground">
                    {folder.files[0].name}
                </span>
            )}
        </>
    );
}
