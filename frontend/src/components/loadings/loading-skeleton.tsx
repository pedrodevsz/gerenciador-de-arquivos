import { Loader2 } from "lucide-react";

export function LoadingSkeleton({ size = 40, message = "Carregando..." }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm"
        >
            <div className="flex items-center gap-3">
                <Loader2 className="animate-spin text-primary" size={size} aria-hidden={true} />
                <span className="sr-only">{message}</span>
            </div>

            <span className="text-sm text-muted-foreground">{message}</span>
        </div>
    );
}
