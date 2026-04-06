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
      toast({ title: "Login failed", description: message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!", description: "You have successfully logged in." });
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
      toast({ title: "Signup failed", description: message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to confirm your account." });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Premium Navy Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">ClinicVoice AI</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-[1.1] tracking-tight">
            Transform Your Clinic with AI-Powered Voice
          </h1>
          <p className="text-lg text-white/75 mb-12 leading-relaxed max-w-lg">
            Join 500+ clinics using Tamil-first voice AI to automate appointments, 
            reduce no-shows, and enhance patient care.
          </p>

          <div className="space-y-4">
            {[
              "95% Appointment Booking Accuracy",
              "40% Reduction in No-Shows",
              "Native Tamil Language Support"
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-sm font-medium text-white/90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">ClinicVoice AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Log in to access your clinic dashboard" 
                : "Start your 14-day free trial today"}
            </p>
          </div>

          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="clinic@example.com" className="pl-10 h-11 bg-background border-input focus:border-primary rounded-xl" {...loginForm.register("email")} />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-destructive text-sm">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-11 bg-background border-input focus:border-primary rounded-xl" {...loginForm.register("password")} />
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-destructive text-sm">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-11 gradient-teal text-white border-0 hover:opacity-90 font-medium rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Logging in...</>) : "Log in"}
              </Button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="clinicName" className="text-foreground text-sm font-medium">Clinic Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="clinicName" type="text" placeholder="Your Clinic Name" className="pl-10 h-11 bg-background border-input focus:border-primary rounded-xl" {...signupForm.register("clinicName")} />
                </div>
                {signupForm.formState.errors.clinicName && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.clinicName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupEmail" className="text-foreground text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="signupEmail" type="email" placeholder="clinic@example.com" className="pl-10 h-11 bg-background border-input focus:border-primary rounded-xl" {...signupForm.register("email")} />
                </div>
                {signupForm.formState.errors.email && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword" className="text-foreground text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="signupPassword" type="password" placeholder="••••••••" className="pl-10 h-11 bg-background border-input focus:border-primary rounded-xl" {...signupForm.register("password")} />
                </div>
                {signupForm.formState.errors.password && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10 h-11 bg-background border-input focus:border-primary rounded-xl" {...signupForm.register("confirmPassword")} />
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-11 gradient-teal text-white border-0 hover:opacity-90 font-medium rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account...</>) : "Create account"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); loginForm.reset(); signupForm.reset(); }}
                className="text-accent hover:underline font-medium"
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