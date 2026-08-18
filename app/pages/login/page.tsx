"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      router.push("/pages/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Network connection error or internal server error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">

      {/* Background Decorations */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>

      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-300 opacity-40 blur-3xl"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-10">

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <GraduationCap
                className="h-9 w-9 text-white"
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your ScholarFind account
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">

              <button
                type="button"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
                onClick={() =>
                  alert(
                    "Forgot password feature will be added soon."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >

              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                  Logging in...
                </>
              ) : (
                <>
                  Login

                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}

            </button>

          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200"></div>

          </div>

          {/* Register */}
          <div className="text-center">

            <p className="text-sm text-gray-500">
              Don't have an account?
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/pages/register")
              }
              className="mt-2 font-semibold text-blue-600 transition hover:text-blue-800"
            >
              Create an account
            </button>

          </div>

        </div>

        {/* Bottom Text */}
        <p className="mt-5 text-center text-xs text-gray-500">
          Find your dream scholarship with{" "}
          <span className="font-semibold text-blue-600">
            ScholarFind
          </span>
        </p>

      </div>

    </main>
  );
}