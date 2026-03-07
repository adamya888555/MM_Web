"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/lightswind/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLogin,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegister,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormValues) => {
    setGlobalError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        setGlobalError(resData.error || "Login failed");
        return;
      }

      if (resData.token) {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("user", JSON.stringify(resData.user));
        router.push("/");
      }
    } catch (error) {
      console.error("Login error", error);
      setGlobalError("Network error. Please try again.");
    }
  };

  const onRegister = async (data: RegisterFormValues) => {
    setGlobalError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        setGlobalError(resData.error || "Registration failed");
        return;
      }

      if (resData.token) {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("user", JSON.stringify(resData.user));
        router.push("/");
      }
    } catch (error) {
      console.error("Register error", error);
      setGlobalError("Network error. Please try again.");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setGlobalError("");
    resetLogin();
    resetRegister();
  };

  return (
    <div className="relative min-h-[calc(100vh-88px)] flex items-center justify-center bg-black overflow-hidden p-4 md:p-8">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract dark ambient background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-5xl h-[650px] bg-black/40 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Animated Sliding Panel Overlay */}
        <motion.div
          className="absolute top-0 bottom-0 z-30 w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 md:p-12 text-center"
          initial={false}
          animate={{
            x: isLogin ? "100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          <motion.div
            key={isLogin ? "loginOverlay" : "registerOverlay"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic text-black mb-6">
              {isLogin ? "New Here?" : "Welcome Back"}
            </h2>
            <p className="text-zinc-600 mb-10 text-sm md:text-base max-w-sm">
              {isLogin
                ? "Join Mohali Mart and discover the premier destination for fine art and professional tattoo services."
                : "Enter your personal details to keep connected with us and manage your bookings."}
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={toggleMode}
              className="rounded-full px-8 py-6 text-base font-semibold border-black text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </Button>
          </motion.div>
        </motion.div>

        {/* Forms Container */}
        <div className="relative w-full h-full flex">

          {/* Sign In Form */}
          <div className={cn("w-full md:w-1/2 h-full absolute top-0 left-0 p-8 md:p-14 flex items-center justify-center", isLogin ? "z-20 pointer-events-auto" : "z-0 pointer-events-none")}>
            <AnimatePresence>
              {isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-full max-w-sm"
                >
                  <div className="mb-10 text-center md:text-left text-white">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Sign In</h2>
                    <p className="text-zinc-400">Access your business hub account</p>
                  </div>

                  {globalError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-medium">
                      {globalError}
                    </motion.div>
                  )}

                  <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
                        <Input
                          {...loginRegister("email")}
                          type="email"
                          placeholder="hello@example.com"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/30 h-12"
                          autoComplete="email"
                        />
                      </div>
                      {loginErrors.email && <p className="text-red-400 text-xs mt-1 font-medium">{loginErrors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-zinc-300">Password</Label>
                        <a href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">Forgot password?</a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
                        <Input
                          {...loginRegister("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/30 h-12"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {loginErrors.password && <p className="text-red-400 text-xs mt-1 font-medium">{loginErrors.password.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoginSubmitting}
                      className="w-full h-12 mt-4 bg-white text-black hover:bg-zinc-200 rounded-lg font-semibold flex items-center justify-center gap-2 group transition-all"
                    >
                      {isLoginSubmitting ? "Signing In..." : "Sign In"}
                      {!isLoginSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign Up Form */}
          <div className={cn("w-full md:w-1/2 h-full absolute top-0 right-0 p-8 md:p-14 flex items-center justify-center", !isLogin ? "z-20 pointer-events-auto" : "z-0 pointer-events-none")}>
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-full max-w-sm"
                >
                  <div className="mb-8 text-center md:text-left text-white">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Create Account</h2>
                    <p className="text-zinc-400">Join the business hub today</p>
                  </div>

                  {globalError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-medium">
                      {globalError}
                    </motion.div>
                  )}

                  <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
                        <Input
                          {...registerRegister("name")}
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/30 h-11"
                        />
                      </div>
                      {registerErrors.name && <p className="text-red-400 text-xs mt-1 font-medium">{registerErrors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
                        <Input
                          {...registerRegister("email")}
                          type="email"
                          placeholder="hello@example.com"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/30 h-11"
                        />
                      </div>
                      {registerErrors.email && <p className="text-red-400 text-xs mt-1 font-medium">{registerErrors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
                        <Input
                          {...registerRegister("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/30 h-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {registerErrors.password && <p className="text-red-400 text-xs mt-1 font-medium">{registerErrors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
                        <Input
                          {...registerRegister("confirmPassword")}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/30 h-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {registerErrors.confirmPassword && <p className="text-red-400 text-xs mt-1 font-medium">{registerErrors.confirmPassword.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isRegisterSubmitting}
                      className="w-full h-11 mt-4 bg-white text-black hover:bg-zinc-200 rounded-lg font-semibold flex items-center justify-center gap-2 group transition-all"
                    >
                      {isRegisterSubmitting ? "Creating Account..." : "Create Account"}
                      {!isRegisterSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}