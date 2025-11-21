import z from "zod";

export const FolderValidation = z.object({
    folderName: z.string().min(2, {
        message: "O nome da pasta deve ter pelo menos 2 caracteres.",
    }).max(50, {
        message: "O nome da pasta não pode exceder 50 caracteres.",
    }),
});

export type FormValues = z.infer<typeof FolderValidation>;