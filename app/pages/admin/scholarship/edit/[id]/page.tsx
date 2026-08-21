"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// =========================
// ICON
// =========================

const Icon = ({
  name,
  size = 20,
}: {
  name:
    | "graduation"
    | "arrow"
    | "save"
    | "back"
    | "building"
    | "file"
    | "location"
    | "users"
    | "book"
    | "calendar"
    | "percent"
    | "money"
    | "link"
    | "check"
    | "alert";
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

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "save":
      return (
        <svg {...common}>
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
          <path d="M17 21v-8H7v8" />
          <path d="M7 3v5h8" />
        </svg>
      );

    case "back":
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );

    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
          <path d="M2 21h20" />
          <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8M8 17h6" />
        </svg>
      );

    case "location":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
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

    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
          <path d="M4 5.5V21" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );

    case "percent":
      return (
        <svg {...common}>
          <path d="M19 5 5 19" />
          <circle cx="7" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );

    case "money":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10" />
          <path d="M15 9.5c-.7-.8-1.7-1.2-3-1.2-1.7 0-3 1-3 2.3 0 3.3 6 1.5 6 4.6 0 1.3-1.3 2.3-3 2.3-1.3 0-2.4-.4-3.1-1.2" />
        </svg>
      );

    case "link":
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1-1" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "alert":
      return (
        <svg {...common}>
          <path d="M10.3 3.3 2.2 17a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );

    default:
      return null;
  }
};

