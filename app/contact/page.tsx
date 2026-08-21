"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSending(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HERO ================= */}

      <section className="border-b border-white/10 bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
              <MessageSquare size={14} />
              Contact ScholarFind
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's Start a
              <span className="block text-blue-500">
                Conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Have a question, feedback or scholarship
              opportunity to share? Send us a message and
              we will get back to you.
            </p>

          </div>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* ================= CONTACT INFO ================= */}

          <div className="space-y-5">

            <div className="mb-8">

              <p className="text-xs font-bold uppercase tracking-widest text-blue-500">
                Contact Information
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Get in Touch
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Choose the contact method that works best
                for you.
              </p>

            </div>

            {/* EMAIL */}

            <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:border-blue-500/40 hover:bg-slate-900">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Mail size={22} />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    For general questions and support.
                  </p>

                  <p className="mt-3 text-sm font-medium text-blue-400">
                    support@scholarfind.com
                  </p>

                </div>

              </div>

            </div>

            {/* PHONE */}

            <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:border-blue-500/40 hover:bg-slate-900">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Phone size={22} />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Speak with our support team.
                  </p>

                  <p className="mt-3 text-sm font-medium text-white">
                    +91 98765 43210
                  </p>

                </div>

              </div>

            </div>

            {/* LOCATION */}

            <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:border-blue-500/40 hover:bg-slate-900">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <MapPin size={22} />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    Location
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Based in India.
                  </p>

                  <p className="mt-3 text-sm font-medium text-white">
                    Haryana, India
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= CONTACT FORM ================= */}

          <div className="rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

            <div className="border-b border-white/10 p-7 lg:p-8">

              <p className="text-xs font-bold uppercase tracking-widest text-blue-500">
                Send a Message
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                How Can We Help?
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Fill out the form below and our team will
                review your message.
              </p>

            </div>

            <div className="p-7 lg:p-8">

              {submitted ? (

                /* SUCCESS STATE */

                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 size={42} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    Message Sent Successfully
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                    Thank you for contacting ScholarFind.
                    Your message has been received and we
                    will get back to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Send Another Message
                  </button>

                </div>

              ) : (

                /* FORM */

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send size={18} />

                    {sending
                      ? "Sending Message..."
                      : "Send Message"}
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-slate-500 lg:px-8">
          ScholarFind · Helping students discover better
          educational opportunities.
        </div>

      </footer>

    </div>
  );
}



// "use client";

// import { useState } from "react";
// import { Mail, MapPin, Phone, Send } from "lucide-react";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to send message");
//       }

//       setSubmitted(true);
//       setForm({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12">
//       <div className="mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
//         <p className="text-lg text-gray-600">
//           Have a question or a scholarship to suggest? We'd love to hear
//           from you.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="space-y-6">
//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <Mail className="text-blue-600 mb-3" size={22} />
//             <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
//             <p className="text-gray-600 text-sm">support@scholarfind.com</p>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <Phone className="text-blue-600 mb-3" size={22} />
//             <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
//             <p className="text-gray-600 text-sm">+91 98765 43210</p>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <MapPin className="text-blue-600 mb-3" size={22} />
//             <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
//             <p className="text-gray-600 text-sm">Haryana, India</p>
//           </div>
//         </div>

//         <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-8">
//           {submitted ? (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Thank you! 🎉
//               </h3>
//               <p className="text-gray-600">
//                 Your message has been received. We'll get back to you soon.
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Your full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="you@example.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   required
//                   rows={5}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Write your message here..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
//               >
//                 <Send size={18} />
//                 Send Message
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }