"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Contact Messages
      </h1>
      <p className="text-gray-600 mb-8">
        Messages submitted by students through the Contact page.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{msg.message}</p>
              <a
                href={`mailto:${msg.email}?subject=Re: Your message to ScholarFind`}
                className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
              >
                <Mail size={14} />
                Reply via Email
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}