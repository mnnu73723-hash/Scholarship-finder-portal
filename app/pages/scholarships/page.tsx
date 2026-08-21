"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Heart,
  Sparkles,
  X,
  ArrowUpRight,
} from "lucide-react";

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

function daysLeft(deadline?: string) {
  if (!deadline) return null;

  return Math.ceil(
    (new Date(deadline).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );
}

function stampColor(days: number | null) {
  if (days === null) return "border-zinc-700 text-zinc-500";
  if (days < 0) return "border-zinc-700 text-zinc-500";
  if (days <= 7) return "border-red-500 text-red-400";
  if (days <= 30) return "border-yellow-500 text-yellow-400";

  return "border-sky-400 text-sky-300";
}

const CATEGORY_COLOR: Record<string, string> = {
  General: "#71717A",
  OBC: "#EAB308",
  SC: "#818CF8",
  ST: "#38BDF8",
  EWS: "#EF4444",
};

export default function Scholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [eligibleLoading, setEligibleLoading] = useState(false);
  const [error, setError] = useState("");
  const [eligibleMode, setEligibleMode] = useState(false);

  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    fetchScholarships();
    fetchSavedScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/scholarships");
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load scholarships.");
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

  const fetchSavedScholarships = async () => {
    try {
      const res = await fetch("/api/saved-scholarships");

      if (!res.ok) return;

      const data = await res.json();

      if (data.success && data.savedScholarships) {
        const ids = data.savedScholarships.map(
          (item: { scholarshipId: string }) =>
            item.scholarshipId
        );

        setSavedIds(ids);
      }
    } catch (error) {
      console.error("Fetch Saved Scholarships Error:", error);
    }
  };

  const findEligibleScholarships = async () => {
    try {
      setEligibleLoading(true);
      setError("");

      const res = await fetch("/api/scholarships/eligible");
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message || "Unable to find eligible scholarships."
        );
        return;
      }

      setScholarships(data.scholarships || []);
      setEligibleMode(true);

      setSearch("");
      setState("");
      setCategory("");
      setCourse("");
    } catch (error) {
      console.error("Eligibility Error:", error);
      setError("Unable to check eligibility.");
    } finally {
      setEligibleLoading(false);
    }
  };

  const showAllScholarships = async () => {
    setEligibleMode(false);

    setSearch("");
    setState("");
    setCategory("");
    setCourse("");

    await fetchScholarships();
  };

  const handleSaveScholarship = async (
    scholarshipId: string
  ) => {
    try {
      setSavingId(scholarshipId);

      const isSaved = savedIds.includes(scholarshipId);

      const res = await fetch("/api/saved-scholarships", {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scholarshipId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      if (isSaved) {
        setSavedIds(
          savedIds.filter((id) => id !== scholarshipId)
        );
      } else {
        setSavedIds([...savedIds, scholarshipId]);
      }
    } catch (error) {
      console.error("Save Scholarship Error:", error);
      alert("Unable to save scholarship.");
    } finally {
      setSavingId(null);
    }
  };

  const handleApplyScholarship = async (
    scholarship: Scholarship
  ) => {
    try {
      setApplyingId(scholarship.id);

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scholarshipId: scholarship.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message || "Unable to save application."
        );
        return;
      }

      alert("Application saved successfully! ✅");

      if (scholarship.applicationLink) {
        window.open(
          scholarship.applicationLink,
          "_blank"
        );
      }
    } catch (error) {
      console.error("Application Error:", error);
      alert("Unable to save application.");
    } finally {
      setApplyingId(null);
    }
  };

  const filteredScholarships = scholarships.filter(
    (scholarship) => {
      const matchesSearch =
        scholarship.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        scholarship.provider
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesState =
        !state ||
        !scholarship.state ||
        scholarship.state === state;

      const matchesCategory =
        !category ||
        !scholarship.category ||
        scholarship.category === category;

      const matchesCourse =
        !course ||
        !scholarship.course ||
        scholarship.course === course;

      return (
        matchesSearch &&
        matchesState &&
        matchesCategory &&
        matchesCourse
      );
    }
  );

  const hasActiveFilters =
    search || state || category || course;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HEADER ================= */}

      <div className="relative overflow-hidden border-b border-zinc-800 bg-black px-4 py-12 sm:px-6">

        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-sky-300">
              Scholarship Registry · 2026
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Scholarship Finder
            </h1>

            <div className="mt-4 h-px w-20 bg-sky-300" />

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
              A curated register of government and
              institutional scholarships, matched to your
              education, state, and eligibility.
            </p>

          </div>

          <div className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-4 shadow-2xl">

            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Active Listings
            </p>

            <p className="mt-1 text-3xl font-bold tabular-nums text-sky-300">
              {String(scholarships.length).padStart(3, "0")}
            </p>

          </div>

        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

        {/* ================= ELIGIBILITY ================= */}

        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="rounded-lg border border-sky-400/20 bg-sky-400/10 p-2">

              <Sparkles
                size={18}
                className="text-sky-300"
              />

            </div>

            <div>

              <h2 className="text-base font-semibold text-white">
                Find scholarships for you
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                We'll cross-check your saved profile against
                the registry.
              </p>

            </div>

          </div>

          <div className="flex shrink-0 gap-2">

            {/* LIGHT BLUE BUTTON */}

            <button
              onClick={findEligibleScholarships}
              disabled={eligibleLoading}
              className="rounded-lg bg-sky-300 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
            >
              {eligibleLoading
                ? "Checking..."
                : "Check Eligibility"}
            </button>

            {eligibleMode && (
              <button
                onClick={showAllScholarships}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                Show All
              </button>
            )}

          </div>

        </div>

        {/* ================= ELIGIBILITY ACTIVE ================= */}

        {eligibleMode && (
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-sky-400/20 bg-sky-400/5 px-4 py-3 text-sm font-medium text-sky-300">

            <Sparkles size={16} />

            Showing scholarships matched to your student
            profile

          </div>
        )}

        {/* ================= FILTERS ================= */}

        {!eligibleMode && (
          <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl">

            <div className="mb-5 flex items-center gap-2">

              <Search
                size={16}
                className="text-sky-300"
              />

              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Search & Filter
              </h2>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* SEARCH */}

              <div>

                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Search
                </label>

                <div className="relative">

                  <Search
                    size={14}
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    type="text"
                    placeholder="Title or provider..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full border-b border-zinc-700 bg-transparent py-2 pl-6 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-300"
                  />

                </div>

              </div>

              {/* STATE */}

              <div>

                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  State
                </label>

                <select
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                  className="w-full border-b border-zinc-700 bg-transparent py-2 text-sm text-zinc-300 outline-none focus:border-sky-300"
                >

                  <option
                    value=""
                    className="bg-zinc-900"
                  >
                    All States
                  </option>

                  <option
                    value="Haryana"
                    className="bg-zinc-900"
                  >
                    Haryana
                  </option>

                  <option
                    value="Punjab"
                    className="bg-zinc-900"
                  >
                    Punjab
                  </option>

                  <option
                    value="Delhi"
                    className="bg-zinc-900"
                  >
                    Delhi
                  </option>

                  <option
                    value="Rajasthan"
                    className="bg-zinc-900"
                  >
                    Rajasthan
                  </option>

                  <option
                    value="Uttar Pradesh"
                    className="bg-zinc-900"
                  >
                    Uttar Pradesh
                  </option>

                  <option
                    value="Maharashtra"
                    className="bg-zinc-900"
                  >
                    Maharashtra
                  </option>

                </select>

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full border-b border-zinc-700 bg-transparent py-2 text-sm text-zinc-300 outline-none focus:border-sky-300"
                >

                  <option
                    value=""
                    className="bg-zinc-900"
                  >
                    All Categories
                  </option>

                  <option
                    value="General"
                    className="bg-zinc-900"
                  >
                    General
                  </option>

                  <option
                    value="OBC"
                    className="bg-zinc-900"
                  >
                    OBC
                  </option>

                  <option
                    value="SC"
                    className="bg-zinc-900"
                  >
                    SC
                  </option>

                  <option
                    value="ST"
                    className="bg-zinc-900"
                  >
                    ST
                  </option>

                  <option
                    value="EWS"
                    className="bg-zinc-900"
                  >
                    EWS
                  </option>

                </select>

              </div>

              {/* COURSE */}

              <div>

                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Course
                </label>

                <select
                  value={course}
                  onChange={(e) =>
                    setCourse(e.target.value)
                  }
                  className="w-full border-b border-zinc-700 bg-transparent py-2 text-sm text-zinc-300 outline-none focus:border-sky-300"
                >

                  <option
                    value=""
                    className="bg-zinc-900"
                  >
                    All Courses
                  </option>

                  <option
                    value="BCA"
                    className="bg-zinc-900"
                  >
                    BCA
                  </option>

                  <option
                    value="B.Tech"
                    className="bg-zinc-900"
                  >
                    B.Tech
                  </option>

                  <option
                    value="B.Sc"
                    className="bg-zinc-900"
                  >
                    B.Sc
                  </option>

                  <option
                    value="B.Com"
                    className="bg-zinc-900"
                  >
                    B.Com
                  </option>

                  <option
                    value="BA"
                    className="bg-zinc-900"
                  >
                    BA
                  </option>

                  <option
                    value="MCA"
                    className="bg-zinc-900"
                  >
                    MCA
                  </option>

                  <option
                    value="MBA"
                    className="bg-zinc-900"
                  >
                    MBA
                  </option>

                </select>

              </div>

            </div>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setState("");
                  setCategory("");
                  setCourse("");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-red-400"
              >
                <X size={13} />
                Clear filters
              </button>
            )}

          </div>
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading && !eligibleMode && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center">

            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-zinc-800 border-t-sky-300" />

            <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
              Loading registry...
            </p>

          </div>
        )}

        {/* ================= RESULT COUNT ================= */}

        {!loading && !error && (
          <div className="mb-5 flex items-center justify-between">

            <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
              Showing{" "}
              {String(
                filteredScholarships.length
              ).padStart(3, "0")}{" "}
              {filteredScholarships.length === 1
                ? "entry"
                : "entries"}
            </p>

            <div className="ml-5 h-px flex-1 bg-zinc-900" />

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading &&
          filteredScholarships.length === 0 &&
          !error && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">

                <Search
                  size={20}
                  className="text-zinc-600"
                />

              </div>

              <h2 className="text-lg font-semibold text-white">
                No scholarships found
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Try changing your filters or complete your
                student profile.
              </p>

            </div>
          )}

        {/* ================= SCHOLARSHIP CARDS ================= */}

        {!loading &&
          filteredScholarships.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredScholarships.map(
                (scholarship) => {

                  const days = daysLeft(
                    scholarship.deadline
                  );

                  const isSaved =
                    savedIds.includes(
                      scholarship.id
                    );

                  const accent =
                    (scholarship.category &&
                      CATEGORY_COLOR[
                        scholarship.category
                      ]) || "#38BDF8";

                  const refCode =
                    scholarship.id
                      .slice(-6)
                      .toUpperCase();

                  return (
                    <div
                      key={scholarship.id}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl"
                    >

                      {/* TOP ACCENT */}

                      <div
                        className="absolute left-0 right-0 top-0 h-0.5 opacity-90"
                        style={{
                          backgroundColor: accent,
                        }}
                      />

                      {/* DEADLINE */}

                      {scholarship.deadline && (
                        <div
                          className={`absolute -right-2 -top-2 flex h-14 w-14 rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed bg-zinc-950 text-center ${stampColor(
                            days
                          )}`}
                        >

                          <span className="font-mono text-[11px] font-bold leading-none">
                            {days !== null &&
                            days >= 0
                              ? days
                              : "—"}
                          </span>

                          <span className="mt-1 font-mono text-[7px] uppercase leading-none">
                            {days !== null &&
                            days >= 0
                              ? "days left"
                              : "closed"}
                          </span>

                        </div>
                      )}

                      {/* REF + SAVE */}

                      <div className="mb-3 flex items-center justify-between pr-8">

                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                          Ref · {refCode}
                        </span>

                        <button
                          onClick={() =>
                            handleSaveScholarship(
                              scholarship.id
                            )
                          }
                          disabled={
                            savingId ===
                            scholarship.id
                          }
                          aria-label={
                            isSaved
                              ? "Unsave"
                              : "Save"
                          }
                          className={`rounded-full border border-zinc-800 bg-zinc-900 p-2 transition ${
                            isSaved
                              ? "text-red-400"
                              : "text-zinc-600 hover:text-red-400"
                          }`}
                        >
                          <Heart
                            size={15}
                            fill={
                              isSaved
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                      </div>

                      {/* TITLE */}

                      <h2 className="line-clamp-2 text-lg font-bold leading-snug text-white">
                        {scholarship.title}
                      </h2>

                      {/* PROVIDER */}

                      <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-sky-300">
                        {scholarship.provider}
                      </p>

                      {/* DESCRIPTION */}

                      {scholarship.description && (
                        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                          {scholarship.description}
                        </p>
                      )}

                      {/* META */}

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-zinc-900 pt-3 font-mono text-[11px] text-zinc-500">

                        {scholarship.state && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin
                              size={11}
                              className="text-zinc-600"
                            />
                            {scholarship.state}
                          </span>
                        )}

                        {scholarship.category && (
                          <span>
                            Cat.{" "}
                            {scholarship.category}
                          </span>
                        )}

                        {scholarship.minPercentage !=
                          null && (
                          <span className="inline-flex items-center gap-1">
                            <TrendingUp
                              size={11}
                              className="text-zinc-600"
                            />

                            {scholarship.minPercentage}%
                            +
                          </span>
                        )}

                      </div>

                      {/* COURSE */}

                      {scholarship.course && (
                        <div className="mt-3">

                          <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                            {scholarship.course}
                          </span>

                        </div>
                      )}

                      {/* AMOUNT */}

                      {scholarship.amount != null && (
                        <div className="mt-4 flex items-end justify-between border-t border-zinc-900 pt-4">

                          <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                            Award Amount
                          </span>

                          <span className="font-mono text-xl font-bold tabular-nums text-white">
                            ₹
                            {scholarship.amount.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>
                      )}

                      {/* APPLY BUTTON */}

                      <div className="mt-5">

                        {scholarship.applicationLink ? (
                          <button
                            onClick={() =>
                              handleApplyScholarship(
                                scholarship
                              )
                            }
                            disabled={
                              applyingId ===
                              scholarship.id
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-300 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
                          >
                            {applyingId ===
                            scholarship.id ? (
                              "Saving..."
                            ) : (
                              <>
                                Apply Now
                                <ArrowUpRight
                                  size={14}
                                />
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-600"
                          >
                            No application link
                          </button>
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

      </div>
    </div>
  );
}