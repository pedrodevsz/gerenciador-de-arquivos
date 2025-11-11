import z from "zod";

export const registerSchema = z
    .object({
        email: z.string().email("Digite um e-mail válido"),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
            .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número")
            .regex(/[\W_]/, "A senha deve conter um caractere especial"),
    })

export type RegisterFormData = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
