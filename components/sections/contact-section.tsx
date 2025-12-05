import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(form.email)) return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }

      setSuccess("Message sent — thank you!");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full min-h-screen py-8 px-4 md:py-12 md:px-8 flex items-center">
      <div className="max-w-xl md:max-w-3xl w-full mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Contact</h2>
        <p className="mb-4 text-sm sm:text-base text-muted-foreground">Have a question or want to work together? Send me a message.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 h-28 sm:h-32 text-sm sm:text-base"
              placeholder="Write your message here"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-600">{success}</div>}

          <div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
