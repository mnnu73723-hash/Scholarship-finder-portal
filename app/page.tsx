export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-4xl font-bold text-blue-700">
          Welcome to Scholarship Finder Portal
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Find Your Dream Scholarship
        </p>

        <div className="mt-6 flex justify-center gap-4">

          {/* View Scholarships */}
          <a
            href="/pages/scholarships"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            View Scholarships
          </a>

          {/* Dashboard */}
          <a
            href="/pages/dashboard"
            className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Dashboard
          </a>

          {/* Admin Panel */}
          <a
            href="/pages/admin/scholarship"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition hover:-translate-y-1 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
          >
            🔐 Admin Panel
          </a>

        </div>

      </div>
    </main>
  );
}