"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  userId: string;
  name: string;
  email: string;
};

const Icon = ({
  name,
  size = 20,
}: {
  name:
    | "graduation"
    | "bookmark"
    | "file"
    | "search"
    | "user"
    | "arrow"
    | "refresh"
    | "check"
    | "spark";
  size?: number;
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "graduation":
      return (
        <svg {...common}>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12.5V17c3 2.2 9 2.2 12 0v-4.5" />
          <path d="M22 10v6" />
        </svg>
      );

    case "bookmark":
      return (
        <svg {...common}>
          <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z" />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h6" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );

    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8.1 8.1 0 0 0-15.5-3" />
          <path d="M4 4v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 3" />
          <path d="M20 20v-4h-4" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3-1.2 4.5L7 9l3.8 1.5L12 15l1.2-4.5L17 9l-3.8-1.5L12 3Z" />
          <path d="m19 14-.6 2.4L16 17l2.4.6L19 20l.6-2.4L22 17l-2.4-.6L19 14Z" />
        </svg>
      );

    default:
      return null;
  }
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

      if (!res.ok || !data.success || !data.user) {
        router.replace("/pages/login");
        return;
      }

      setUser(data.user);

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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-10 text-center shadow-2xl shadow-black/50">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <div className="animate-spin">
              <Icon name="refresh" size={28} />
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Student Portal
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Loading Dashboard
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Checking your account and preparing your
            dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-[76px] items-center justify-between gap-4">

            {/* BRAND */}

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-600/10 text-blue-400 shadow-lg shadow-blue-950/20">
                <Icon name="graduation" size={23} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
                  Student Portal
                </p>

                <h1 className="text-base font-bold text-white sm:text-lg">
                  Scholarship Finder
                </h1>
              </div>

            </div>

            {/* USER */}

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-950/30">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "S"}
              </div>

              <div className="hidden min-w-0 sm:block">

                <p className="max-w-[180px] truncate text-sm font-semibold text-white">
                  {user?.name || "Student"}
                </p>

                <p className="max-w-[180px] truncate text-xs text-slate-500">
                  {user?.email}
                </p>

              </div>

            </div>

          </div>
        </div>
      </header>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ========================= */}
        {/* WELCOME */}
        {/* ========================= */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">

          <div className="grid lg:grid-cols-[1.5fr_0.7fr]">

            {/* LEFT */}

            <div className="relative p-7 sm:p-10">

              {/* Background glow */}

              <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative">

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                    Student Dashboard
                  </span>

                </div>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">

                  Welcome back,

                  <span className="text-blue-400">
                    {" "}
                    {user?.name || "Student"}
                  </span>

                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Track your scholarship opportunities,
                  manage saved scholarships and monitor
                  your applications from one central
                  dashboard.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={() =>
                      router.push(
                        "/pages/scholarships"
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 hover:shadow-blue-900/30"
                  >
                    Explore Scholarships
                    <Icon name="arrow" size={17} />
                  </button>

                  <button
                    onClick={() =>
                      router.push(
                        "/pages/profile"
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <Icon name="user" size={17} />
                    Manage Profile
                  </button>

                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-t border-white/10 bg-slate-900/40 p-8 lg:border-l lg:border-t-0">

              <div className="absolute h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative text-center">

                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-600/10 text-blue-400 shadow-2xl shadow-blue-950/30">
                  <Icon name="graduation" size={58} />
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-300">
                  Your Education Journey
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Find opportunities that match your
                  profile
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* ========================= */}
        {/* OVERVIEW */}
        {/* ========================= */}

        <div className="mb-5">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            Overview
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Dashboard Summary
          </h2>

        </div>

        {/* ========================= */}
        {/* STATISTICS */}
        {/* ========================= */}

        <section className="grid gap-4 md:grid-cols-3">

          {/* SCHOLARSHIPS */}

          <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-blue-500/30">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Scholarships
                </p>

                <h3 className="mt-2 text-4xl font-bold text-white">
                  3
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon name="graduation" size={23} />
              </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              Scholarship opportunities available
              for you.
            </p>

            <button
              onClick={() =>
                router.push(
                  "/pages/scholarships"
                )
              }
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              View Scholarships
              <Icon name="arrow" size={15} />
            </button>

          </div>

          {/* SAVED */}

          <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-500/30">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Saved Scholarships
                </p>

                <h3 className="mt-2 text-4xl font-bold text-white">
                  {savedCount}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Icon name="bookmark" size={23} />
              </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              Scholarships saved for later review.
            </p>

            <button
              onClick={() =>
                router.push(
                  "/pages/saved-scholarships"
                )
              }
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              View Saved Items
              <Icon name="arrow" size={15} />
            </button>

          </div>

          {/* APPLICATIONS */}

          <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-indigo-500/30">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Applications
                </p>

                <h3 className="mt-2 text-4xl font-bold text-white">
                  {applicationCount}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                <Icon name="file" size={23} />
              </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              Applications submitted by you.
            </p>

            <button
              onClick={() =>
                router.push(
                  "/pages/applications"
                )
              }
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              View Applications
              <Icon name="arrow" size={15} />
            </button>

          </div>

        </section>

        {/* ========================= */}
        {/* QUICK ACTIONS */}
        {/* ========================= */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Quick Actions
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Continue Your Journey
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Access important features quickly.
            </p>

          </div>

          <div className="grid gap-5 lg:grid-cols-2">

            {/* FIND SCHOLARSHIPS */}

            <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl shadow-black/20 transition hover:border-blue-500/30">

              <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400" />

              <div className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <Icon name="search" size={23} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Find Scholarships
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Discover scholarship opportunities
                  based on your academic profile,
                  category and eligibility criteria.
                </p>

                <button
                  onClick={() =>
                    router.push(
                      "/pages/scholarships"
                    )
                  }
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
                >
                  Explore Opportunities
                  <Icon name="arrow" size={17} />
                </button>

              </div>
            </div>

            {/* PROFILE */}

            <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl shadow-black/20 transition hover:border-slate-500/30">

              <div className="h-1 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-300" />

              <div className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300">
                  <Icon name="user" size={23} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Student Profile
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Keep your academic details updated
                  including course, category,
                  percentage and family income.
                </p>

                <button
                  onClick={() =>
                    router.push(
                      "/pages/profile"
                    )
                  }
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  Update Profile
                  <Icon name="arrow" size={17} />
                </button>

              </div>
            </div>

          </div>
        </section>

        {/* ========================= */}
        {/* BOTTOM INFO */}
        {/* ========================= */}

        <section className="mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Icon name="spark" size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-300">
                Keep your profile updated
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Updated academic information helps you
                discover more relevant scholarship
                opportunities.
              </p>
            </div>

            <button
              onClick={() =>
                router.push(
                  "/pages/profile"
                )
              }
              className="sm:ml-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Update Now
              <Icon name="arrow" size={14} />
            </button>

          </div>

        </section>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}

        <footer className="mt-10 border-t border-white/10 py-6">

          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

            <p className="text-xs text-slate-700">
              Scholarship Finder Portal · Student Dashboard
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Portal Active
            </div>

          </div>

        </footer>

      </main>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type User = {
//   userId: string;
//   name: string;
//   email: string;
// };

// export default function Dashboard() {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [savedCount, setSavedCount] = useState(0);
//   const [applicationCount, setApplicationCount] = useState(0);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthentication();
//   }, []);

//   const checkAuthentication = async () => {
//     try {
//       const res = await fetch("/api/auth/me", {
//         method: "GET",
//         cache: "no-store",
//       });

//       const data = await res.json();

//       // User login nahi hai
//       if (!res.ok || !data.success || !data.user) {
//         router.replace("/pages/login");
//         return;
//       }

//       // User authenticated hai
//       setUser(data.user);

//       // Saved scholarships
//       const savedRes = await fetch(
//         "/api/saved-scholarships",
//         {
//           cache: "no-store",
//         }
//       );

//       const savedData = await savedRes.json();

//       if (savedRes.ok && savedData.success) {
//         setSavedCount(
//           savedData.savedScholarships?.length || 0
//         );
//       }

//       // Applications
//       const applicationRes = await fetch(
//         "/api/applications",
//         {
//           cache: "no-store",
//         }
//       );

//       const applicationData =
//         await applicationRes.json();

//       if (
//         applicationRes.ok &&
//         applicationData.success
//       ) {
//         setApplicationCount(
//           applicationData.applications?.length || 0
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Dashboard Authentication Error:",
//         error
//       );

//       router.replace("/pages/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auth check complete hone tak
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-100">
//         <div className="rounded-xl bg-white p-8 text-center shadow">
//           <p className="text-lg font-semibold">
//             Checking authentication...
//           </p>

//           <p className="mt-2 text-gray-500">
//             Please wait...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       {/* Header */}

//       <h1 className="text-3xl font-bold">
//         Student Dashboard
//       </h1>

//       <p className="mt-2 text-gray-600">
//         Welcome{" "}
//         {user?.name ? user.name : "Student"} to
//         Scholarship Finder Portal
//       </p>

//       {/* Dashboard Cards */}

//       <div className="mt-8 grid gap-6 md:grid-cols-3">

//         {/* Scholarships */}

//         <div className="rounded-xl bg-white p-6 shadow">

//           <h2 className="font-semibold">
//             Scholarships
//           </h2>

//           <p className="mt-2 text-3xl font-bold text-blue-600">
//             3
//           </p>

//           <p className="mt-2 text-gray-500">
//             Available scholarships
//           </p>

//           <button
//             onClick={() =>
//               router.push(
//                 "/pages/scholarships"
//               )
//             }
//             className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
//           >
//             View Scholarships
//           </button>

//         </div>

//         {/* Saved Scholarships */}

//         <div className="rounded-xl bg-white p-6 shadow">

//           <h2 className="font-semibold">
//             Saved Scholarships
//           </h2>

//           <p className="mt-2 text-3xl font-bold text-green-600">
//             {savedCount}
//           </p>

//           <p className="mt-2 text-gray-500">
//             Scholarships you saved
//           </p>

//           <button
//             onClick={() =>
//               router.push(
//                 "/pages/saved-scholarships"
//               )
//             }
//             className="mt-4 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
//           >
//             View Saved Scholarships
//           </button>

//         </div>

//         {/* Applications */}

//         <div className="rounded-xl bg-white p-6 shadow">

//           <h2 className="font-semibold">
//             Applications
//           </h2>

//           <p className="mt-2 text-3xl font-bold text-purple-600">
//             {applicationCount}
//           </p>

//           <p className="mt-2 text-gray-500">
//             Your applications
//           </p>

//           <button
//             onClick={() =>
//               router.push(
//                 "/pages/applications"
//               )
//             }
//             className="mt-4 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
//           >
//             View Applications
//           </button>

//         </div>

//       </div>

//       {/* Quick Actions */}

//       <div className="mt-8 grid gap-6 md:grid-cols-2">

//         {/* Find Scholarships */}

//         <div className="rounded-xl bg-white p-6 shadow">

//           <h2 className="text-xl font-bold">
//             Find Scholarships
//           </h2>

//           <p className="mt-2 text-gray-600">
//             Find scholarships based on your
//             profile and eligibility.
//           </p>

//           <button
//             onClick={() =>
//               router.push(
//                 "/pages/scholarships"
//               )
//             }
//             className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
//           >
//             Find Scholarships
//           </button>

//         </div>

//         {/* Student Profile */}

//         <div className="rounded-xl bg-white p-6 shadow">

//           <h2 className="text-xl font-bold">
//             Student Profile
//           </h2>

//           <p className="mt-2 text-gray-600">
//             Update your course, category,
//             percentage and family income.
//           </p>

//           <button
//             onClick={() =>
//               router.push(
//                 "/pages/profile"
//               )
//             }
//             className="mt-4 rounded-lg bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-900"
//           >
//             Update Profile
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }