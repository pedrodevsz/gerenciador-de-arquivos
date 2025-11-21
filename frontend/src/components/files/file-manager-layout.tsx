import { ReactNode } from 'react';

interface FileManagerLayoutProps {
    children: ReactNode;
}

export function FileManagerLayout({ children }: FileManagerLayoutProps) {
    return (
        <main className="flex justify-center w-full p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl">
                {children}
            </div>
        </main>
    );
}
