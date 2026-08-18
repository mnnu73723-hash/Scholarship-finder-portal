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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
        setError(
          data.message || "Unable to check eligibility."
        );
        return;
      }

      setScholarships(data.scholarships || []);
      setSearched(true);
    } catch (error) {
      console.error("Eligibility Error:", error);
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl shadow-lg">
            🎓
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Scholarship Eligibility Checker
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Enter your academic and personal details
            to find scholarships you may be eligible for.
          </p>

        </div>

        {/* Form */}

        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-10">

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-2"
          >

            {/* State */}

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                State
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

            {/* Category */}

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

            {/* Course */}

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

            {/* Year */}

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Current Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

            {/* Percentage */}

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Percentage
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
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Family Income */}

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
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
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Button */}

            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Checking Eligibility..."
                  : "🔍 Check Eligibility"}
              </button>

            </div>

          </form>

        </div>

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Results */}

        {searched && (
          <div className="mt-10">

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              🎓 Eligible Scholarships
            </h2>

            {scholarships.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-lg">

                <div className="text-5xl">
                  😔
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  No Matching Scholarships Found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try updating your profile details
                  and check again.
                </p>

              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {scholarships.map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  >

                    <div className="mb-4 flex items-start justify-between">

                      <div className="rounded-xl bg-blue-100 p-3 text-2xl">
                        🎓
                      </div>

                      {scholarship.amount != null && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                          ₹
                          {scholarship.amount.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                      {scholarship.title}
                    </h3>

                    <p className="mt-1 font-medium text-blue-600">
                      {scholarship.provider}
                    </p>

                    {scholarship.description && (
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {scholarship.description}
                      </p>
                    )}

                    <div className="mt-5 space-y-2 text-sm text-gray-600">

                      {scholarship.state && (
                        <p>
                          📍 <strong>State:</strong>{" "}
                          {scholarship.state}
                        </p>
                      )}

                      {scholarship.category && (
                        <p>
                          👤 <strong>Category:</strong>{" "}
                          {scholarship.category}
                        </p>
                      )}

                      {scholarship.course && (
                        <p>
                          📚 <strong>Course:</strong>{" "}
                          {scholarship.course}
                        </p>
                      )}

                      {scholarship.year && (
                        <p>
                          📅 <strong>Year:</strong>{" "}
                          {scholarship.year}
                        </p>
                      )}

                      {scholarship.minPercentage != null && (
                        <p>
                          📊 <strong>Minimum:</strong>{" "}
                          {scholarship.minPercentage}%
                        </p>
                      )}

                      {scholarship.maxIncome != null && (
                        <p>
                          💰 <strong>Max Income:</strong>{" "}
                          ₹
                          {scholarship.maxIncome.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      )}

                    </div>

                    {scholarship.applicationLink && (
                      <a
                        href={scholarship.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                      >
                        Apply Now →
                      </a>
                    )}

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}