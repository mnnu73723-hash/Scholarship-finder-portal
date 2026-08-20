"use client";

import { useState, useEffect } from "react";
import { Award, Users, FileText, MessageSquare } from "lucide-react";

interface Stats {
  totalScholarships: number;
  totalUsers: number;
  totalApplications: number;
  totalMessages: number;
}

export default function AdminPage() {
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

  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
        setStatsLoading(false);
      })
      .catch(() => setStatsLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      const res = await fetch("/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to add scholarship.");
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

      // Refresh stats after adding a new scholarship
      fetch("/api/admin/stats")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setStats(data.stats);
        });
    } catch (error) {
      console.error("Admin Error:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Scholarships",
      value: stats?.totalScholarships,
      icon: Award,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Students",
      value: stats?.totalUsers,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Applications",
      value: stats?.totalApplications,
      icon: FileText,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Contact Messages",
      value: stats?.totalMessages,
      icon: MessageSquare,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Stats Cards */}
      <div className="mx-auto max-w-3xl mb-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className={`inline-flex p-2 rounded-lg mb-3 ${card.color}`}>
                  <Icon size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {statsLoading ? "..." : card.value ?? 0}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">

        <p className="mt-2 mb-8 text-center text-gray-500">
          Add New Scholarship
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

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
              Provider / Organization
            </label>

            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="Government / Organization name"
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

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Example: Haryana"
              className="w-full rounded-lg border p-3"
            />
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
            >
              <option value="">Any Category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="mb-2 block font-medium">
              Course
            </label>

            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Example: BCA"
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Year */}
          <div>
            <label className="mb-2 block font-medium">
              Eligible Year
            </label>

            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Example: 2nd Year"
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Percentage */}
          <div>
            <label className="mb-2 block font-medium">
              Minimum Percentage
            </label>

            <input
              type="number"
              name="minPercentage"
              value={formData.minPercentage}
              onChange={handleChange}
              placeholder="Example: 60"
              min="0"
              max="100"
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
              placeholder="Example: 250000"
              min="0"
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
              placeholder="Example: 20000"
              min="0"
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-2 block font-medium">
              Application Deadline
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
              value={formData.applicationLink}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Message */}
          {message && (
            <div className="rounded-lg bg-gray-100 p-3 text-center">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Adding Scholarship..." : "Add Scholarship"}
          </button>

        </form>

      </div>

    </div>
  );
}