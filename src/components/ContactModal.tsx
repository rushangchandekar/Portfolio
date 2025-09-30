import { useState } from "react";
import emailjs from '@emailjs/browser';

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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setError(null);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        'service_hihsasp', // Replace with your Service ID from EmailJS
        'template_pqgjnpl', // Replace with your Template ID from EmailJS
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || "Not provided",
          message: form.message,
        },
        'jkv5jdUmUUO9DhMWO' // Replace with your Public Key from EmailJS
      );

      console.log('Email sent successfully:', result.text);
      setSent(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err: any) {
      console.error('Email failed to send:', err);
      setError(`Failed to send message: ${err.text || "Unknown error"}`);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181e29] rounded-lg p-8 w-full max-w-2xl relative border border-gray-700">
        <button className="absolute top-3 right-4 text-gray-400 text-2xl" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Your existing form fields */}
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
          {error && <div className="text-red-400 text-center mt-2">{error}</div>}
          {sent && <div className="text-green-400 text-center mt-2">Message sent successfully! I'll get back to you soon.</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 border border-pink-400 text-pink-400 rounded hover:bg-pink-400 hover:text-white transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={sending}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-6 9 6-9 6-9-6zm0 0v6a9 9 0 009 9 9 9 0 009-9v-6" />
              </svg>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};