import {
  ArrowRight,
  GraduationCap,
  Search,
  ShieldCheck,
  BookmarkCheck,
  Users,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 text-white">

      {/* ================= HERO SECTION ================= */}

      <section className="relative">

        {/* Background Effects */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

            {/* ================= LEFT CONTENT ================= */}

            <div>

              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">

                <Sparkles size={14} />

                Smart Scholarship Discovery

              </div>

              {/* Heading */}

              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">

                Find Scholarships

                <span className="block text-blue-500">
                  That Match Your Future.
                </span>

              </h1>

              {/* Description */}

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">

                Discover scholarship opportunities based on
                your education, category, location and
                eligibility. Find the right financial support
                for your academic journey.

              </p>

              {/* Buttons */}

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="/pages/scholarships"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-700 hover:shadow-xl"
                >
                  <Search size={18} />

                  Explore Scholarships

                  <ArrowRight size={17} />

                </a>

                <a
                  href="/pages/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  <GraduationCap size={18} />

                  Student Dashboard

                </a>

              </div>

              {/* Trust Points */}

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={17}
                    className="text-emerald-400"
                  />

                  Smart Eligibility

                </div>

                <div className="flex items-center gap-2">

                  <BookmarkCheck
                    size={17}
                    className="text-blue-400"
                  />

                  Save Opportunities

                </div>

                <div className="flex items-center gap-2">

                  <Users
                    size={17}
                    className="text-indigo-400"
                  />

                  Built for Students

                </div>

              </div>

            </div>

            {/* ================= RIGHT DASHBOARD PREVIEW ================= */}

            <div className="relative">

              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">

                {/* Top Bar */}

                <div className="flex items-center justify-between border-b border-white/10 pb-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">

                      <GraduationCap size={20} />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Student Portal
                      </p>

                      <p className="text-sm font-semibold text-white">
                        Scholarship Dashboard
                      </p>

                    </div>

                  </div>

                  <div className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">

                    Active

                  </div>

                </div>

                {/* Stats */}

                <div className="mt-4 grid grid-cols-3 gap-3">

                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                    <p className="text-xs text-slate-500">
                      Available
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                      24
                    </p>

                    <p className="mt-1 text-xs text-blue-400">
                      Scholarships
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                    <p className="text-xs text-slate-500">
                      Saved
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                      08
                    </p>

                    <p className="mt-1 text-xs text-emerald-400">
                      Opportunities
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                    <p className="text-xs text-slate-500">
                      Applied
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                      05
                    </p>

                    <p className="mt-1 text-xs text-indigo-400">
                      Applications
                    </p>

                  </div>

                </div>

                {/* Scholarship Cards */}

                <div className="mt-4 space-y-3">

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        🎓
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-white">
                          Merit Scholarship
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Government Education Program
                        </p>

                      </div>

                    </div>

                    <span className="text-xs font-bold text-emerald-400">
                      Eligible
                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                        📚
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-white">
                          Higher Education Support
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Student Financial Assistance
                        </p>

                      </div>

                    </div>

                    <span className="text-xs font-bold text-blue-400">
                      Open
                    </span>

                  </div>

                </div>

              </div>

              {/* Decorative Glow */}

              <div className="-z-10 absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="relative border-t border-white/10 bg-black/20">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-blue-500/30">

              <Search
                size={24}
                className="text-blue-400"
              />

              <h3 className="mt-5 text-lg font-bold">
                Discover Faster
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Search and filter scholarships based on
                your education and eligibility.
              </p>

            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-500/30">

              <ShieldCheck
                size={24}
                className="text-emerald-400"
              />

              <h3 className="mt-5 text-lg font-bold">
                Check Eligibility
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Identify scholarships that match your
                academic and financial profile.
              </p>

            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-indigo-500/30">

              <BookmarkCheck
                size={24}
                className="text-indigo-400"
              />

              <h3 className="mt-5 text-lg font-bold">
                Track Opportunities
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Save scholarships and keep track of your
                important opportunities.
              </p>

            </div>

          </div>

          {/* Admin Button */}

          <div className="mt-12 flex justify-center">

            <a
              href="/pages/admin/scholarship"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
            >
              🔐
              Admin Portal

              <ArrowRight size={16} />

            </a>

          </div>

        </div>

      </section>

    </main>
  );
}


// export default function Home() {
//   return (
//     <main className="min-h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center">
//       <div className="text-center">

//         <h1 className="text-4xl font-bold text-blue-700">
//           Welcome to Scholarship Finder Portal
//         </h1>

//         <p className="mt-4 text-lg text-gray-600">
//           Find Your Dream Scholarship
//         </p>

//         <div className="mt-6 flex justify-center gap-4">

//           {/* View Scholarships */}
//           <a
//             href="/pages/scholarships"
//             className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
//           >
//             View Scholarships
//           </a>

//           {/* Dashboard */}
//           <a
//             href="/pages/dashboard"
//             className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
//           >
//             Dashboard
//           </a>

//           {/* Admin Panel */}
//           <a
//             href="/pages/admin/scholarship"
//             className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition hover:-translate-y-1 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
//           >
//             🔐 Admin Panel
//           </a>

//         </div>

//       </div>
//     </main>
//   );
// }