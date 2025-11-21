"use client";

import { useFolderStore } from "@/stores/use-folders-store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

export function DeleteFolder({ name }: { name: string }) {
    const removeFolder = useFolderStore((state) => state.removeFolder);

    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setError(null);
        setIsDeleting(true);

        try {
            await removeFolder(name);
            setOpen(false);
        } catch (err) {
            setError("Erro ao remover pasta. Tente novamente.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="p-0">
                    <Trash2
                        size={20}
                        className="text-red-500 hover:text-red-600 cursor-pointer transition-transform hover:scale-110"
                    />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                    <DialogTitle>Confirmar exclusão</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja apagar a pasta <b>{name}</b>? <br />
                        Todos os arquivos dentro dela serão perdidos.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <DialogFooter className="flex justify-end gap-2 mt-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin h-4 w-4" />
                                Removendo...
                            </span>
                        ) : (
                            "Confirmar"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
