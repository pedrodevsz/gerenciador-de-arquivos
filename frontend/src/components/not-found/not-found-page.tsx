import Link from "next/link";

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-4">
            <div className="text-center animate-fadeIn">
                <h1 className="text-9xl font-extrabold text-gray-300 animate-bounce">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mt-4">
                    Ops! Página não encontrada
                </h2>
                <p className="mt-2 text-gray-500">
                    Parece que você se perdeu. Vamos te levar de volta para casa.
                </p>
                <Link
                    href="/"
                    className="inline-block mt-6 px-6 py-3 bg-zinc-900 text-white rounded-lg shadow hover:bg-zinc-700 transition-colors"
                >
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
}
