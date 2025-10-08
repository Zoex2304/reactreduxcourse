import { Button } from "../components/ui/button.jsx";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import React, { useCallback } from "react";
import {
  useForm,
  ControllerRenderProps,
  ControllerFieldState,
  FieldValues,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { FloatingInputLabel } from "../components/internal/FloatingInputLabel.js";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../components/ui/form";

const elimiteDefaultTrailing = `
  input[type="password"]::-ms-reveal,
  input[type="password"]::-webkit-password-reveal-button {
    display: none;  
  }
`;

// Skema Zod asli Anda dipertahankan
const loginSchema = z.object({
  email: z.string().email({ message: "please enter a valid email address" }),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppcercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one character spesial"),
});

interface LoginActionButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

type LoginFormInputs = z.infer<typeof loginSchema>;

const FieldErrors = ({ message }: { message?: string }) =>
  message && (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );

const LoginActionButton: React.FC<LoginActionButtonProps> = ({
  isLoading,
  isDisabled,
}) => {
  return (
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
        disabled={isLoading || isDisabled}
        className="w-full h-11 sm:h-12 text-sm sm:text-base font-medium"
      >
        {isLoading ? "Processing..." : "Sign in"}
      </Button>
    </div>
  );
};

const LoginForm: React.FC = () => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type ValidationState = "default" | "invalid" | "valid";

  const useValidationState = <TValidationState extends FieldValues>(
    field: ControllerRenderProps<TValidationState>,
    fieldState: ControllerFieldState
  ): ValidationState => {
    const { error } = fieldState;
    const hasVal = field.value.length > 0 || field.value;
    const validationState = !hasVal ? "default" : error ? "invalid" : "valid";
    return validationState;
  };

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form submitted: ", data);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => {
              const validationState = useValidationState(field, fieldState);
              return (
                <FormItem>
                  <FormControl>
                    <FloatingInputLabel
                      id="email"
                      label="Email"
                      leading={Mail}
                      type="email"
                      validationState={validationState}
                      {...field}
                    />
                  </FormControl>

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
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => {
              const validationState = useValidationState(field, fieldState);
              return (
                <FormItem>
                  <FormControl>
                    <FloatingInputLabel
                      id="password"
                      label="Password"
                      leading={Lock}
                      type="password"
                      showPasswordToggle={field.value.length > 0}
                      validationState={validationState}
                      {...field}
                    />
                  </FormControl>
                  <FieldErrors message={fieldState.error?.message} />
                </FormItem>
              );
            }}
          />
        </div>
        <LoginActionButton
          isDisabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

const LoginPage: React.FC = () => {
  const handleSocialLogin = useCallback((provider: "google" | "github") => {
    console.log(`Sign in with ${provider}`);
  }, []);

  return (
    <>
      <style>{elimiteDefaultTrailing}</style>
      <Card className="w-full max-w-[95%] sm:max-w-md md:max-w-lg shadow-lg">
        <CardHeader className="space-y-2 text-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Welcome back!
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
              onClick={() => handleSocialLogin("google")}
              variant="outline"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
            >
              <FaGoogle className="size-4 sm:size-5 mr-2" />
              <span className="hidden xs:inline sm:inline">
                Sign in with Google
              </span>
            </Button>
            <Button
              onClick={() => handleSocialLogin("github")}
              variant="outline"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
            >
              <FaGithub className="size-4 sm:size-5 mr-2" />
              <span className="hidden xs:inline sm:inline">Sign in Github</span>
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