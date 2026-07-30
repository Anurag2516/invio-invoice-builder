import { cn } from "@/lib/utils";
import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  hint?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, hint, error, className = "", ...rest }, inputRef) => {
    const [show, setShow] = useState(false);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold uppercase tracking-wider text-stone">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={inputRef}
            type={show ? "text" : "password"}
            {...rest}
            className={cn(
              `h-11 w-full rounded-lg border bg-background dark:bg-input/30 px-3.5 py-2 pr-10 text-sm text-foreground shadow-sm outline-none transition-[color, box-shadow] duration-150 ease-in-out placeholder:text-muted-foreground/80 hover:border-ring/90 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
                error
                  ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
                  : "border-input"
              }`,
              className,
            )}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className="text-[10px] text-red-500">{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
