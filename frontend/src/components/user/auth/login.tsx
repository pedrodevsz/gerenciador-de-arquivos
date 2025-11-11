"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Globe, Github } from "lucide-react";
import Link from "next/link";
import { LoginFormData, loginSchema } from "./validation";
import { useAuthStore } from "@/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

export function Login() {
    const router = useRouter()
    const { loading, login, loginWithGoogle, loginWithGithub } = useAuthStore()
    const [authError, setAuthError] = useState<string | null>(null)

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (data: LoginFormData) => {
        try {
            setAuthError(null)
            await login(data.password, data.email)
            router.push("/")

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/user-not-found":
                        setAuthError("Usuário não encontrado. Verifique o e-mail.");
                        break;
                    case "auth/wrong-password":
                        setAuthError("Senha incorreta. Tente novamente.");
                        break;
                    case "auth/invalid-email":
                        setAuthError("E-mail inválido.");
                        break;
                    case "auth/too-many-requests":
                        setAuthError("Muitas tentativas. Tente novamente mais tarde.");
                        break;
                    default:
                        setAuthError("Erro ao fazer login. Tente novamente.");
                }
            } else {
                setAuthError("Erro inesperado. Tente novamente.");
            }
        }
    };

    const handleLoginGoogle = async () => {
        try {
            await loginWithGoogle();
            router.push("/");
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error);
            setAuthError("Erro ao autenticar com Google.");
        }
    };

    const handleLoginGithub = async () => {
        try {
            await loginWithGithub();
            router.push("/");
        } catch (error) {
            console.error("Erro ao fazer login com GitHub:", error);
            setAuthError("Erro ao autenticar com GitHub.");
        }
    };

    return (
        <Card className="w-full max-w-md p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-lg shadow-2xl">
            <h2 className="text-3xl font-semibold text-center text-white mb-2 tracking-tight">
                Entrar na conta
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300 flex items-center gap-2">
                                    <Mail size={16} /> E-mail
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="seuemail@exemplo.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300 flex items-center gap-2">
                                    <Lock size={16} /> Senha
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 text-xs">
                                    Digite sua senha cadastrada
                                </FormDescription>
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
                        {loading === true ? "Carregando" : "Entrar"}
                    </Button>
                </form>
            </Form>
            <div className="relative my-2">
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
                    type="button"
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-neutral-700 text-gray-200 hover:bg-neutral-800 transition-all"
                    onClick={handleLoginGoogle}
                >
                    <Globe size={18} />
                    Google
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-neutral-700 text-gray-200 hover:bg-neutral-800 transition-all"
                    onClick={handleLoginGithub}
                >
                    <Github size={18} />
                    GitHub
                </Button>
            </div>

            <div className="text-center text-sm text-gray-400 mt-4">
                <p>
                    Ainda não tem conta?
                    <Link
                        href="/user/register"
                        className="text-blue-400 hover:text-blue-300 transition-colors mx-1"
                    >
                        Crie uma agora
                    </Link>
                </p>
            </div>
        </Card>
    );
}
