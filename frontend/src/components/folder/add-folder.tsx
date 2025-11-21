"use client";

import { useState } from "react";
import { useFolderStore } from "@/stores/use-folders-store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { FolderValidation, FormValues } from "./validation";

export function AddFolder() {
    const addFolder = useFolderStore((state) => state.addFolder);
    const isCreatingFolder = useFolderStore((s) => s.isCreatingFolder);

    const [open, setOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(FolderValidation),
        defaultValues: { folderName: "" },
        mode: "onChange",
    });

    async function onSubmit(values: FormValues) {
        setSubmitError(null);

        try {
            await addFolder(values.folderName);
            form.reset();
            setOpen(false);
        } catch (err) {
            setSubmitError("Erro ao criar pasta. Tente novamente.");
        }
    }

    const handleOpenChange = (state: boolean) => {
        setOpen(state);
        if (!state) {
            form.reset();
            setSubmitError(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 mb-4">
                    <Plus size={16} /> Nova Pasta
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar nova pasta</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-4 flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="folderName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da Pasta</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Documentos"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {submitError && (
                            <p className="text-sm text-red-500">
                                {submitError}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isCreatingFolder}
                        >
                            {isCreatingFolder ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-4 w-4" />
                                    Criando...
                                </span>
                            ) : (
                                "Criar pasta"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
