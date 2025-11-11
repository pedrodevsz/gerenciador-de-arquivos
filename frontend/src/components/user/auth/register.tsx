"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Github, Globe, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { RegisterFormData, registerSchema } from "./validation";

export function Register() {
    const router = useRouter();
    const { register, loginWithGoogle, loginWithGithub, loading } = useAuthStore();
    const [authError, setAuthError] = useState<string | null>(null);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "" },
    });

    const handleFormRegister = async (data: RegisterFormData) => {
        try {
            setAuthError(null);
            await register(data.email, data.password);
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setAuthError("Este e-mail já está em uso. Tente outro.");
                        break;
                    case "auth/invalid-email":
                        setAuthError("E-mail inválido. Verifique o endereço digitado.");
                        break;
                    case "auth/weak-password":
                        setAuthError("A senha é muito fraca. Tente uma senha mais forte.");
                        break;
                    default:
                        setAuthError("Erro ao criar conta. Tente novamente.");
                }
            } else {
                setAuthError("Erro inesperado. Tente novamente.");
            }
        }
    };

    const handleRegisterGoogle = async () => {
        try {
            setAuthError(null);
            await loginWithGoogle();
            router.push("/");
        } catch (error) {
            console.error("Erro com Google:", error);
            setAuthError("Erro ao autenticar com Google.");
        }
    };

    const handleRegisterGithub = async () => {
        try {
            setAuthError(null);
            await loginWithGithub();
            router.push("/");
        } catch (error) {
            console.error("Erro com GitHub:", error);
            setAuthError("Erro ao autenticar com GitHub.");
        }
    };

    return (
        <Card className="w-full max-w-md p-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-semibold text-center text-white mb-4">
                Criar conta
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormRegister)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300 flex items-center gap-2">
                                    <Mail size={16} /> E-mail
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="seuemail@exemplo.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Senha */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300 flex items-center gap-2">
                                    <Lock size={16} /> Senha
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="••••••••" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {authError && (
                        <p className="default-error">{authError}</p>
                    )}

                    <Button
                        type="submit"
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : "Criar conta"}
                    </Button>
                </form>
            </Form>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-neutral-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-neutral-900 px-2 text-gray-400">
                        ou continue com
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button
                    onClick={handleRegisterGoogle}
                    variant="outline"
                    className="flex items-center gap-2 text-gray-200 border-neutral-700 hover:bg-neutral-800"
                >
                    <Globe size={18} /> Google
                </Button>
                <Button
                    onClick={handleRegisterGithub}
                    variant="outline"
                    className="flex items-center gap-2 text-gray-200 border-neutral-700 hover:bg-neutral-800"
                >
                    <Github size={18} /> GitHub
                </Button>
            </div>

            <div className="text-center text-sm text-gray-400 mt-4">
                <p>
                    Já tem conta?
                    <Link
                        href="/user/login"
                        className="text-blue-400 hover:text-blue-300 transition-colors mx-1"
                    >
                        Faça o login
                    </Link>
                </p>
            </div>
        </Card>
    );
}
