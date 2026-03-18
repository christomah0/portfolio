"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/i18n-context";
import { Send, CheckCircle, Mail, User, MessageSquare } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return t.contact.errorName;
    if (!form.email.trim()) return t.contact.errorEmail;
    const re = /\S+@\S+\.\S+/;
    if (!re.test(form.email)) return t.contact.errorEmailInvalid;
    if (!form.message.trim()) return t.contact.errorMessage;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError(t.contact.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full min-h-screen py-12 px-4 md:py-20 flex items-center">
      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {success ? (
          /* Success state */
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
              {t.contact.successTitle}
            </h3>
            <p className="text-slate-600 mb-6">
              {t.contact.successMessage}
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              {t.contact.sendAnother}
            </button>
          </div>
        ) : (
          /* Form */
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t.contact.nameLabel}
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm sm:text-base transition-colors"
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t.contact.emailLabel}
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm sm:text-base transition-colors"
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t.contact.messageLabel}
                </label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 h-32 sm:h-36 text-sm sm:text-base resize-none transition-colors"
                    placeholder={t.contact.messagePlaceholder}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 transition-colors text-sm font-medium"
                disabled={loading}
              >
                {loading ? (
                  t.contact.sending
                ) : (
                  <>
                    <Send size={16} />
                    {t.contact.send}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
