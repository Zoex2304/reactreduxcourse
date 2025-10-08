import clsx from "clsx";
import React, { ChangeEvent, forwardRef, useState } from "react";
import { Input } from "../ui/input.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button.jsx";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label.jsx";

interface FloatingInputLabelProps {
  id: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  leading?: React.ElementType;
  type?: "email" | "text" | "password";
  showPasswordToggle?: boolean;
  validationState?: "default" | "invalid" | "valid";
}

export const FloatingInputLabel = forwardRef<
  HTMLInputElement,
  FloatingInputLabelProps
>(
  (
    {
      id,
      label,
      value,
      leading: Icon,
      type = "text",
      showPasswordToggle = false,
      validationState = "default",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputType = type === "password" && showPassword ? "text" : type;
    const hasVal = value?.length > 0;
    const isFloating = isFocused || hasVal;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      rest.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      rest.onBlur?.(e);
    };

    const handleClickEye = () => {
      setShowPassword(!showPassword);
    };

    const labelColorClasses = {
      default: isFocused ? "text-primary" : "text-muted-foreground",
      invalid: "text-rose-500",
      valid: "text-green-500",
    };

    const inputBorderClasses = {
      default: "focus-visible:ring-ring",
      invalid: "border-rose-500 focus-visible:ring-rose-500",
      valid: "border-green-500 focus-visible:ring-green-500",
    };

    return (
      <div className="relative w-full flex items-center">
        {Icon && (
          <div
            className={clsx(
              "pointer-events-none absolute left-3 z-10",
              labelColorClasses[validationState]
            )}
          >
            <Icon className="size-5" />
          </div>
        )}

        <Input
          ref={ref}
          id={id}
          type={inputType}
          value={value}
          onChange={rest.onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            "peer h-12",
            Icon ? "pl-10" : "pl-3",
            showPasswordToggle ? "pr-10" : "pr-3",
            inputBorderClasses[validationState]
          )}
        />

        <Label
          htmlFor={id}
          className={clsx(
            "absolute p-[0.5] bg-background text-sm transition-all duration-200 ease-in-out pointer-events-none origin-left",
            Icon ? "left-10" : "left-3",
            isFloating
              ? `-top-2.5 scale-90 ${labelColorClasses[validationState]}`
              : `top-1/2 -translate-y-1/2 scale-100 text-muted-foreground`
          )}
        >
          {label}
        </Label>

        {showPasswordToggle && (
          <AnimatePresence>
            <motion.div
              key="password-toggle-eye"
              className="absolute right-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                type="button"
                size="icon"
                onClick={handleClickEye}
                className="size-8 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  }
);
