import { GraduationCap, Search, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          About ScholarFind
        </h1>
        <p className="text-lg text-gray-600">
          Find Your Dream Scholarship — Made Simple.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="text-blue-600" size={28} />
          <h2 className="text-2xl font-semibold text-gray-900">
            Our Mission
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Every year, thousands of scholarships go unclaimed simply because
          students don't know they exist or don't know if they qualify.
          ScholarFind was built to solve that problem — we help students
          across India discover scholarships that match their education,
          state, category, and income, so no opportunity is missed.
        </p>
      </div>

      {/* How it helps */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <Search className="text-blue-600 mb-3" size={24} />
          <h3 className="font-semibold text-gray-900 mb-2">
            Smart Search
          </h3>
          <p className="text-gray-600 text-sm">
            Filter scholarships by state, category, and course to quickly
            find what applies to you.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <ShieldCheck className="text-blue-600 mb-3" size={24} />
          <h3 className="font-semibold text-gray-900 mb-2">
            Eligibility Check
          </h3>
          <p className="text-gray-600 text-sm">
            Tell us about your profile once, and we'll show you only the
            scholarships you're actually eligible for.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <Heart className="text-blue-600 mb-3" size={24} />
          <h3 className="font-semibold text-gray-900 mb-2">
            Built for Students
          </h3>
          <p className="text-gray-600 text-sm">
            No jargon, no confusion — just a simple way to find financial
            help for your education.
          </p>
        </div>
      </div>

      {/* Closing note */}
      <div className="text-center text-gray-600">
        <p>
          Have a scholarship to share or a question for us?{" "}
          <a href="/contact" className="text-blue-600 font-medium hover:underline">
            Get in touch
          </a>
          .
        </p>
      </div>
    </div>
  );
}