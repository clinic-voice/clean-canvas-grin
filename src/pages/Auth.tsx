import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Lock, Building, ArrowLeft, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  clinicName: z.string().min(2, "Clinic name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", clinicName: "" },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const { error } = await signIn(data.email, data.password);
    setIsSubmitting(false);

    if (error) {
      let message = "An error occurred during login";
      if (error.message.includes("Invalid login credentials")) {
        message = "Invalid email or password. Please try again.";
      } else if (error.message.includes("Email not confirmed")) {
        message = "Please confirm your email address before logging in.";
      }
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.clinicName);
    setIsSubmitting(false);

    if (error) {
      let message = "An error occurred during signup";
      if (error.message.includes("already registered")) {
        message = "This email is already registered. Please log in instead.";
      } else if (error.message.includes("Password")) {
        message = error.message;
      }
      toast({
        title: "Signup failed",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">ClinicVoice AI</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Clinic with AI-Powered Voice
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Join 500+ clinics using Tamil-first voice AI to automate appointments, 
            reduce no-shows, and enhance patient care.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span>95% Appointment Booking Accuracy</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span>40% Reduction in No-Shows</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span>Native Tamil Language Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Back to home */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-cv-text-secondary hover:text-cv-text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-cv-text-primary">ClinicVoice AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-cv-text-primary mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-cv-text-secondary">
              {isLogin 
                ? "Log in to access your clinic dashboard" 
                : "Start your 14-day free trial today"}
            </p>
          </div>

          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cv-text-primary">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-secondary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="clinic@example.com"
                    className="pl-10 bg-cv-surface border-cv-border focus:border-cv-primary"
                    {...loginForm.register("email")}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cv-text-primary">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-secondary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-cv-surface border-cv-border focus:border-cv-primary"
                    {...loginForm.register("password")}
                  />
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="clinicName" className="text-cv-text-primary">Clinic Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-secondary" />
                  <Input
                    id="clinicName"
                    type="text"
                    placeholder="Your Clinic Name"
                    className="pl-10 bg-cv-surface border-cv-border focus:border-cv-primary"
                    {...signupForm.register("clinicName")}
                  />
                </div>
                {signupForm.formState.errors.clinicName && (
                  <p className="text-red-500 text-sm">{signupForm.formState.errors.clinicName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupEmail" className="text-cv-text-primary">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-secondary" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="clinic@example.com"
                    className="pl-10 bg-cv-surface border-cv-border focus:border-cv-primary"
                    {...signupForm.register("email")}
                  />
                </div>
                {signupForm.formState.errors.email && (
                  <p className="text-red-500 text-sm">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword" className="text-cv-text-primary">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-secondary" />
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-cv-surface border-cv-border focus:border-cv-primary"
                    {...signupForm.register("password")}
                  />
                </div>
                {signupForm.formState.errors.password && (
                  <p className="text-red-500 text-sm">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-cv-text-primary">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-secondary" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-cv-surface border-cv-border focus:border-cv-primary"
                    {...signupForm.register("confirmPassword")}
                  />
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-cv-text-secondary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  loginForm.reset();
                  signupForm.reset();
                }}
                className="text-cv-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