export default function EditScholarshipPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">(
    ""
  );

  // =========================
  // FETCH SCHOLARSHIP
  // =========================

  useEffect(() => {
    if (!id) return;

    fetch(`/api/scholarships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const s = data.scholarship;

          setFormData({
            title: s.title || "",
            provider: s.provider || "",
            description: s.description || "",
            state: s.state || "",
            category: s.category || "",
            course: s.course || "",
            year: s.year || "",
            minPercentage: s.minPercentage?.toString() || "",
            maxIncome: s.maxIncome?.toString() || "",
            amount: s.amount?.toString() || "",
            deadline: s.deadline
              ? s.deadline.split("T")[0]
              : "",
            applicationLink: s.applicationLink || "",
          });
        } else {
          setMessage("Unable to load scholarship details.");
          setMessageType("error");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setMessage("Unable to load scholarship details.");
        setMessageType("error");
        setLoading(false);
      });
  }, [id]);

  // =========================
  // HANDLE CHANGE
  // =========================

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

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch(
        `/api/scholarships/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error ||
            data.message ||
            "Failed to update scholarship."
        );

        setMessageType("error");
        return;
      }

      setMessage(
        "Scholarship updated successfully!"
      );

      setMessageType("success");

      setTimeout(() => {
        router.push(
          "/pages/admin/scholarship"
        );
      }, 1200);
    } catch (error) {
      console.error("Edit Error:", error);

      setMessage(
        "Network error. Please try again."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-10 text-center shadow-2xl shadow-black/50">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Admin Portal
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Loading Scholarship
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Please wait while scholarship details are loaded.
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // MAIN
  // =========================

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =========================
          HEADER
      ========================= */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-[76px] items-center justify-between gap-4">

            {/* BRAND */}

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon name="graduation" size={23} />
              </div>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
                  Administration
                </p>

                <h1 className="text-base font-bold text-white sm:text-lg">
                  Edit Scholarship
                </h1>

              </div>

            </div>

            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/pages/admin/scholarship"
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
            >
              <Icon name="back" size={18} />

              <span className="hidden sm:inline">
                Back
              </span>
            </button>

          </div>

        </div>

      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* PAGE INTRO */}

        <div className="mb-8">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">

            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
              Scholarship Management
            </span>

          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Update Scholarship
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Update the scholarship information, eligibility
            requirements and application details below.
          </p>

        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">

          {/* CARD HEADER */}

          <div className="border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent px-6 py-6 sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon name="file" size={23} />
              </div>

              <div>

                <h3 className="text-lg font-bold text-white">
                  Scholarship Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Modify the details of this scholarship.
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8"
          >

            {/* =========================
                BASIC INFORMATION
            ========================= */}

            <div className="mb-8">

              <div className="mb-5 flex items-center gap-3">

                <div className="h-8 w-1 rounded-full bg-blue-500" />

                <div>

                  <h3 className="text-base font-bold text-white">
                    Basic Information
                  </h3>

                  <p className="text-xs text-slate-500">
                    Scholarship title and organization details
                  </p>

                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* TITLE */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Scholarship Title
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="graduation" size={18} />
                    </div>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter scholarship title"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-blue-500/[0.03] focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>

                </div>

                {/* PROVIDER */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Provider / Organization
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="building" size={18} />
                    </div>

                    <input
                      type="text"
                      name="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      placeholder="Government / Organization / Trust"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-blue-500/[0.03] focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Description
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-4 text-slate-600">
                      <Icon name="file" size={18} />
                    </div>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Enter detailed scholarship description..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-blue-500/[0.03] focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* DIVIDER */}

            <div className="mb-8 border-t border-white/10" />

            {/* =========================
                ELIGIBILITY
            ========================= */}

            <div className="mb-8">

              <div className="mb-5 flex items-center gap-3">

                <div className="h-8 w-1 rounded-full bg-cyan-500" />

                <div>

                  <h3 className="text-base font-bold text-white">
                    Eligibility Details
                  </h3>

                  <p className="text-xs text-slate-500">
                    Define who can apply for this scholarship
                  </p>

                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* STATE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    State
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="location" size={18} />
                    </div>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Example: Haryana"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* CATEGORY */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Category
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="users" size={18} />
                    </div>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option
                        value=""
                        className="bg-slate-950"
                      >
                        Any Category
                      </option>

                      <option
                        value="General"
                        className="bg-slate-950"
                      >
                        General
                      </option>

                      <option
                        value="OBC"
                        className="bg-slate-950"
                      >
                        OBC
                      </option>

                      <option
                        value="SC"
                        className="bg-slate-950"
                      >
                        SC
                      </option>

                      <option
                        value="ST"
                        className="bg-slate-950"
                      >
                        ST
                      </option>

                      <option
                        value="EWS"
                        className="bg-slate-950"
                      >
                        EWS
                      </option>

                    </select>

                  </div>

                </div>

                {/* COURSE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Course
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="book" size={18} />
                    </div>

                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      placeholder="Example: BCA"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* YEAR */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Eligible Year
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="calendar" size={18} />
                    </div>

                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="Example: 2nd Year"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* MIN PERCENTAGE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Minimum Percentage
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="percent" size={18} />
                    </div>

                    <input
                      type="number"
                      name="minPercentage"
                      value={formData.minPercentage}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="Example: 60"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* MAX INCOME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Maximum Family Income
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="money" size={18} />
                    </div>

                    <input
                      type="number"
                      name="maxIncome"
                      value={formData.maxIncome}
                      onChange={handleChange}
                      min="0"
                      placeholder="Example: 250000"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* DIVIDER */}

            <div className="mb-8 border-t border-white/10" />

            {/* =========================
                APPLICATION DETAILS
            ========================= */}

            <div className="mb-8">

              <div className="mb-5 flex items-center gap-3">

                <div className="h-8 w-1 rounded-full bg-emerald-500" />

                <div>

                  <h3 className="text-base font-bold text-white">
                    Application Details
                  </h3>

                  <p className="text-xs text-slate-500">
                    Funding, deadline and application information
                  </p>

                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* AMOUNT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Scholarship Amount
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">
                      <Icon name="money" size={18} />
                    </div>

                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      min="0"
                      placeholder="Example: 20000"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                </div>

                {/* DEADLINE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Application Deadline
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amber-500">
                      <Icon name="calendar" size={18} />
                    </div>

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
                    />

                  </div>

                </div>

                {/* LINK */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Application Link
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Icon name="link" size={18} />
                    </div>

                    <input
                      type="url"
                      name="applicationLink"
                      value={formData.applicationLink}
                      onChange={handleChange}
                      placeholder="https://example.com/apply"
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =========================
                MESSAGE
            ========================= */}

            {message && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${
                  messageType === "success"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/20 bg-red-500/10 text-red-300"
                }`}
              >

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    messageType === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  <Icon
                    name={
                      messageType === "success"
                        ? "check"
                        : "alert"
                    }
                    size={18}
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    {messageType === "success"
                      ? "Update Successful"
                      : "Update Failed"}
                  </p>

                  <p className="mt-0.5 text-xs opacity-80">
                    {message}
                  </p>

                </div>

              </div>
            )}

            {/* =========================
                ACTIONS
            ========================= */}

            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/pages/admin/scholarship"
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 hover:shadow-blue-900/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >

                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Icon name="save" size={18} />
                    Update Scholarship
                    <Icon name="arrow" size={17} />
                  </>
                )}

              </button>

            </div>

          </form>

        </section>

        {/* FOOTER NOTE */}

        <div className="mt-6 flex items-center justify-center gap-2 text-center">

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <p className="text-xs text-slate-600">
            Changes will be reflected across the Scholarship Finder Portal.
          </p>

        </div>

      </main>

      {/* FOOTER */}

      <footer className="mt-8 border-t border-white/10 bg-slate-950">

        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">

          <p className="text-xs text-slate-600">
            Scholarship Finder Portal • Admin Management
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            System Operational

          </div>

        </div>

      </footer>

    </div>
  );
}