"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Home,
  LayoutDashboard,
  Award,
  ShieldCheck,
  Info,
  Mail,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Logout failed.");
        setLoading(false);
        return;
      }

      setIsOpen(false);
      window.location.href = "/pages/login";
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Unable to logout. Please try again.");
      setLoading(false);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-indigo-100 bg-white/95 shadow-lg backdrop-blur-md">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="flex h-[76px] items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <GraduationCap
                className="h-7 w-7 text-white"
                strokeWidth={2.5}
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                ScholarFind
              </h1>

              <p className="text-[11px] font-medium text-gray-500">
                Find Your Dream Scholarship
              </p>
            </div>

          </Link>

          {/* ================= DESKTOP MENU ================= */}

          <div className="hidden items-center gap-1 lg:flex">

            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Home
            </Link>

            <Link
              href="/pages/dashboard"
              className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <LayoutDashboard className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Dashboard
            </Link>

            <Link
              href="/pages/scholarships"
              className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600"
            >
              <Award className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Scholarships
            </Link>

            <Link
              href="/pages/eligibility"
              className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
            >
              <ShieldCheck className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Eligibility
            </Link>

            <Link
              href="/about"
              className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
            >
              <Info className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              About
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-pink-50 hover:text-pink-600"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Contact
            </Link>

          </div>

          {/* ================= DESKTOP BUTTONS ================= */}

          <div className="hidden items-center gap-2 lg:flex">

            {/* Login */}

            <Link
              href="/pages/login"
              className="group flex items-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-4 py-2.5 text-sm font-bold text-blue-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white hover:shadow-lg"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>

            {/* Register */}

            <Link
              href="/pages/register"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Link>

            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-red-600 hover:to-rose-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />

              {loading ? "Logging out..." : "Logout"}
            </button>

          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {isOpen && (
          <div className="border-t border-indigo-100 py-5 lg:hidden">

            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              <Link
                href="/pages/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/pages/scholarships"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-purple-50 hover:text-purple-600"
              >
                <Award className="h-5 w-5" />
                Scholarships
              </Link>

              <Link
                href="/eligibility"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-600"
              >
                <ShieldCheck className="h-5 w-5" />
                Eligibility Checker
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                <Info className="h-5 w-5" />
                About
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <Mail className="h-5 w-5" />
                Contact
              </Link>

              {/* Mobile Login */}

              <Link
                href="/pages/login"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 py-3 font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                <LogIn className="h-5 w-5" />
                Login
              </Link>

              {/* Mobile Register */}

              <Link
                href="/pages/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white shadow-md transition hover:from-indigo-600 hover:to-purple-600"
              >
                <UserPlus className="h-5 w-5" />
                Register
              </Link>

              {/* Mobile Logout */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 py-3 font-bold text-white shadow-md transition hover:from-red-600 hover:to-rose-700 disabled:opacity-50"
              >
                <LogOut className="h-5 w-5" />

                {loading
                  ? "Logging out..."
                  : "Logout"}
              </button>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}