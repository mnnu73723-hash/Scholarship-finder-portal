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
      "Are you sure you want to delete this scholarship?"
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
  // CHECKING ADMIN
  // =========================

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-10 py-8 text-center shadow-md">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-400"></div>

          <p className="text-lg font-semibold text-slate-700">
            Checking admin access...
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 p-6 text-white shadow-md sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center rounded-full bg-white/25 px-4 py-1.5 text-sm font-medium">
                🎓 Admin Panel
              </div>

              <h1 className="text-3xl font-extrabold sm:text-4xl">
                Scholarship Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-blue-50 sm:text-base">
                Manage and organize all scholarships available on the
                Scholarship Finder Portal.
              </p>

            </div>

            <button
              onClick={() =>
                router.push("/pages/admin/scholarship/add")
              }
              className="rounded-xl bg-white px-6 py-3 font-bold text-blue-600 shadow-sm transition hover:bg-blue-50 hover:shadow-md"
            >
              + Add Scholarship
            </button>

          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* TOTAL */}

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Scholarships
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-blue-500">
                  {scholarships.length}
                </h2>

              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-2xl">
                🎓
              </div>

            </div>

          </div>

          {/* AVAILABLE */}

          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Available
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-emerald-500">
                  {scholarships.length}
                </h2>

              </div>

              <div className="rounded-xl bg-emerald-50 p-4 text-2xl">
                ✅
              </div>

            </div>

          </div>

          {/* STATUS */}

          <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Portal Status
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-violet-500">
                  Active
                </h2>

              </div>

              <div className="rounded-xl bg-violet-50 p-4 text-2xl">
                🚀
              </div>

            </div>

          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">

            <p className="font-bold">
              ⚠️ Something went wrong
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>

          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-400"></div>

            <p className="font-semibold text-slate-600">
              Loading scholarships...
            </p>

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading &&
          !error &&
          scholarships.length === 0 && (

            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
                🎓
              </div>

              <h2 className="text-2xl font-bold text-slate-700">
                No Scholarships Found
              </h2>

              <p className="mt-2 text-slate-400">
                Start by adding your first scholarship.
              </p>

              <button
                onClick={() =>
                  router.push(
                    "/pages/admin/scholarship/add"
                  )
                }
                className="mt-6 rounded-xl bg-blue-400 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-500"
              >
                + Add Scholarship
              </button>

            </div>
          )}

        {/* ================= SCHOLARSHIPS ================= */}

        {!loading && scholarships.length > 0 && (
          <div>

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-slate-700">
                  All Scholarships
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Manage scholarship information below.
                </p>

              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {scholarships.length} Available
              </span>

            </div>

            {/* CARD GRID */}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {scholarships.map((scholarship) => (

                <div
                  key={scholarship.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* CARD TOP */}

                  <div className="h-1.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>

                  <div className="p-6">

                    {/* TITLE */}

                    <div className="mb-4 flex items-start justify-between gap-3">

                      <div>

                        <h2 className="text-xl font-extrabold leading-tight text-slate-700">
                          {scholarship.title}
                        </h2>

                        <p className="mt-2 font-semibold text-blue-500">
                          {scholarship.provider}
                        </p>

                      </div>

                      <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-500">
                        SCHOLARSHIP
                      </span>

                    </div>

                    {/* DESCRIPTION */}

                    {scholarship.description && (
                      <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-500">
                        {scholarship.description}
                      </p>
                    )}

                    {/* INFORMATION */}

                    <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm">

                      {scholarship.state && (
                        <div className="flex items-center justify-between gap-3">

                          <span className="font-medium text-slate-500">
                            📍 State
                          </span>

                          <span className="font-semibold text-slate-700">
                            {scholarship.state}
                          </span>

                        </div>
                      )}

                      {scholarship.category && (
                        <div className="flex items-center justify-between gap-3">

                          <span className="font-medium text-slate-500">
                            🏷️ Category
                          </span>

                          <span className="rounded-full bg-violet-50 px-3 py-1 font-semibold text-violet-600">
                            {scholarship.category}
                          </span>

                        </div>
                      )}

                      {scholarship.course && (
                        <div className="flex items-center justify-between gap-3">

                          <span className="font-medium text-slate-500">
                            📚 Course
                          </span>

                          <span className="font-semibold text-slate-700">
                            {scholarship.course}
                          </span>

                        </div>
                      )}

                      {scholarship.year && (
                        <div className="flex items-center justify-between gap-3">

                          <span className="font-medium text-slate-500">
                            📅 Year
                          </span>

                          <span className="font-semibold text-slate-700">
                            {scholarship.year}
                          </span>

                        </div>
                      )}

                      {scholarship.minPercentage != null && (
                        <div className="flex items-center justify-between gap-3">

                          <span className="font-medium text-slate-500">
                            📊 Minimum %
                          </span>

                          <span className="font-bold text-emerald-500">
                            {scholarship.minPercentage}%
                          </span>

                        </div>
                      )}

                      {scholarship.maxIncome != null && (
                        <div className="flex items-center justify-between gap-3">

                          <span className="font-medium text-slate-500">
                            💰 Max Income
                          </span>

                          <span className="font-bold text-orange-400">
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
                      <div className="mt-5 rounded-xl bg-emerald-50 p-4">

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Scholarship Amount
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                          ₹
                          {scholarship.amount.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>
                    )}

                    {/* DEADLINE */}

                    {scholarship.deadline && (
                      <div className="mt-4 flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3">

                        <span className="text-sm font-medium text-slate-500">
                          ⏰ Deadline
                        </span>

                        <span className="text-sm font-bold text-rose-500">
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
                        className="mt-5 block rounded-xl bg-blue-400 px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-500"
                      >
                        🔗 View Application
                      </a>
                    )}

                    {/* DELETE */}

                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/pages/admin/scholarship/edit/${scholarship.id}`
                          )
                        }
                        className="flex-1 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center font-semibold text-blue-500 transition hover:bg-blue-100"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          deleteScholarship(scholarship.id)
                        }
                        className="flex-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center font-semibold text-rose-500 transition hover:bg-rose-100"
                      >
                        🗑️ Delete
                      </button>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}