"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Scholarship = {
  id: string;
  title: string;
  provider: string;
  description?: string;
  state?: string;
  category?: string;
  course?: string;
  year?: string;
  minPercentage?: number;
  maxIncome?: number;
  amount?: number;
  deadline?: string;
  applicationLink?: string;
};

// =========================
// ICONS
// =========================

const Icon = ({
  name,
  size = 20,
}: {
  name:
    | "graduation"
    | "plus"
    | "check"
    | "zap"
    | "edit"
    | "trash"
    | "external"
    | "alert"
    | "refresh"
    | "calendar"
    | "location"
    | "book"
    | "users"
    | "money"
    | "clock";
  size?: number;
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "graduation":
      return (
        <svg {...common}>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12.5V17c3 2.2 9 2.2 12 0v-4.5" />
          <path d="M22 10v6" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "zap":
      return (
        <svg {...common}>
          <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      );

    case "edit":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
        </svg>
      );

    case "trash":
      return (
        <svg {...common}>
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="m19 6-1 14H6L5 6" />
          <path d="M10 11v5M14 11v5" />
        </svg>
      );

    case "external":
      return (
        <svg {...common}>
          <path d="M14 3h7v7" />
          <path d="M10 14 21 3" />
          <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
        </svg>
      );

    case "alert":
      return (
        <svg {...common}>
          <path d="M10.3 3.3 2.2 17a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );

    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8.1 8.1 0 0 0-15.5-3" />
          <path d="M4 4v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 3" />
          <path d="M20 20v-4h-4" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );

    case "location":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
          <path d="M4 5.5V21" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "money":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M15 9.5c-.7-.8-1.7-1.2-3-1.2-1.7 0-3 1-3 2.3 0 3.3 6 1.5 6 4.6 0 1.3-1.3 2.3-3 2.3-1.3 0-2.4-.4-3.1-1.2" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    default:
      return null;
  }
};

