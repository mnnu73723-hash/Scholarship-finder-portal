"use client";

import { useEffect, useState } from "react";

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

export default function Scholarships() {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>([]);

  const [loading, setLoading] = useState(true);
  const [eligibleLoading, setEligibleLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [eligibleMode, setEligibleMode] =
    useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");

  // Saved scholarships
  const [savedIds, setSavedIds] = useState<string[]>(
    []
  );

  const [savingId, setSavingId] =
    useState<string | null>(null);

  // Application
  const [applyingId, setApplyingId] =
    useState<string | null>(null);

  // ------------------------------------------
  // Initial Fetch
  // ------------------------------------------

  useEffect(() => {
    fetchScholarships();
    fetchSavedScholarships();
  }, []);

  // ------------------------------------------
  // Fetch all scholarships
  // ------------------------------------------

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/scholarships"
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Failed to load scholarships."
        );
        return;
      }

      setScholarships(
        data.scholarships || []
      );
    } catch (error) {
      console.error(
        "Scholarship Fetch Error:",
        error
      );

      setError(
        "Unable to load scholarships."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // Fetch saved scholarships
  // ------------------------------------------

  const fetchSavedScholarships =
    async () => {
      try {
        const res = await fetch(
          "/api/saved-scholarships"
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        if (
          data.success &&
          data.savedScholarships
        ) {
          const ids =
            data.savedScholarships.map(
              (item: {
                scholarshipId: string;
              }) => item.scholarshipId
            );

          setSavedIds(ids);
        }
      } catch (error) {
        console.error(
          "Fetch Saved Scholarships Error:",
          error
        );
      }
    };

  // ------------------------------------------
  // Find eligible scholarships
  // ------------------------------------------

  const findEligibleScholarships =
    async () => {
      try {
        setEligibleLoading(true);
        setError("");

        const res = await fetch(
          "/api/scholarships/eligible"
        );

        const data = await res.json();

        if (!res.ok) {
          setError(
            data.message ||
              "Unable to find eligible scholarships."
          );
          return;
        }

        setScholarships(
          data.scholarships || []
        );

        setEligibleMode(true);

        // Clear filters
        setSearch("");
        setState("");
        setCategory("");
        setCourse("");
      } catch (error) {
        console.error(
          "Eligibility Error:",
          error
        );

        setError(
          "Unable to check eligibility."
        );
      } finally {
        setEligibleLoading(false);
      }
    };

  // ------------------------------------------
  // Show all scholarships
  // ------------------------------------------

  const showAllScholarships =
    async () => {
      setEligibleMode(false);

      setSearch("");
      setState("");
      setCategory("");
      setCourse("");

      await fetchScholarships();
    };

  // ------------------------------------------
  // Save / Unsave Scholarship
  // ------------------------------------------

  const handleSaveScholarship = async (
    scholarshipId: string
  ) => {
    try {
      setSavingId(scholarshipId);

      const isSaved =
        savedIds.includes(
          scholarshipId
        );

      const res = await fetch(
        "/api/saved-scholarships",
        {
          method: isSaved
            ? "DELETE"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            scholarshipId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Something went wrong."
        );
        return;
      }

      if (isSaved) {
        // Remove from saved
        setSavedIds(
          savedIds.filter(
            (id) =>
              id !== scholarshipId
          )
        );
      } else {
        // Add to saved
        setSavedIds([
          ...savedIds,
          scholarshipId,
        ]);
      }

      alert(data.message);
    } catch (error) {
      console.error(
        "Save Scholarship Error:",
        error
      );

      alert(
        "Unable to save scholarship."
      );
    } finally {
      setSavingId(null);
    }
  };

  // ------------------------------------------
  // Apply for Scholarship
  // ------------------------------------------

  const handleApplyScholarship = async (
    scholarship: Scholarship
  ) => {
    try {
      setApplyingId(scholarship.id);

      const res = await fetch(
        "/api/applications",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            scholarshipId:
              scholarship.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Unable to save application."
        );
        return;
      }

      alert(
        "Application saved successfully! ✅"
      );

      // Open official application website
      if (scholarship.applicationLink) {
        window.open(
          scholarship.applicationLink,
          "_blank"
        );
      }
    } catch (error) {
      console.error(
        "Application Error:",
        error
      );

      alert(
        "Unable to save application."
      );
    } finally {
      setApplyingId(null);
    }
  };

  // ------------------------------------------
  // Normal Filters
  // ------------------------------------------

  const filteredScholarships =
    scholarships.filter(
      (scholarship) => {
        const matchesSearch =
          scholarship.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          scholarship.provider
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesState =
          !state ||
          !scholarship.state ||
          scholarship.state === state;

        const matchesCategory =
          !category ||
          !scholarship.category ||
          scholarship.category ===
            category;

        const matchesCourse =
          !course ||
          !scholarship.course ||
          scholarship.course ===
            course;

        return (
          matchesSearch &&
          matchesState &&
          matchesCategory &&
          matchesCourse
        );
      }
    );

  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Scholarship Finder
          </h1>

          <p className="mt-2 text-gray-600">
            Find scholarships according
            to your education and
            eligibility.
          </p>

        </div>

        {/* Eligibility Section */}

        <div className="mb-8 rounded-xl bg-blue-50 p-6 shadow">

          <h2 className="text-xl font-bold text-blue-800">
            🎯 Find Scholarships For You
          </h2>

          <p className="mt-2 text-gray-600">
            We will check your profile
            and show scholarships you
            may be eligible for.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <button
              onClick={
                findEligibleScholarships
              }
              disabled={
                eligibleLoading
              }
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {eligibleLoading
                ? "Checking Eligibility..."
                : "Find Scholarships For Me"}
            </button>

            {eligibleMode && (
              <button
                onClick={
                  showAllScholarships
                }
                className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 hover:bg-blue-100"
              >
                Show All Scholarships
              </button>
            )}

          </div>

        </div>

        {/* Eligibility Result */}

        {eligibleMode && (
          <div className="mb-6 rounded-xl bg-green-50 p-5">

            <h2 className="text-xl font-bold text-green-700">
              ✅ Scholarships You May
              Be Eligible For
            </h2>

            <p className="mt-1 text-gray-600">
              These scholarships match
              your saved student profile.
            </p>

          </div>
        )}

        {/* Normal Filters */}

        {!eligibleMode && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Search & Filter
            </h2>

            <div className="grid gap-4 md:grid-cols-4">

              {/* Search */}

              <input
                type="text"
                placeholder="Search scholarship..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* State */}

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target.value
                  )
                }
                className="rounded-lg border p-3"
              >
                <option value="">
                  All States
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
              </select>

              {/* Category */}

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="rounded-lg border p-3"
              >
                <option value="">
                  All Categories
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

              {/* Course */}

              <select
                value={course}
                onChange={(e) =>
                  setCourse(
                    e.target.value
                  )
                }
                className="rounded-lg border p-3"
              >
                <option value="">
                  All Courses
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

            {/* Clear Filters */}

            <button
              onClick={() => {
                setSearch("");
                setState("");
                setCategory("");
                setCourse("");
              }}
              className="mt-4 rounded-lg border px-5 py-2 hover:bg-gray-100"
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading &&
          !eligibleMode && (
            <div className="rounded-xl bg-white p-8 text-center shadow">
              Loading scholarships...
            </div>
          )}

        {/* Results Count */}

        {!loading &&
          !error && (
            <p className="mb-5 text-gray-600">
              Showing{" "}
              <strong>
                {
                  filteredScholarships.length
                }
              </strong>{" "}
              scholarship(s)
            </p>
          )}

        {/* No Results */}

        {!loading &&
          filteredScholarships.length ===
            0 &&
          !error && (
            <div className="rounded-xl bg-white p-8 text-center shadow">

              <h2 className="text-xl font-semibold">
                No scholarships found
              </h2>

              <p className="mt-2 text-gray-500">
                Try changing your filters
                or complete your student
                profile.
              </p>

            </div>
          )}

        {/* Scholarship Cards */}

        {!loading &&
          filteredScholarships.length >
            0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredScholarships.map(
                (scholarship) => (

                  <div
                    key={
                      scholarship.id
                    }
                    className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* Title */}

                    <h2 className="text-xl font-bold">
                      {scholarship.title}
                    </h2>

                    {/* Provider */}

                    <p className="mt-2 font-medium text-blue-600">
                      {
                        scholarship.provider
                      }
                    </p>

                    {/* Description */}

                    {scholarship.description && (
                      <p className="mt-3 text-sm text-gray-600">
                        {
                          scholarship.description
                        }
                      </p>
                    )}

                    {/* Details */}

                    <div className="mt-5 space-y-2 text-sm">

                      {scholarship.state && (
                        <p>
                          <strong>
                            State:
                          </strong>{" "}
                          {
                            scholarship.state
                          }
                        </p>
                      )}

                      {scholarship.category && (
                        <p>
                          <strong>
                            Category:
                          </strong>{" "}
                          {
                            scholarship.category
                          }
                        </p>
                      )}

                      {scholarship.course && (
                        <p>
                          <strong>
                            Course:
                          </strong>{" "}
                          {
                            scholarship.course
                          }
                        </p>
                      )}

                      {scholarship.year && (
                        <p>
                          <strong>
                            Year:
                          </strong>{" "}
                          {
                            scholarship.year
                          }
                        </p>
                      )}

                      {scholarship.minPercentage !=
                        null && (
                        <p>
                          <strong>
                            Minimum Percentage:
                          </strong>{" "}
                          {
                            scholarship.minPercentage
                          }
                          %
                        </p>
                      )}

                      {scholarship.maxIncome !=
                        null && (
                        <p>
                          <strong>
                            Maximum Income:
                          </strong>{" "}
                          ₹
                          {scholarship.maxIncome.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      )}

                      {scholarship.amount !=
                        null && (
                        <p>
                          <strong>
                            Scholarship Amount:
                          </strong>{" "}
                          ₹
                          {scholarship.amount.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      )}

                      {scholarship.deadline && (
                        <p>
                          <strong>
                            Deadline:
                          </strong>{" "}
                          {new Date(
                            scholarship.deadline
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      )}

                    </div>

                    {/* Save / Unsave */}

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
                      className="mt-5 w-full rounded-lg border border-blue-600 px-4 py-3 font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      {savingId ===
                      scholarship.id
                        ? "Saving..."
                        : savedIds.includes(
                            scholarship.id
                          )
                        ? "❤️ Saved"
                        : "♡ Save Scholarship"}
                    </button>

                    {/* Apply Now */}

                    {scholarship.applicationLink && (
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
                        className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {applyingId ===
                        scholarship.id
                          ? "Saving Application..."
                          : "Apply Now"}
                      </button>
                    )}

                  </div>
                )
              )}

            </div>
          )}

      </div>

    </div>
  );
}