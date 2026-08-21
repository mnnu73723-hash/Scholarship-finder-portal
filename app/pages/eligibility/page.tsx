"use client";

import { useState } from "react";

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

export default function EligibilityPage() {
  const [formData, setFormData] = useState({
    state: "",
    category: "",
    course: "",
    year: "",
    percentage: "",
    familyIncome: "",
  });

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          percentage: Number(formData.percentage),
          familyIncome: Number(formData.familyIncome),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to check eligibility.");
        return;
      }

      setScholarships(data.scholarships || []);
      setSearched(true);
    } catch (error) {
      console.error("Eligibility Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080B10]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl">
              🎓
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                Student Portal
              </p>

              <h1 className="text-lg font-bold text-white">
                Eligibility Checker
              </h1>
            </div>

          </div>

        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F15] shadow-2xl">

          {/* Glow */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="grid lg:grid-cols-[1.5fr_0.5fr]">

            <div className="relative p-7 sm:p-10">

              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">

                <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

                Smart Matching

              </div>

              {/* Heading */}

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">

                Check Your Scholarship

                <span className="block text-blue-400">
                  Eligibility
                </span>

              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                Enter your academic and financial details. Our system will
                match your profile with available scholarship opportunities.

              </p>

              {/* Small Info */}

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Matching
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Smart Search
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Results
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Personalized
                  </p>

                </div>

              </div>

            </div>

            {/* Hero Icon */}

            <div className="flex items-center justify-center border-t border-white/10 bg-[#080C12] p-8 lg:border-l lg:border-t-0">

              <div className="text-center">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-400/20 bg-blue-500/10 text-5xl shadow-[0_0_40px_rgba(59,130,246,0.08)]">
                  🔍
                </div>

                <p className="mt-4 text-sm font-semibold text-white">
                  Find Your Match
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Personalized opportunities
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =======================================================
            FORM TITLE
        ======================================================= */}

        <div className="mb-5">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Student Information
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Enter Your Details
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Complete all fields to receive accurate scholarship
            recommendations.
          </p>

        </div>

        {/* =======================================================
            FORM
        ======================================================= */}

        <section className="rounded-2xl border border-white/10 bg-[#0B0F15] p-6 shadow-2xl md:p-8">

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-2"
          >

            {/* STATE */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                State
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
              >

                <option value="">Select State</option>

                <option value="Haryana">Haryana</option>

                <option value="Punjab">Punjab</option>

                <option value="Delhi">Delhi</option>

                <option value="Uttar Pradesh">
                  Uttar Pradesh
                </option>

                <option value="Rajasthan">
                  Rajasthan
                </option>

                <option value="Maharashtra">
                  Maharashtra
                </option>

                <option value="All India">
                  All India
                </option>

              </select>

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
              >

                <option value="">Select Category</option>

                <option value="General">
                  General
                </option>

                <option value="OBC">
                  OBC
                </option>

                <option value="SC">
                  SC
                </option>

                <option value="ST">
                  ST
                </option>

                <option value="EWS">
                  EWS
                </option>

              </select>

            </div>

            {/* COURSE */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
              >

                <option value="">
                  Select Course
                </option>

                <option value="BCA">
                  BCA
                </option>

                <option value="BSc">
                  BSc
                </option>

                <option value="BA">
                  BA
                </option>

                <option value="BCom">
                  BCom
                </option>

                <option value="BTech">
                  BTech
                </option>

                <option value="MBA">
                  MBA
                </option>

                <option value="MCA">
                  MCA
                </option>

              </select>

            </div>

            {/* YEAR */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Current Academic Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
              >

                <option value="">
                  Select Year
                </option>

                <option value="1st Year">
                  1st Year
                </option>

                <option value="2nd Year">
                  2nd Year
                </option>

                <option value="3rd Year">
                  3rd Year
                </option>

                <option value="4th Year">
                  4th Year
                </option>

              </select>

            </div>

            {/* PERCENTAGE */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Academic Percentage
              </label>

              <input
                type="number"
                name="percentage"
                min="0"
                max="100"
                step="0.01"
                placeholder="Example: 72.5"
                value={formData.percentage}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
              />

            </div>

            {/* FAMILY INCOME */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Annual Family Income
              </label>

              <input
                type="number"
                name="familyIncome"
                min="0"
                placeholder="Example: 150000"
                value={formData.familyIncome}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
              />

            </div>

            {/* SUBMIT */}

            <div className="mt-2 md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >

                {loading
                  ? "Checking Eligibility..."
                  : "Check Eligibility"}

              </button>

            </div>

          </form>

        </section>

        {/* =======================================================
            ERROR
        ======================================================= */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-5">

            <div className="flex items-start gap-3">

              <div className="text-red-400">
                ⚠
              </div>

              <div>

                <h3 className="font-semibold text-red-300">
                  Unable to Check Eligibility
                </h3>

                <p className="mt-1 text-sm text-red-400">
                  {error}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* =======================================================
            RESULTS
        ======================================================= */}

        {searched && (

          <section className="mt-10">

            {/* RESULTS HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Results
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Eligible Scholarships
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Scholarships matched with your profile.
                </p>

              </div>

              {scholarships.length > 0 && (

                <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2">

                  <span className="text-sm font-bold text-blue-400">
                    {scholarships.length}
                  </span>

                  <span className="text-sm text-slate-400">
                    Matches Found
                  </span>

                </div>

              )}

            </div>

            {/* ===================================================
                NO RESULTS
            =================================================== */}

            {scholarships.length === 0 ? (

              <div className="rounded-2xl border border-white/10 bg-[#0B0F15] p-12 text-center shadow-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#070A0F] text-4xl">
                  🔎
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  No Matching Scholarships Found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  We could not find a scholarship matching your
                  current details. Try reviewing your information
                  and search again.
                </p>

              </div>

            ) : (

              /* =================================================
                 SCHOLARSHIP CARDS
              ================================================= */

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {scholarships.map((scholarship) => (

                  <article
                    key={scholarship.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F15] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-2xl"
                  >

                    {/* TOP LINE */}

                    <div className="h-1 bg-blue-500" />

                    <div className="p-6">

                      {/* CARD HEADER */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-400">
                            Scholarship
                          </p>

                          <h3 className="mt-2 text-xl font-bold leading-tight text-white">
                            {scholarship.title}
                          </h3>

                          <p className="mt-2 text-sm font-semibold text-slate-400">
                            {scholarship.provider}
                          </p>

                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-xl">
                          🎓
                        </div>

                      </div>

                      {/* AMOUNT */}

                      {scholarship.amount != null && (

                        <div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-500/5 p-4">

                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                            Scholarship Amount
                          </p>

                          <p className="mt-1 text-2xl font-bold text-white">
                            ₹
                            {scholarship.amount.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      )}

                      {/* DESCRIPTION */}

                      {scholarship.description && (

                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                          {scholarship.description}
                        </p>

                      )}

                      <div className="my-5 border-t border-white/10" />

                      {/* DETAILS */}

                      <div className="space-y-3 text-sm">

                        {scholarship.state && (

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              State
                            </span>

                            <span className="text-right font-semibold text-slate-200">
                              {scholarship.state}
                            </span>

                          </div>

                        )}

                        {scholarship.category && (

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Category
                            </span>

                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300">
                              {scholarship.category}
                            </span>

                          </div>

                        )}

                        {scholarship.course && (

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Course
                            </span>

                            <span className="text-right font-semibold text-slate-200">
                              {scholarship.course}
                            </span>

                          </div>

                        )}

                        {scholarship.year && (

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Academic Year
                            </span>

                            <span className="font-semibold text-slate-200">
                              {scholarship.year}
                            </span>

                          </div>

                        )}

                        {scholarship.minPercentage != null && (

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Minimum Score
                            </span>

                            <span className="font-bold text-blue-400">
                              {scholarship.minPercentage}%
                            </span>

                          </div>

                        )}

                        {scholarship.maxIncome != null && (

                          <div className="flex justify-between gap-4">

                            <span className="text-slate-500">
                              Income Limit
                            </span>

                            <span className="font-semibold text-slate-200">
                              ₹
                              {scholarship.maxIncome.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                          </div>

                        )}

                      </div>

                      {/* DEADLINE */}

                      {scholarship.deadline && (

                        <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-500/5 px-4 py-3">

                          <p className="text-xs font-semibold text-amber-400">
                            Application Deadline
                          </p>

                          <p className="mt-1 text-sm font-bold text-amber-300">
                            {new Date(
                              scholarship.deadline
                            ).toLocaleDateString("en-IN")}
                          </p>

                        </div>

                      )}

                      {/* APPLY BUTTON */}

                      {scholarship.applicationLink && (

                        <a
                          href={scholarship.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                          Apply Now →
                        </a>

                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        )}

      </main>

    </div>
  );
}