export default function AdminScholarshipPage() {
  const router = useRouter();

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // =========================
  // ADMIN AUTH
  // =========================

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!res.ok || !data.success) {
        router.replace("/pages/login");
        return;
      }

      if (data.user.role !== "ADMIN") {
        alert("Access denied. Admin only.");
        router.replace("/pages/dashboard");
        return;
      }

      setCheckingAuth(false);
      fetchScholarships();
    } catch (error) {
      console.error("Admin Auth Error:", error);
      router.replace("/pages/login");
    }
  };

  // =========================
  // FETCH SCHOLARSHIPS
  // =========================

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/scholarships");
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to load scholarships.");
        return;
      }

      setScholarships(data.scholarships || []);
    } catch (error) {
      console.error("Scholarship Fetch Error:", error);
      setError("Unable to load scholarships.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE SCHOLARSHIP
  // =========================

  const deleteScholarship = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to permanently delete this scholarship?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/scholarships/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete scholarship.");
        return;
      }

      setScholarships((prev) =>
        prev.filter((scholarship) => scholarship.id !== id)
      );

      alert("Scholarship deleted successfully.");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete scholarship.");
    }
  };

  // =========================
  // AUTH LOADING
  // =========================

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#080b12] p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <div className="animate-spin">
              <Icon name="refresh" size={28} />
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Admin Portal
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Verifying Access
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Checking administrator permissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05070b]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-[76px] items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-950/20">
                <Icon name="graduation" size={23} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
                  Administration
                </p>

                <h1 className="text-base font-bold text-white sm:text-lg">
                  Scholarship Management
                </h1>
              </div>

            </div>

            <button
              onClick={() =>
                router.push("/pages/admin/scholarship/add")
              }
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 active:scale-95 sm:px-5"
            >
              <Icon name="plus" size={18} />

              <span className="hidden sm:inline">
                Add Scholarship
              </span>

              <span className="sm:hidden">
                Add
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HERO */}

        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-[#080b12] shadow-2xl">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative p-7 sm:p-9">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                Dashboard Overview
              </span>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Manage Scholarships
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  Create, manage, update and organize scholarship
                  opportunities available for students on the platform.
                </p>
              </div>

              <div className="hidden h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 lg:flex">
                <Icon name="graduation" size={38} />
              </div>

            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}

        <div className="mb-8 grid gap-4 md:grid-cols-3">

          {/* TOTAL */}

          <div className="group rounded-2xl border border-white/10 bg-[#080b12] p-5 shadow-xl transition hover:-translate-y-1 hover:border-blue-500/30">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Scholarships
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {scholarships.length}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Total records available
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon name="graduation" size={24} />
              </div>

            </div>
          </div>

          {/* ACTIVE */}

          <div className="group rounded-2xl border border-white/10 bg-[#080b12] p-5 shadow-xl transition hover:-translate-y-1 hover:border-emerald-500/30">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Opportunities
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {scholarships.length}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <span className="text-xs text-emerald-400">
                    Currently available
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Icon name="check" size={24} />
              </div>

            </div>
          </div>

          {/* SYSTEM */}

          <div className="group rounded-2xl border border-white/10 bg-[#080b12] p-5 shadow-xl transition hover:-translate-y-1 hover:border-cyan-500/30">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  System Status
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  Operational
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                  <span className="text-xs text-slate-500">
                    All services running
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                <Icon name="zap" size={24} />
              </div>

            </div>
          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5">

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <Icon name="alert" size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-red-300">
                    Unable to load data
                  </h3>

                  <p className="mt-1 text-sm text-red-400/80">
                    {error}
                  </p>
                </div>

              </div>

              <button
                onClick={fetchScholarships}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                <Icon name="refresh" size={16} />
                Retry
              </button>

            </div>
          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="rounded-2xl border border-white/10 bg-[#080b12] p-16 text-center shadow-xl">

            <div className="mx-auto mb-5 flex h-14 w-14 animate-spin items-center justify-center rounded-2xl border-2 border-slate-800 border-t-blue-500 text-blue-400">
              <Icon name="refresh" size={24} />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Loading Scholarships
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we retrieve the latest records.
            </p>

          </div>
        )}

        {/* ================= EMPTY STATE ================= */}

        {!loading &&
          !error &&
          scholarships.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#080b12] p-12 text-center shadow-xl sm:p-16">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon name="graduation" size={38} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                No Scholarships Found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                There are currently no scholarship records available.
                Add your first scholarship to start managing opportunities.
              </p>

              <button
                onClick={() =>
                  router.push("/pages/admin/scholarship/add")
                }
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 active:scale-95"
              >
                <Icon name="plus" size={18} />
                Add First Scholarship
              </button>

            </div>
          )}

        {/* ================= LIST ================= */}

        {!loading && scholarships.length > 0 && (
          <section>

            {/* SECTION HEADER */}

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <h3 className="text-xl font-bold text-white">
                  Scholarship Records
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage all available scholarship opportunities.
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-[#080b12] px-4 py-2.5">
                <span className="text-sm font-bold text-blue-400">
                  {scholarships.length}
                </span>

                <span className="text-sm text-slate-500">
                  Total Records
                </span>
              </div>

            </div>

            {/* CARD GRID */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {scholarships.map((scholarship) => (
                <article
                  key={scholarship.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080b12] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-950/10"
                >

                  {/* TOP LINE */}

                  <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400" />

                  <div className="p-5 sm:p-6">

                    {/* HEADER */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <div className="mb-2 flex items-center gap-2">

                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                            Scholarship
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-700" />

                          <span className="text-[10px] text-slate-600">
                            ID: {scholarship.id.slice(-6)}
                          </span>

                        </div>

                        <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white">
                          {scholarship.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-slate-400">
                          {scholarship.provider}
                        </p>

                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                        <Icon name="graduation" size={22} />
                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    {scholarship.description && (
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
                        {scholarship.description}
                      </p>
                    )}

                    <div className="my-5 border-t border-white/10" />

                    {/* INFORMATION */}

                    <div className="space-y-3">

                      {scholarship.state && (
                        <div className="flex items-center justify-between gap-4">

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon name="location" size={15} />
                            <span>State</span>
                          </div>

                          <span className="text-right text-sm font-semibold text-slate-300">
                            {scholarship.state}
                          </span>

                        </div>
                      )}

                      {scholarship.category && (
                        <div className="flex items-center justify-between gap-4">

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon name="users" size={15} />
                            <span>Category</span>
                          </div>

                          <span className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
                            {scholarship.category}
                          </span>

                        </div>
                      )}

                      {scholarship.course && (
                        <div className="flex items-center justify-between gap-4">

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon name="book" size={15} />
                            <span>Course</span>
                          </div>

                          <span className="text-right text-sm font-semibold text-slate-300">
                            {scholarship.course}
                          </span>

                        </div>
                      )}

                      {scholarship.year && (
                        <div className="flex items-center justify-between gap-4">

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon name="calendar" size={15} />
                            <span>Academic Year</span>
                          </div>

                          <span className="text-sm font-semibold text-slate-300">
                            {scholarship.year}
                          </span>

                        </div>
                      )}

                      {scholarship.minPercentage != null && (
                        <div className="flex items-center justify-between gap-4">

                          <span className="text-sm text-slate-500">
                            Minimum Score
                          </span>

                          <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-sm font-bold text-emerald-400">
                            {scholarship.minPercentage}%
                          </span>

                        </div>
                      )}

                      {scholarship.maxIncome != null && (
                        <div className="flex items-center justify-between gap-4">

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Icon name="money" size={15} />
                            <span>Income Limit</span>
                          </div>

                          <span className="text-sm font-bold text-slate-300">
                            ₹
                            {scholarship.maxIncome.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>
                      )}

                    </div>

                    {/* AMOUNT */}

                    {scholarship.amount != null && (
                      <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">

                        <div className="flex items-center gap-2">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Icon name="money" size={16} />
                          </div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            Scholarship Amount
                          </p>

                        </div>

                        <p className="mt-2 text-2xl font-bold text-emerald-300">
                          ₹
                          {scholarship.amount.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>
                    )}

                    {/* DEADLINE */}

                    {scholarship.deadline && (
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">

                        <div className="flex items-center gap-2">
                          <Icon name="clock" size={16} />

                          <span className="text-xs font-medium text-amber-400">
                            Application Deadline
                          </span>
                        </div>

                        <span className="text-xs font-bold text-amber-300">
                          {new Date(
                            scholarship.deadline
                          ).toLocaleDateString("en-IN")}
                        </span>

                      </div>
                    )}

                    {/* APPLICATION */}

                    {scholarship.applicationLink && (
                      <a
                        href={scholarship.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500 active:scale-[0.98]"
                      >
                        View Application
                        <Icon name="external" size={16} />
                      </a>
                    )}

                    {/* ACTIONS */}

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/pages/admin/scholarship/edit/${scholarship.id}`
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300 active:scale-[0.98]"
                      >
                        <Icon name="edit" size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteScholarship(scholarship.id)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-600 hover:text-white active:scale-[0.98]"
                      >
                        <Icon name="trash" size={16} />
                        Delete
                      </button>

                    </div>

                  </div>
                </article>
              ))}

            </div>
          </section>
        )}

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="mt-8 border-t border-white/10 bg-[#05070b]">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">

          <p className="text-xs text-slate-600">
            Scholarship Finder Portal • Admin Management
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_7px_rgba(16,185,129,0.7)]" />
            System Operational
          </div>

        </div>
      </footer>

    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type Scholarship = {
//   id: string;
//   title: string;
//   provider: string;
//   description?: string;
//   state?: string;
//   category?: string;
//   course?: string;
//   year?: string;
//   minPercentage?: number;
//   maxIncome?: number;
//   amount?: number;
//   deadline?: string;
//   applicationLink?: string;
// };

// export default function AdminScholarshipPage() {
//   const router = useRouter();

//   const [scholarships, setScholarships] = useState<Scholarship[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   // =========================
//   // ADMIN AUTH
//   // =========================

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   const checkAdmin = async () => {
//     try {
//       const res = await fetch("/api/auth/me");
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         router.replace("/pages/login");
//         return;
//       }

//       if (data.user.role !== "ADMIN") {
//         alert("Access denied. Admin only.");
//         router.replace("/pages/dashboard");
//         return;
//       }

//       setCheckingAuth(false);
//       fetchScholarships();
//     } catch (error) {
//       console.error("Admin Auth Error:", error);
//       router.replace("/pages/login");
//     }
//   };

//   // =========================
//   // FETCH SCHOLARSHIPS
//   // =========================

//   const fetchScholarships = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/scholarships");
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Unable to load scholarships.");
//         return;
//       }

//       setScholarships(data.scholarships || []);
//     } catch (error) {
//       console.error("Scholarship Fetch Error:", error);
//       setError("Unable to load scholarships.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // DELETE SCHOLARSHIP
//   // =========================

//   const deleteScholarship = async (id: string) => {
//     const confirmDelete = confirm(
//       "Are you sure you want to delete this scholarship?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`/api/scholarships/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || "Failed to delete scholarship.");
//         return;
//       }

//       setScholarships((prev) =>
//         prev.filter((scholarship) => scholarship.id !== id)
//       );

//       alert("Scholarship deleted successfully.");
//     } catch (error) {
//       console.error("Delete Error:", error);
//       alert("Unable to delete scholarship.");
//     }
//   };

//   // =========================
//   // CHECKING ADMIN
//   // =========================

//   if (checkingAuth) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <div className="rounded-2xl bg-white px-10 py-8 text-center shadow-md">
//           <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-400"></div>

//           <p className="text-lg font-semibold text-slate-700">
//             Checking admin access...
//           </p>

//           <p className="mt-1 text-sm text-slate-400">
//             Please wait a moment
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">

//         {/* ================= HEADER ================= */}

//         <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 p-6 text-white shadow-md sm:p-8">

//           <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

//             <div>

//               <div className="mb-3 inline-flex items-center rounded-full bg-white/25 px-4 py-1.5 text-sm font-medium">
//                 🎓 Admin Panel
//               </div>

//               <h1 className="text-3xl font-extrabold sm:text-4xl">
//                 Scholarship Management
//               </h1>

//               <p className="mt-2 max-w-2xl text-sm text-blue-50 sm:text-base">
//                 Manage and organize all scholarships available on the
//                 Scholarship Finder Portal.
//               </p>

//             </div>

//             <button
//               onClick={() =>
//                 router.push("/pages/admin/scholarship/add")
//               }
//               className="rounded-xl bg-white px-6 py-3 font-bold text-blue-600 shadow-sm transition hover:bg-blue-50 hover:shadow-md"
//             >
//               + Add Scholarship
//             </button>

//           </div>
//         </div>

//         {/* ================= STATS ================= */}

//         <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

//           {/* TOTAL */}

//           <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-md">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm font-medium text-slate-500">
//                   Total Scholarships
//                 </p>

//                 <h2 className="mt-2 text-3xl font-extrabold text-blue-500">
//                   {scholarships.length}
//                 </h2>

//               </div>

//               <div className="rounded-xl bg-blue-50 p-4 text-2xl">
//                 🎓
//               </div>

//             </div>

//           </div>

//           {/* AVAILABLE */}

//           <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm font-medium text-slate-500">
//                   Available
//                 </p>

//                 <h2 className="mt-2 text-3xl font-extrabold text-emerald-500">
//                   {scholarships.length}
//                 </h2>

//               </div>

//               <div className="rounded-xl bg-emerald-50 p-4 text-2xl">
//                 ✅
//               </div>

//             </div>

//           </div>

//           {/* STATUS */}

//           <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-md">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-sm font-medium text-slate-500">
//                   Portal Status
//                 </p>

//                 <h2 className="mt-2 text-xl font-extrabold text-violet-500">
//                   Active
//                 </h2>

//               </div>

//               <div className="rounded-xl bg-violet-50 p-4 text-2xl">
//                 🚀
//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ================= ERROR ================= */}

//         {error && (
//           <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">

//             <p className="font-bold">
//               ⚠️ Something went wrong
//             </p>

//             <p className="mt-1 text-sm">
//               {error}
//             </p>

//           </div>
//         )}

//         {/* ================= LOADING ================= */}

//         {loading && (
//           <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

//             <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-400"></div>

//             <p className="font-semibold text-slate-600">
//               Loading scholarships...
//             </p>

//           </div>
//         )}

//         {/* ================= EMPTY ================= */}

//         {!loading &&
//           !error &&
//           scholarships.length === 0 && (

//             <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

//               <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
//                 🎓
//               </div>

//               <h2 className="text-2xl font-bold text-slate-700">
//                 No Scholarships Found
//               </h2>

//               <p className="mt-2 text-slate-400">
//                 Start by adding your first scholarship.
//               </p>

//               <button
//                 onClick={() =>
//                   router.push(
//                     "/pages/admin/scholarship/add"
//                   )
//                 }
//                 className="mt-6 rounded-xl bg-blue-400 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-500"
//               >
//                 + Add Scholarship
//               </button>

//             </div>
//           )}

//         {/* ================= SCHOLARSHIPS ================= */}

//         {!loading && scholarships.length > 0 && (
//           <div>

//             <div className="mb-5 flex items-center justify-between">

//               <div>

//                 <h2 className="text-2xl font-bold text-slate-700">
//                   All Scholarships
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-400">
//                   Manage scholarship information below.
//                 </p>

//               </div>

//               <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
//                 {scholarships.length} Available
//               </span>

//             </div>

//             {/* CARD GRID */}

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

//               {scholarships.map((scholarship) => (

//                 <div
//                   key={scholarship.id}
//                   className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
//                 >

//                   {/* CARD TOP */}

//                   <div className="h-1.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>

//                   <div className="p-6">

//                     {/* TITLE */}

//                     <div className="mb-4 flex items-start justify-between gap-3">

//                       <div>

//                         <h2 className="text-xl font-extrabold leading-tight text-slate-700">
//                           {scholarship.title}
//                         </h2>

//                         <p className="mt-2 font-semibold text-blue-500">
//                           {scholarship.provider}
//                         </p>

//                       </div>

//                       <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-500">
//                         SCHOLARSHIP
//                       </span>

//                     </div>

//                     {/* DESCRIPTION */}

//                     {scholarship.description && (
//                       <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-500">
//                         {scholarship.description}
//                       </p>
//                     )}

//                     {/* INFORMATION */}

//                     <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm">

//                       {scholarship.state && (
//                         <div className="flex items-center justify-between gap-3">

//                           <span className="font-medium text-slate-500">
//                             📍 State
//                           </span>

//                           <span className="font-semibold text-slate-700">
//                             {scholarship.state}
//                           </span>

//                         </div>
//                       )}

//                       {scholarship.category && (
//                         <div className="flex items-center justify-between gap-3">

//                           <span className="font-medium text-slate-500">
//                             🏷️ Category
//                           </span>

//                           <span className="rounded-full bg-violet-50 px-3 py-1 font-semibold text-violet-600">
//                             {scholarship.category}
//                           </span>

//                         </div>
//                       )}

//                       {scholarship.course && (
//                         <div className="flex items-center justify-between gap-3">

//                           <span className="font-medium text-slate-500">
//                             📚 Course
//                           </span>

//                           <span className="font-semibold text-slate-700">
//                             {scholarship.course}
//                           </span>

//                         </div>
//                       )}

//                       {scholarship.year && (
//                         <div className="flex items-center justify-between gap-3">

//                           <span className="font-medium text-slate-500">
//                             📅 Year
//                           </span>

//                           <span className="font-semibold text-slate-700">
//                             {scholarship.year}
//                           </span>

//                         </div>
//                       )}

//                       {scholarship.minPercentage != null && (
//                         <div className="flex items-center justify-between gap-3">

//                           <span className="font-medium text-slate-500">
//                             📊 Minimum %
//                           </span>

//                           <span className="font-bold text-emerald-500">
//                             {scholarship.minPercentage}%
//                           </span>

//                         </div>
//                       )}

//                       {scholarship.maxIncome != null && (
//                         <div className="flex items-center justify-between gap-3">

//                           <span className="font-medium text-slate-500">
//                             💰 Max Income
//                           </span>

//                           <span className="font-bold text-orange-400">
//                             ₹
//                             {scholarship.maxIncome.toLocaleString(
//                               "en-IN"
//                             )}
//                           </span>

//                         </div>
//                       )}

//                     </div>

//                     {/* AMOUNT */}

//                     {scholarship.amount != null && (
//                       <div className="mt-5 rounded-xl bg-emerald-50 p-4">

//                         <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//                           Scholarship Amount
//                         </p>

//                         <p className="mt-1 text-2xl font-extrabold text-emerald-600">
//                           ₹
//                           {scholarship.amount.toLocaleString(
//                             "en-IN"
//                           )}
//                         </p>

//                       </div>
//                     )}

//                     {/* DEADLINE */}

//                     {scholarship.deadline && (
//                       <div className="mt-4 flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3">

//                         <span className="text-sm font-medium text-slate-500">
//                           ⏰ Deadline
//                         </span>

//                         <span className="text-sm font-bold text-rose-500">
//                           {new Date(
//                             scholarship.deadline
//                           ).toLocaleDateString("en-IN")}
//                         </span>

//                       </div>
//                     )}

//                     {/* APPLICATION */}

//                     {scholarship.applicationLink && (
//                       <a
//                         href={scholarship.applicationLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="mt-5 block rounded-xl bg-blue-400 px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-500"
//                       >
//                         🔗 View Application
//                       </a>
//                     )}

//                     {/* DELETE */}

//                     <div className="mt-3 flex gap-3">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           router.push(
//                             `/pages/admin/scholarship/edit/${scholarship.id}`
//                           )
//                         }
//                         className="flex-1 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center font-semibold text-blue-500 transition hover:bg-blue-100"
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           deleteScholarship(scholarship.id)
//                         }
//                         className="flex-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center font-semibold text-rose-500 transition hover:bg-rose-100"
//                       >
//                         🗑️ Delete
//                       </button>
//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }