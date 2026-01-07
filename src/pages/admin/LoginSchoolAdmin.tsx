import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  IdCard,
  ArrowRight,
  BookOpen,
  Users,
  BarChart3,
} from "lucide-react";
import loginHero from "@/assets/loginHero.webp";
import { UserRoles } from "@/types/types";
import RoleSwitcher from "@/components/RoleSwitcher";
import { School, SchoolDomainResponse } from "@/types/types";

import { useSchUsersAuth } from "@/hooks/useSchAdmHooks";
import {
  adminLoginSchema,
  teacherLoginSchema,
  studentLoginSchema,
  type SchoolLoginData,
} from "@/schema/schLoginSchema";

const roleConfig = {
  ADMIN: {
    title: "Admin Login",
    subtitle: "Access the administrative dashboard to manage your platform.",
    emailLabel: "Email Address",
    emailPlaceholder: "admin@school.edu",
    identifierType: "email" as const,
  },
  TEACHER: {
    title: "Teacher Login",
    subtitle: "Access your classes, grades, and teaching resources.",
    emailLabel: "Email Address",
    emailPlaceholder: "teacher@school.edu",
    identifierType: "email" as const,
  },
  STUDENT: {
    title: "Student Login",
    subtitle: "Access your courses, assignments, and learning materials.",
    emailLabel: "Student ID",
    emailPlaceholder: "STU-2024-XXXXX",
    identifierType: "studentId" as const,
  },
};

interface SchoolAdminLoginProps {
  school: SchoolDomainResponse | null;
  logoUrl?: string;
}

export default function LoginSchoolAdmin({
  school,
  logoUrl,
}: SchoolAdminLoginProps) {
  const [currentRole, setCurrentRole] = useState<UserRoles>("ADMIN");
  const [showPassword, setShowPassword] = useState(false);

  const config = roleConfig[currentRole];

  const { mutate: login, isPending } = useSchUsersAuth(school?.school.id);

  // Get the right schema based on role
  const getSchema = () => {
    switch (currentRole) {
      case "ADMIN":
        return adminLoginSchema;
      case "TEACHER":
        return teacherLoginSchema;
      case "STUDENT":
        return studentLoginSchema;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolLoginData>({
    resolver: zodResolver(getSchema()),
    defaultValues:
      currentRole === "STUDENT"
        ? { studentId: "", role: "STUDENT" }
        : { email: "", password: "", role: currentRole },
  });

  // Reset form when role changes
  const handleRoleChange = (role: UserRoles) => {
    setCurrentRole(role);
    reset(
      role === "STUDENT"
        ? { studentId: "", role: "STUDENT" }
        : { email: "", password: "", role }
    );
  };

  const onSubmit = (data: SchoolLoginData) => {
    login(data);
    // console.log("Submitted data:", data);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-primary p-8 xl:p-12 lg:flex">
        <div className="space-y-8">
          <div className="space-y-4">
            {/* Display school name dynamically */}
            <h1 className="font-heading text-3xl xl:text-4xl font-bold leading-tight text-primary-foreground">
              Welcome to {school.school.name} Admin Portal
              <br />
              <span className="text-accent">One Click at a Time</span>
            </h1>
            <p className="max-w-md text-base xl:text-lg text-primary-foreground/80">
              A comprehensive learning management system designed for modern
              educational institutions.
            </p>
          </div>
          <div className="grid gap-4">
            {/* <FeatureItem
              icon={BookOpen}
              title="Rich Course Content"
              description="Interactive lessons, quizzes, and assignments"
            />
            <FeatureItem
              icon={Users}
              title="Collaborative Learning"
              description="Discussion forums and group projects"
            />
            <FeatureItem
              icon={BarChart3}
              title="Progress Analytics"
              description="Track performance with detailed insights"
            /> */}
          </div>
        </div>
        <p className="text-sm text-primary-foreground/60">
          © 2024 TLearn. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Login */}
      <div className="relative flex w-full flex-col items-center justify-center bg-background px-4 py-6 sm:px-6 sm:py-10 lg:w-1/2 lg:px-12 overflow-hidden">
        <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
          {/* Logo - Always visible on right panel */}
          <div className="mb-6 sm:mb-8 flex flex-col items-center gap-2 animate-fade-in">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${school?.school.name ?? "School"} logo`}
                className="h-14 sm:h-16 max-w-[160px] w-auto object-contain"
              />
            ) : (
              <div className="h-14 sm:h-16 w-32 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-400">
                Logo
              </div>
            )}
            {school?.school.name && (
              <h1 className="text-sm sm:text-base font-semibold text-gray-700 text-center">
                {school.school.name}
              </h1>
            )}
          </div>
          <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-card animate-scale-in">
            <div className="mb-5 sm:mb-6">
              <RoleSwitcher
                currentRole={currentRole}
                onRoleChange={handleRoleChange}
              />
            </div>

            {/* LOGIN FORM HERE */}
            <div className="animate-fade-in space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  {config.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {config.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <Label
                    htmlFor="identifier"
                    className="text-sm font-medium text-foreground"
                  >
                    {config.emailLabel}
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      {config.identifierType === "email" ? (
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <IdCard className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      id="identifier"
                      type={
                        config.identifierType === "email" ? "email" : "text"
                      }
                      placeholder={config.emailPlaceholder}
                      className="pl-10"
                      disabled={isPending}
                      {...register(
                        currentRole === "STUDENT" ? "studentId" : "email"
                      )}
                    />
                  </div>
                  {(errors as any).email && (
                    <p className="text-sm text-red-500">
                      {(errors as any).email.message}
                    </p>
                  )}
                  {(errors as any).studentId && (
                    <p className="text-sm text-red-500">
                      {(errors as any).studentId.message}
                    </p>
                  )}
                  {(errors as any).password && (
                    <p className="text-sm text-red-500">
                      {(errors as any).password.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD INPUT */}
                <div className=" mt-4">
                  {/* Password Label */}
                  {config.identifierType === "email" && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-foreground"
                        >
                          Password
                        </Label>
                        <button
                          type="button"
                          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          disabled={isPending}
                          {...register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {(errors as any).password && (
                        <p className="text-sm text-red-500">
                          {(errors as any).password.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
                {/* Add submit button */}
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isPending}
                >
                  {isPending ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">
                    Need help?
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Contact your institution administrator for account assistance.
              </p>
            </div>
          </div>
        </div>
        {/* Role hints */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {/* {currentRole === "admin" &&
              "Use admin.tlearn.com for direct admin access"}
            {currentRole === "teacher" &&
              "Teachers can also access via teacher.tlearn.com"}
            {currentRole === "student" &&
              "Students can also access via student.tlearn.com"} */}
          </p>
        </div>
        {/* Decorative elements */}
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 translate-y-1/2 rounded-full bg-primary/5 blur-3xl lg:left-auto lg:right-0" />
      </div>
    </div>
  );
}
