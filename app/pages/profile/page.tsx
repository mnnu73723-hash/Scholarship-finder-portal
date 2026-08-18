"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    state: "",
    category: "",
    course: "",
    year: "",
    percentage: "",
    familyIncome: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  // Existing profile load karna
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.success && data.profile) {
          setFormData({
            state: data.profile.state || "",
            category: data.profile.category || "",
            course: data.profile.course || "",
            year: data.profile.year || "",
            percentage:
              data.profile.percentage?.toString() || "",
            familyIncome:
              data.profile.familyIncome?.toString() || "",
          });
        }
      } catch (error) {
        console.error("Profile Fetch Error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

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
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message || "Something went wrong."
        );
        return;
      }

      setMessage("Profile saved successfully! ✅");
    } catch (error) {
      console.error("Profile Save Error:", error);

      setMessage(
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-2xl">

        <div className="rounded-xl bg-white p-8 shadow-lg">

          {/* Heading */}

          <h1 className="mb-2 text-center text-3xl font-bold">
            Student Profile
          </h1>

          <p className="mb-8 text-center text-gray-500">
            Complete your profile to find suitable
            scholarships
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

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

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* Year */}

            <div>
              <label className="mb-2 block font-medium">
                Current Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
                required
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
                Percentage
              </label>

              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                placeholder="Enter percentage"
                min="0"
                max="100"
                step="0.01"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Family Income */}

            <div>
              <label className="mb-2 block font-medium">
                Annual Family Income
              </label>

              <input
                type="number"
                name="familyIncome"
                value={formData.familyIncome}
                onChange={handleChange}
                placeholder="Enter annual family income"
                min="0"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Message */}

            {message && (
              <div className="rounded-lg bg-gray-100 p-3 text-center">
                {message}
              </div>
            )}

            {/* Save Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading
                ? "Saving..."
                : "Save Profile"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}