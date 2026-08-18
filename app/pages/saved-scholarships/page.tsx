"use client";

import { useEffect, useState } from "react";

type SavedScholarship = {
  id: string;
  scholarshipId: string;
  scholarship: {
    id: string;
    title: string;
    provider: string;
    description?: string;
    state?: string;
    category?: string;
    course?: string;
    year?: string;
    amount?: number;
    deadline?: string;
    applicationLink?: string;
  };
};

export default function SavedScholarships() {
  const [savedScholarships, setSavedScholarships] =
    useState<SavedScholarship[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSavedScholarships();
  }, []);

  const fetchSavedScholarships = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/saved-scholarships"
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Failed to load saved scholarships."
        );
        return;
      }

      setSavedScholarships(
        data.savedScholarships || []
      );
    } catch (error) {
      console.error(
        "Saved Scholarships Error:",
        error
      );

      setError(
        "Unable to load saved scholarships."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (
    scholarshipId: string
  ) => {
    try {
      const res = await fetch(
        "/api/saved-scholarships",
        {
          method: "DELETE",
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
            "Unable to remove scholarship."
        );
        return;
      }

      setSavedScholarships(
        savedScholarships.filter(
          (item) =>
            item.scholarshipId !==
            scholarshipId
        )
      );
    } catch (error) {
      console.error(
        "Remove Scholarship Error:",
        error
      );

      alert(
        "Unable to remove scholarship."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Saved Scholarships ❤️
          </h1>

          <p className="mt-2 text-gray-600">
            Scholarships you saved for
            later.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            Loading saved scholarships...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          savedScholarships.length ===
            0 && (
            <div className="rounded-xl bg-white p-10 text-center shadow">

              <div className="text-5xl">
                💔
              </div>

              <h2 className="mt-4 text-xl font-bold">
                No Saved Scholarships
              </h2>

              <p className="mt-2 text-gray-500">
                You haven't saved any
                scholarships yet.
              </p>

            </div>
          )}

        {/* Saved Scholarships */}

        {!loading &&
          !error &&
          savedScholarships.length >
            0 && (
            <>
              <p className="mb-5 text-gray-600">
                You have saved{" "}
                <strong>
                  {
                    savedScholarships.length
                  }
                </strong>{" "}
                scholarship(s).
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {savedScholarships.map(
                  (item) => {

                    const scholarship =
                      item.scholarship;

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
                      >

                        {/* Title */}

                        <h2 className="text-xl font-bold">
                          {
                            scholarship.title
                          }
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

                        {/* Buttons */}

                        <div className="mt-6 space-y-3">

                          {scholarship.applicationLink && (
                            <a
                              href={
                                scholarship.applicationLink
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
                            >
                              Apply Now
                            </a>
                          )}

                          <button
                            onClick={() =>
                              handleRemove(
                                scholarship.id
                              )
                            }
                            className="w-full rounded-lg border border-red-500 px-4 py-3 font-medium text-red-500 hover:bg-red-50"
                          >
                            Remove from Saved
                          </button>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            </>
          )}

      </div>

    </div>
  );
}