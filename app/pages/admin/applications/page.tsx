"use client";

import { useEffect, useState } from "react";

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  scholarship: {
    title: string;
    provider: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    fetch("/api/admin/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.applications || []);
        setLoading(false);
      });
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColor = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        All Applications
      </h1>
      <p className="text-gray-600 mb-8">
        Review and update the status of student applications.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {app.scholarship.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {app.scholarship.provider}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Applicant: <strong>{app.user.name}</strong> (
                    {app.user.email})
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied on{" "}
                    {new Date(app.appliedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>

                  <select
                    value={app.status}
                    disabled={updatingId === app.id}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}