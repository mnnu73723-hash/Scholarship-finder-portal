"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  userId: string;
  name: string;
  email: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      // User login nahi hai
      if (!res.ok || !data.success || !data.user) {
        router.replace("/pages/login");
        return;
      }

      // User authenticated hai
      setUser(data.user);

      // Saved scholarships
      const savedRes = await fetch(
        "/api/saved-scholarships",
        {
          cache: "no-store",
        }
      );

      const savedData = await savedRes.json();

      if (savedRes.ok && savedData.success) {
        setSavedCount(
          savedData.savedScholarships?.length || 0
        );
      }

      // Applications
      const applicationRes = await fetch(
        "/api/applications",
        {
          cache: "no-store",
        }
      );

      const applicationData =
        await applicationRes.json();

      if (
        applicationRes.ok &&
        applicationData.success
      ) {
        setApplicationCount(
          applicationData.applications?.length || 0
        );
      }
    } catch (error) {
      console.error(
        "Dashboard Authentication Error:",
        error
      );

      router.replace("/pages/login");
    } finally {
      setLoading(false);
    }
  };

  // Auth check complete hone tak
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-lg font-semibold">
            Checking authentication...
          </p>

          <p className="mt-2 text-gray-500">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <h1 className="text-3xl font-bold">
        Student Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome{" "}
        {user?.name ? user.name : "Student"} to
        Scholarship Finder Portal
      </p>

      {/* Dashboard Cards */}

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        {/* Scholarships */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="font-semibold">
            Scholarships
          </h2>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            3
          </p>

          <p className="mt-2 text-gray-500">
            Available scholarships
          </p>

          <button
            onClick={() =>
              router.push(
                "/pages/scholarships"
              )
            }
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            View Scholarships
          </button>

        </div>

        {/* Saved Scholarships */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="font-semibold">
            Saved Scholarships
          </h2>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {savedCount}
          </p>

          <p className="mt-2 text-gray-500">
            Scholarships you saved
          </p>

          <button
            onClick={() =>
              router.push(
                "/pages/saved-scholarships"
              )
            }
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            View Saved Scholarships
          </button>

        </div>

        {/* Applications */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="font-semibold">
            Applications
          </h2>

          <p className="mt-2 text-3xl font-bold text-purple-600">
            {applicationCount}
          </p>

          <p className="mt-2 text-gray-500">
            Your applications
          </p>

          <button
            onClick={() =>
              router.push(
                "/pages/applications"
              )
            }
            className="mt-4 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
          >
            View Applications
          </button>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Find Scholarships */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Find Scholarships
          </h2>

          <p className="mt-2 text-gray-600">
            Find scholarships based on your
            profile and eligibility.
          </p>

          <button
            onClick={() =>
              router.push(
                "/pages/scholarships"
              )
            }
            className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Find Scholarships
          </button>

        </div>

        {/* Student Profile */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Student Profile
          </h2>

          <p className="mt-2 text-gray-600">
            Update your course, category,
            percentage and family income.
          </p>

          <button
            onClick={() =>
              router.push(
                "/pages/profile"
              )
            }
            className="mt-4 rounded-lg bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-900"
          >
            Update Profile
          </button>

        </div>

      </div>

    </div>
  );
}