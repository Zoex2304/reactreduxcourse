import React, { useCallback, memo, FC } from "react";
import { Mail, Lock } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  useForm,
  Controller,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { FloatingInputLabel } from '../components/internal/FloatingInputLabel.js';

const globalStyle = `
  input[type="password"]::-ms-reveal,
  input[type="password"]::-webkit-password-reveal-button {
    display: none;
  }
`;

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginActionButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

const FieldErrors = memo(({ message }: { message?: string }) => (
  <AnimatePresence mode="wait">
    {message && (
      <motion.p
        key={message}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="text-rose-500 text-xs px-1 pt-1"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
));

const LoginActionButton: React.FC<LoginActionButtonProps> = memo(
  ({ isLoading, isDisabled }) => (
    <div className="space-y-4">
      <div className="text-right">
        <Link
          to=""
          className="text-xs sm:text-sm font-medium text-primary hover:underline"
        >
          Forgot password
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full h-11 sm:h-12 text-sm sm:text-base font-medium"
        disabled={isLoading || isDisabled}
      >
        {isLoading ? "Processing..." : "Sign in"}
      </Button>
    </div>
  )
);

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form submitted:", data);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  type ValidationState = "valid" | "invalid" | "default";

  const useValidationState = <TValidationState extends FieldValues>(
    field: ControllerRenderProps<TValidationState>,
    fieldState: ControllerFieldState
  ): ValidationState => {
    const { error, isTouched } = fieldState;
    const hasVal = field.value || field.value.length > 0;

    const validationState =
      !isTouched || !hasVal ? "default" : error ? "invalid" : "valid";

    return validationState;
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState}) => {
            const validationState = useValidationState(field,fieldState);
            return (
              <div>
                <FloatingInputLabel
                  id="email"
                  label="Email"
                  leading={Mail}
                  type="email"
                  validationState={validationState}
                  {...field}
                />
                <AnimatePresence>
                  {fieldState.error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-rose-500 text-xs px-1 pt-1"
                    >
                      {fieldState.error.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => {
            const validationState = useValidationState(field, fieldState )
            return (
              <div>
                <FloatingInputLabel
                  id="password"
                  label="Password"
                  leading={Lock}
                  type="password"
                  showPasswordToggle={field.value.length > 0}
                  validationState={validationState}
                  {...field}
                />
                <FieldErrors message={fieldState.error?.message} />
              </div>
            );
          }}
        />
      </div>
      <LoginActionButton isDisabled={!isValid} isLoading={isSubmitting} />
    </form>
  );
};

// --- Main Page ---
const LoginPage: React.FC = () => {
  const handleSocialLogin = useCallback((provider: "google" | "github") => {
    console.log(`sign in with ${provider}`);
  }, []);

  return (
    <>
      <style>{globalStyle}</style>
      <Card className="w-full max-w-[95%] sm:max-w-md md:max-w-lg shadow-lg">
        <CardHeader className="space-y-2 text-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg">
            Sign in to continue to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-4 sm:px-6 md:px-8 pb-6">
          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            <Button
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
            >
              <FaGoogle className="size-4 sm:size-5 mr-2" />
              <span className="hidden xs:inline sm:inline">Sign in with </span>
              Google
            </Button>
            <Button
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
            >
              <FaGithub className="size-4 sm:size-5 mr-2" />
              <span className="hidden xs:inline sm:inline">Sign in with </span>
              Github
            </Button>
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6 md:px-8 pb-6">
          <p className="w-full text-center text-xs sm:text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginPage;
