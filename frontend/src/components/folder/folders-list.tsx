"use client";

import { useState } from "react";
import { useFolderStore } from "@/stores/use-folders-store";
import { useLoadFoldersOnMount } from "@/hooks/use-load-folder-mount";

import {
    Folder as FolderIcon,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { AddFileInput } from "../files/add-file-input";
import { FolderContent } from "./folder-content";
import { DeleteFolder } from "./delete-folder";
import { LoadingSkeleton } from "../loadings/loading-skeleton";
import { motion } from "framer-motion";
import { GenericError } from "../errors/generic-error";


export function FoldersList() {
    const folders = useFolderStore((s) => s.folders);
    const isLoadingFolders = useFolderStore((s) => s.isLoadingFolders);
    const error = useFolderStore((s) => s.error);
    const loadFolders = useFolderStore((s) => s.loadFolders)

    useLoadFoldersOnMount();
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

    if (isLoadingFolders) return <LoadingSkeleton />;

    if (error) return <GenericError messageError={error} onRetry={() => loadFolders()} />;

    if (folders.length === 0) {
        return (
            <GenericError messageError="Nenhuma pasta encontrada. Clique em “Nova Pasta” acima para criar uma." />
        );
    }

    const toggleFolder = (name: string) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <div className="mt-4 border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="w-[30%]">Nome do Diretório</TableHead>
                        <TableHead className="w-[10%] text-center">Arquivos</TableHead>
                        <TableHead className="w-[40%]">Detalhes do Conteúdo</TableHead>
                        <TableHead className="w-[10%] text-center">Apagar</TableHead>
                        <TableHead className="w-[10%] text-center">Novo Arquivo</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {folders.map((folder) => {
                        const isExpanded = !!expandedFolders[folder.name];

                        return (
                            <motion.tr
                                key={folder.name}
                                className="hover:bg-accent/50 transition-colors"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                            >
                                <TableCell
                                    className="font-medium flex items-center gap-3 cursor-pointer select-none"
                                    onClick={() => toggleFolder(folder.name)}
                                >
                                    <FolderIcon size={18} className="text-primary" />
                                    <span className="truncate">{folder.name}</span>

                                    {folder.files.length > 0 && (
                                        <span className="ml-2 text-xs text-muted-foreground flex items-center">
                                            {isExpanded ? (
                                                <>
                                                    <ChevronUp className="h-3 w-3" />
                                                    <span className="ml-1">Ocultar</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="h-3 w-3" />
                                                </>
                                            )}
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell className="text-center">
                                    <Badge
                                        variant={
                                            folder.files.length > 0 ? "secondary" : "outline"
                                        }
                                    >
                                        {folder.files.length}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-sm text-muted-foreground">
                                    <FolderContent
                                        folder={folder}
                                        isExpanded={isExpanded}
                                    />
                                </TableCell>

                                <TableCell className="flex justify-center items-center">
                                    <DeleteFolder name={folder.name} />
                                </TableCell>

                                <TableCell className="text-center">
                                    <AddFileInput folderName={folder.name} />
                                </TableCell>
                            </motion.tr>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
