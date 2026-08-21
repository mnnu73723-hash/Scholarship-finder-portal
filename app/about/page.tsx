import {
  GraduationCap,
  Search,
  ShieldCheck,
  Heart,
  ArrowRight,
  Target,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HERO SECTION ================= */}

      <section className="border-b border-slate-200 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              About ScholarFind
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Making Scholarship Discovery
              <span className="block text-blue-500">
                Simple and Accessible.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              ScholarFind helps students discover scholarship
              opportunities that match their education,
              eligibility and financial profile.
            </p>

          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

        {/* ================= MISSION ================= */}

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Target className="text-blue-600" size={24} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Our Purpose
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Our Mission
                </h2>
              </div>

            </div>

            <p className="mt-7 text-base leading-8 text-slate-600">
              Every year, thousands of scholarships go
              unclaimed simply because students do not know
              they exist or are unsure whether they qualify.
              ScholarFind was built to solve that problem.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We help students across India discover
              scholarships based on their education, state,
              category and income — making sure valuable
              opportunities are easier to find and access.
            </p>

          </div>

          {/* MISSION VISUAL CARD */}

          <div className="flex flex-col justify-between rounded-2xl bg-blue-600 p-8 text-white shadow-lg">

            <div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <GraduationCap size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                Education Should Not Be Limited by Awareness.
              </h3>

              <p className="mt-4 text-sm leading-7 text-blue-100">
                Our goal is to connect students with
                opportunities that can support their
                educational journey.
              </p>

            </div>

            <div className="mt-10 border-t border-white/20 pt-6">

              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 size={18} />
                Built with students in mind
              </div>

            </div>

          </div>

        </section>

        {/* ================= SECTION HEADER ================= */}

        <section className="mt-16">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Platform Benefits
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              How ScholarFind Helps Students
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A simple and structured platform designed to
              reduce confusion and make scholarship discovery
              more efficient.
            </p>

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section className="mt-8 grid gap-6 md:grid-cols-3">

          {/* FEATURE 1 */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition group-hover:bg-blue-600">
              <Search
                className="text-blue-600 transition group-hover:text-white"
                size={23}
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Smart Search
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Filter scholarships by state, category and
              course to quickly discover opportunities
              relevant to your profile.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
              Explore opportunities
              <ArrowRight size={16} />
            </div>

          </div>

          {/* FEATURE 2 */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition group-hover:bg-emerald-600">
              <ShieldCheck
                className="text-emerald-600 transition group-hover:text-white"
                size={23}
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Eligibility Check
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Add your profile details once and identify
              scholarship opportunities that match your
              eligibility criteria.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">
              Check eligibility
              <ArrowRight size={16} />
            </div>

          </div>

          {/* FEATURE 3 */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 transition group-hover:bg-indigo-600">
              <Heart
                className="text-indigo-600 transition group-hover:text-white"
                size={23}
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Built for Students
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              No unnecessary complexity or confusing
              processes — just a structured way to discover
              financial support for education.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600">
              Student focused
              <ArrowRight size={16} />
            </div>

          </div>

        </section>

        {/* ================= CLOSING CTA ================= */}

        <section className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

            <div className="p-8 lg:p-10">

              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Get Connected
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Have a Scholarship to Share?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                Have a scholarship opportunity to share or
                a question about ScholarFind? Our platform
                is built to grow with student needs.
              </p>

            </div>

            <div className="flex items-center justify-center bg-slate-50 p-8">

              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Get in Touch
                <ArrowRight size={17} />
              </a>

            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-slate-500 lg:px-8">
          ScholarFind · Helping students discover
          opportunities for their education.
        </div>

      </footer>

    </div>
  );
}


// import { GraduationCap, Search, ShieldCheck, Heart } from "lucide-react";

// export default function AboutPage() {
//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12">
//       {/* Header */}
//       <div className="mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-3">
//           About ScholarFind
//         </h1>
//         <p className="text-lg text-gray-600">
//           Find Your Dream Scholarship — Made Simple.
//         </p>
//       </div>

//       {/* Mission */}
//       <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-10">
//         <div className="flex items-center gap-3 mb-4">
//           <GraduationCap className="text-blue-600" size={28} />
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Our Mission
//           </h2>
//         </div>
//         <p className="text-gray-700 leading-relaxed">
//           Every year, thousands of scholarships go unclaimed simply because
//           students don't know they exist or don't know if they qualify.
//           ScholarFind was built to solve that problem — we help students
//           across India discover scholarships that match their education,
//           state, category, and income, so no opportunity is missed.
//         </p>
//       </div>

//       {/* How it helps */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <Search className="text-blue-600 mb-3" size={24} />
//           <h3 className="font-semibold text-gray-900 mb-2">
//             Smart Search
//           </h3>
//           <p className="text-gray-600 text-sm">
//             Filter scholarships by state, category, and course to quickly
//             find what applies to you.
//           </p>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <ShieldCheck className="text-blue-600 mb-3" size={24} />
//           <h3 className="font-semibold text-gray-900 mb-2">
//             Eligibility Check
//           </h3>
//           <p className="text-gray-600 text-sm">
//             Tell us about your profile once, and we'll show you only the
//             scholarships you're actually eligible for.
//           </p>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-xl p-6">
//           <Heart className="text-blue-600 mb-3" size={24} />
//           <h3 className="font-semibold text-gray-900 mb-2">
//             Built for Students
//           </h3>
//           <p className="text-gray-600 text-sm">
//             No jargon, no confusion — just a simple way to find financial
//             help for your education.
//           </p>
//         </div>
//       </div>

//       {/* Closing note */}
//       <div className="text-center text-gray-600">
//         <p>
//           Have a scholarship to share or a question for us?{" "}
//           <a href="/contact" className="text-blue-600 font-medium hover:underline">
//             Get in touch
//           </a>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }