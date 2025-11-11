import * as React from "react"
import { cn } from "@/lib/utils"
import { Plus, Loader2 } from "lucide-react"

type InputProps = React.ComponentProps<"input"> & {
  variant?: "default" | "file"
  label?: string
  loading?: boolean
  selectedText?: string
}

function Input({
  className,
  type,
  variant = "default",
  label = "Adicionar arquivo",
  loading = false,
  selectedText,
  ...props
}: InputProps) {
  if (variant === "file") {
    return (
      <label
        className={cn(
          "flex items-center justify-center gap-2 cursor-pointer rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-muted/50",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
          "dark:bg-input/30",
          className
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Plus className="h-4 w-4 text-primary" />
        )}

        <span className="text-sm">
          {loading
            ? "Carregando..."
            : selectedText
              ? selectedText
              : label}
        </span>

        <input
          type={type}
          {...props}
          className="hidden"
          disabled={loading}
        />
      </label>
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
