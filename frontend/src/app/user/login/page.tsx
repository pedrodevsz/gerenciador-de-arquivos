import { Login } from "@/components/user/auth/login";

export default function Page() {
    return (
        <main className="flex justify-center items-center h-screen w-full">
            <div className="w-full max-w-lg px-6">
                <Login />
            </div>
        </main>
    );
}
