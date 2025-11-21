"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GenericErrorProps {
    messageError: string;
    onRetry?: () => void;
}

export function GenericError({ messageError, onRetry }: GenericErrorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center text-red-700 rounded-lg p-4 text-center shadow-sm"
        >
            <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-700 text-base">Algo deu errado</span>
            </div>

            <p className="text-sm font-semibold text-red-600 mb-3 max-w-[90%]">
                {messageError}
            </p>

            {onRetry && (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={onRetry}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <RefreshCw className="h-4 w-4" />
                    Tentar novamente
                </Button>
            )}
        </motion.div>
    );
}
