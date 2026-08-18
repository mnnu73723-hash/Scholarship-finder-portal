"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddScholarshipPage() {
  const router = useRouter();

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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "/api/scholarships",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message ||
            "Unable to add scholarship."
        );
        return;
      }

      setMessage(
        "Scholarship added successfully! ✅"
      );

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
      console.error(
        "Add Scholarship Error:",
        error
      );

      setMessage(
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add Scholarship
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new scholarship to the
            Scholarship Finder Portal.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Title */}

            <div>
              <label className="mb-2 block font-medium">
                Scholarship Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter scholarship title"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Provider */}

            <div>
              <label className="mb-2 block font-medium">
                Provider
              </label>

              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Government / Organization"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Scholarship description"
                rows={4}
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* State */}

            <div>
              <label className="mb-2 block font-medium">
                State
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
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

            {/* Category */}

            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
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

            {/* Course */}

            <div>
              <label className="mb-2 block font-medium">
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
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

            {/* Year */}

            <div>
              <label className="mb-2 block font-medium">
                Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
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
              <label className="mb-2 block font-medium">
                Minimum Percentage
              </label>

              <input
                type="number"
                name="minPercentage"
                value={
                  formData.minPercentage
                }
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                placeholder="Example: 60"
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Income */}

            <div>
              <label className="mb-2 block font-medium">
                Maximum Family Income
              </label>

              <input
                type="number"
                name="maxIncome"
                value={formData.maxIncome}
                onChange={handleChange}
                min="0"
                placeholder="Example: 250000"
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Amount */}

            <div>
              <label className="mb-2 block font-medium">
                Scholarship Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0"
                placeholder="Example: 20000"
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Deadline */}

            <div>
              <label className="mb-2 block font-medium">
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Application Link */}

            <div>
              <label className="mb-2 block font-medium">
                Application Link
              </label>

              <input
                type="url"
                name="applicationLink"
                value={
                  formData.applicationLink
                }
                onChange={handleChange}
                placeholder="https://example.com/apply"
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Message */}

            {message && (
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                {message}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Adding Scholarship..."
                : "Add Scholarship"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}