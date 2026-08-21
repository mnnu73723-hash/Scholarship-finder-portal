"use client";

import { useState } from "react";

export default function AddScholarshipPage() {
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    description: "",
    state: "",
    category: "",
    course: "",
    year: "",
    minPercentage: "",
    maxIncome: "",
    amount: "",
    deadline: "",
    applicationLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to add scholarship.");
        return;
      }

      setMessage("Scholarship added successfully! ✅");

      setFormData({
        title: "",
        provider: "",
        description: "",
        state: "",
        category: "",
        course: "",
        year: "",
        minPercentage: "",
        maxIncome: "",
        amount: "",
        deadline: "",
        applicationLink: "",
      });
    } catch (error) {
      console.error("Add Scholarship Error:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10";

  const selectClass =
    "w-full rounded-xl border border-white/10 bg-[#070A0F] px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-300";

  return (
    <div className="min-h-screen bg-[#05070A] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-white/10 bg-[#080B10]">

        <div className="mx-auto flex max-w-6xl items-center px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl shadow-lg">
              🎓
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                Admin Portal
              </p>

              <h1 className="text-xl font-bold text-white">
                Add Scholarship
              </h1>
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ===================================================
            PAGE INTRO
        =================================================== */}

        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F15] shadow-2xl">

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative p-7 sm:p-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">

              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

              Scholarship Management

            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">

              Add New

              <span className="block text-blue-400">
                Scholarship
              </span>

            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Add scholarship information to the Scholarship Finder
              Portal. Students will be able to discover and check
              their eligibility for this scholarship.
            </p>

          </div>

        </section>

        {/* ===================================================
            FORM
        =================================================== */}

        <section className="rounded-2xl border border-white/10 bg-[#0B0F15] p-6 shadow-2xl md:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div>

              <div className="mb-5 border-b border-white/10 pb-4">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Section 01
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the main scholarship details.
                </p>

              </div>

              <div className="space-y-5">

                {/* TITLE */}

                <div>

                  <label className={labelClass}>
                    Scholarship Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter scholarship title"
                    className={inputClass}
                    required
                  />

                </div>

                {/* PROVIDER */}

                <div>

                  <label className={labelClass}>
                    Provider
                  </label>

                  <input
                    type="text"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    placeholder="Government / Organization / Trust"
                    className={inputClass}
                    required
                  />

                </div>

                {/* DESCRIPTION */}

                <div>

                  <label className={labelClass}>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter scholarship description..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                ELIGIBILITY
            ================================================= */}

            <div>

              <div className="mb-5 border-b border-white/10 pb-4">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Section 02
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Eligibility Criteria
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Define who can apply for this scholarship.
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* STATE */}

                <div>

                  <label className={labelClass}>
                    State
                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={selectClass}
                    required
                  >

                    <option value="">
                      Select State
                    </option>

                    <option value="Haryana">
                      Haryana
                    </option>

                    <option value="Punjab">
                      Punjab
                    </option>

                    <option value="Delhi">
                      Delhi
                    </option>

                    <option value="Rajasthan">
                      Rajasthan
                    </option>

                    <option value="Uttar Pradesh">
                      Uttar Pradesh
                    </option>

                    <option value="Maharashtra">
                      Maharashtra
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* CATEGORY */}

                <div>

                  <label className={labelClass}>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={selectClass}
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

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

                  <label className={labelClass}>
                    Course
                  </label>

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={selectClass}
                    required
                  >

                    <option value="">
                      Select Course
                    </option>

                    <option value="BCA">
                      BCA
                    </option>

                    <option value="B.Tech">
                      B.Tech
                    </option>

                    <option value="B.Sc">
                      B.Sc
                    </option>

                    <option value="B.Com">
                      B.Com
                    </option>

                    <option value="BA">
                      BA
                    </option>

                    <option value="MCA">
                      MCA
                    </option>

                    <option value="MBA">
                      MBA
                    </option>

                  </select>

                </div>

                {/* YEAR */}

                <div>

                  <label className={labelClass}>
                    Academic Year
                  </label>

                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={selectClass}
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

              </div>

            </div>

            {/* =================================================
                FINANCIAL & ACADEMIC
            ================================================= */}

            <div>

              <div className="mb-5 border-b border-white/10 pb-4">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Section 03
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Academic & Financial Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add percentage, income and award information.
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                {/* PERCENTAGE */}

                <div>

                  <label className={labelClass}>
                    Minimum Percentage
                  </label>

                  <input
                    type="number"
                    name="minPercentage"
                    value={formData.minPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="Example: 60"
                    className={inputClass}
                  />

                </div>

                {/* INCOME */}

                <div>

                  <label className={labelClass}>
                    Maximum Family Income
                  </label>

                  <input
                    type="number"
                    name="maxIncome"
                    value={formData.maxIncome}
                    onChange={handleChange}
                    min="0"
                    placeholder="Example: 250000"
                    className={inputClass}
                  />

                </div>

                {/* AMOUNT */}

                <div>

                  <label className={labelClass}>
                    Scholarship Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="0"
                    placeholder="Example: 20000"
                    className={inputClass}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                APPLICATION
            ================================================= */}

            <div>

              <div className="mb-5 border-b border-white/10 pb-4">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                  Section 04
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add deadline and official application link.
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* DEADLINE */}

                <div>

                  <label className={labelClass}>
                    Application Deadline
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>

                {/* APPLICATION LINK */}

                <div>

                  <label className={labelClass}>
                    Application Link
                  </label>

                  <input
                    type="url"
                    name="applicationLink"
                    value={formData.applicationLink}
                    onChange={handleChange}
                    placeholder="https://example.com/apply"
                    className={inputClass}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            {message && (

              <div
                className={`rounded-xl border p-4 text-center text-sm font-medium ${
                  message.includes("successfully")
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
                    : "border-red-400/20 bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>

            )}

            {/* =================================================
                SUBMIT
            ================================================= */}

            <div className="border-t border-white/10 pt-6">

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >

                {loading
                  ? "Adding Scholarship..."
                  : "Add Scholarship"}

              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}