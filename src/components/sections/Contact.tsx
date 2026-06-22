"use client";

import { useState } from "react";
import { CalendarCheck, Mail, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const f = t.form;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setError(f.errorRequired);
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(f.errorEmail);
      setStatus("error");
      return;
    }

    setStatus("sending");
    // No backend wired yet — simulate a submission. Connect to your CRM/email
    // service (e.g. an API route or form provider) before launch.
    setTimeout(() => setStatus("done"), 900);
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Booking card */}
          <Reveal className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-4xl border border-brand-ink/30 bg-gradient-to-br from-[#0a2810] to-[#0f3d1c] p-8 text-white shadow-glow">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/20 blur-2xl" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20 text-brand">
                <CalendarCheck className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">
                {t.bookTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {t.bookBody}
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-6 bg-white !px-6 !py-3.5 text-base text-brand-ink hover:-translate-y-0.5 hover:shadow-lift"
              >
                <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                {t.bookCta}
              </a>
            </div>

            <div className="rounded-4xl border border-line bg-surface p-8">
              <p className="text-sm font-semibold text-ink">{t.orEmail}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-2 text-brand-ink transition-colors hover:text-brand-ink"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                <span className="font-medium">{site.email}</span>
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-4xl border border-line bg-surface p-8">
              {status === "done" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
                    <CheckCircle2
                      className="h-8 w-8 text-brand-ink"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    {f.successTitle}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    {f.successBody}
                  </p>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand mt-6 !px-6 !py-3"
                  >
                    <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                    {dict.common.bookCallShort}
                  </a>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t.formTitle}
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={f.name}>
                      <input
                        name="name"
                        required
                        placeholder={f.namePlaceholder}
                        className="input"
                      />
                    </Field>
                    <Field label={f.email}>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={f.emailPlaceholder}
                        className="input"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={f.company}>
                      <input
                        name="company"
                        placeholder={f.companyPlaceholder}
                        className="input"
                      />
                    </Field>
                    <Field label={f.teamSize}>
                      <select name="teamSize" className="input" defaultValue="">
                        <option value="" disabled>
                          —
                        </option>
                        {f.teamSizeOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label={f.interest}>
                    <select name="interest" className="input" defaultValue="">
                      <option value="" disabled>
                        —
                      </option>
                      {f.interestOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label={f.message}>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder={f.messagePlaceholder}
                      className="input resize-none"
                    />
                  </Field>

                  {status === "error" && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-brand w-full !py-3.5 text-base"
                  >
                    {status === "sending" ? (
                      f.sending
                    ) : (
                      <>
                        <Send className="h-4 w-4" strokeWidth={2} />
                        {f.submit}
                      </>
                    )}
                  </button>

                  <p className="flex items-start gap-2 text-xs leading-relaxed text-subtle">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink"
                      strokeWidth={1.75}
                    />
                    {f.privacy}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
