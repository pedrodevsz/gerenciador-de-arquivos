import { Register } from "@/components/user/auth/register";

export default function Page() {
    return (
        <main className="flex justify-center items-center h-screen w-full">
            <div className="w-full max-w-lg px-6">
                <Register />
            </div>
        </main>
    );
}
