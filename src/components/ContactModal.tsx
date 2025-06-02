import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSending(false);
    setSent(true);
    setForm({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181e29] rounded-lg p-8 w-full max-w-2xl relative border border-gray-700">
        <button className="absolute top-3 right-4 text-gray-400 text-2xl" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#232b3b] text-white border border-gray-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Phone Number</label>
              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-[#232b3b] text-white border border-gray-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#232b3b] text-white border border-gray-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-white mb-1">Your Message</label>
            <textarea
              name="message"
              placeholder="Your Project Idea..."
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 rounded bg-[#232b3b] text-white border border-gray-600 focus:outline-none focus:border-emerald-400"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 border border-pink-400 text-pink-400 rounded hover:bg-pink-400 hover:text-white transition font-semibold"
              disabled={sending}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-6 9 6-9 6-9-6zm0 0v6a9 9 0 009 9 9 9 0 009-9v-6" />
              </svg>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
          {sent && <div className="text-green-400 text-center mt-2">Message sent!</div>}
        </form>
      </div>
    </div>
  );
};