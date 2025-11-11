import { Loader2 } from 'lucide-react'

export function LoadingSkeleton({ size = 40, message = "Carregando..." }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center min-h-screen justify-center gap-3 w-full h-full p-4 bg-transparent text-white"
        >
            <div className="flex items-center gap-3">
                <Loader2 className='animate-spin' size={size} aria-hidden={true} />
                <span className='sr-only'>{message}</span>
            </div>
            <span className='text-sm opacity-90'>{message}</span>
        </div >
    )
}