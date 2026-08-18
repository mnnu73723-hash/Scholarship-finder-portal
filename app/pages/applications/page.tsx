"use client";

import { useEffect, useState } from "react";

type Scholarship = {
  title: string;
  provider: string;
  amount?: number;
  deadline?: string;
};

type Application = {
  id: string;
  status: string;
  appliedAt: string;
  scholarship: Scholarship;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<
    Application[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/applications"
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Unable to load applications."
        );
        return;
      }

      setApplications(
        data.applications || []
      );
    } catch (error) {
      console.error(
        "Applications Fetch Error:",
        error
      );

      setError(
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="mt-2 text-gray-600">
            View the scholarships you have
            applied for.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            Loading applications...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* No Applications */}

        {!loading &&
          !error &&
          applications.length === 0 && (
            <div className="rounded-xl bg-white p-8 text-center shadow">

              <h2 className="text-xl font-semibold">
                No Applications Yet
              </h2>

              <p className="mt-2 text-gray-500">
                You have not applied for any
                scholarship yet.
              </p>

            </div>
          )}

        {/* Applications */}

        {!loading &&
          !error &&
          applications.length > 0 && (
            <div className="space-y-6">

              {applications.map(
                (application) => (
                  <div
                    key={application.id}
                    className="rounded-xl bg-white p-6 shadow"
                  >

                    {/* Scholarship Info */}

                    <div className="flex flex-col justify-between gap-4 md:flex-row">

                      <div>

                        <h2 className="text-xl font-bold">
                          {
                            application
                              .scholarship
                              .title
                          }
                        </h2>

                        <p className="mt-2 font-medium text-blue-600">
                          {
                            application
                              .scholarship
                              .provider
                          }
                        </p>

                      </div>

                      {/* Status */}

                      <div>
                        <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                          {application.status}
                        </span>
                      </div>

                    </div>

                    {/* Details */}

                    <div className="mt-5 grid gap-4 border-t pt-5 md:grid-cols-3">

                      <div>
                        <p className="text-sm text-gray-500">
                          Applied On
                        </p>

                        <p className="mt-1 font-medium">
                          {new Date(
                            application.appliedAt
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      {application
                        .scholarship
                        .amount != null && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Scholarship Amount
                          </p>

                          <p className="mt-1 font-medium">
                            ₹
                            {application.scholarship.amount.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      )}

                      {application
                        .scholarship
                        .deadline && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Deadline
                          </p>

                          <p className="mt-1 font-medium">
                            {new Date(
                              application
                                .scholarship
                                .deadline
                            ).toLocaleDateString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>

    </div>
  );
}