
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/lib/schemas/authSchema";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);

  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const redirectMessage = location.state?.message || "";

  const [successMessage, setSuccessMessage] = useState(
    location.state?.registered
      ? "Account created successfully! Please sign in."
      : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: location.state?.username || "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setFormError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      // Authenticate against accounts registered in Zustand.
      const result = login(values.username, values.password);

      if (!result.success) {
        setFormError(result.message);
        return;
      }

      // Return to the originally requested page after login.
      const destination = location.state?.from || "/";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setFormError("Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-md sm:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Sign in to your ShopEase account.
          </p>
        </div>

        {redirectMessage && (
          <p
            role="status"
            className="mb-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-700"
          >
            {redirectMessage}
          </p>
        )}

        {successMessage && (
          <p
            role="status"
            className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700"
          >
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              Username
            </label>

            <Input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              className="w-full"
              {...register("username")}
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              Password
            </label>

            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {formError && (
            <p role="alert" className="text-sm text-red-600">
              {formError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-8 text-center text-base text-gray-600">
          New to ShopEase?{" "}
          <Link
            to="/register"
            className="font-semibold text-gray-800 underline underline-offset-2 hover:text-black"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
