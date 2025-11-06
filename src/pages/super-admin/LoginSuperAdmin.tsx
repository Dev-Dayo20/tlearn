import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import loginHero from "@/assets/loginHero.webp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginSuperAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };
  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Column - Hero Image/Gradient */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
          <img
            src={loginHero}
            alt="TLearn Education Platform"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-16 h-16 text-accent" />
              <h1 className="text-5xl font-bold text-primary-foreground">
                TLearn
              </h1>
            </div>
            <p className="text-xl text-primary-foreground/90 max-w-md">
              Education Platform Management System
            </p>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-12 h-12 text-accent" />
                <h1 className="text-4xl font-bold text-primary">TLearn</h1>
              </div>
              <p className="text-muted-foreground">Super Admin Portal</p>
            </div>

            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </h2>
              <p className="text-muted-foreground">
                Sign in to your super admin account
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@tlearn.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                >
                  Sign In
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </form>

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Super Admin accounts are managed by the system administrator.
                <br />
                Contact support if you need assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSuperAdmin;
