"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have a question or a scholarship to suggest? We'd love to hear
          from you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <Mail className="text-blue-600 mb-3" size={22} />
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600 text-sm">support@scholarfind.com</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <Phone className="text-blue-600 mb-3" size={22} />
            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600 text-sm">+91 98765 43210</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <MapPin className="text-blue-600 mb-3" size={22} />
            <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
            <p className="text-gray-600 text-sm">Haryana, India</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-8">
          {submitted ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Thank you! 🎉
              </h3>
              <p className="text-gray-600">
                Your message has been received. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}