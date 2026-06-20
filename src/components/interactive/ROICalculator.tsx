"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock, TrendingUp, CalendarCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { formatEUR, formatNumber } from "@/lib/utils";

const WORKING_WEEKS = 46;

export function ROICalculator({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.tools.roi;
  const [employees, setEmployees] = useState(10);
  const [hourly, setHourly] = useState(60);
  const [hours, setHours] = useState(4);

  const { annualHours, annualValue } = useMemo(() => {
    const weekly = employees * hours;
    const ah = weekly * WORKING_WEEKS;
    return { annualHours: ah, annualValue: ah * hourly };
  }, [employees, hourly, hours]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-bg shadow-card">
      <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-accent/10 to-transparent px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-bg">
          <Calculator className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{t.title}</h3>
          <p className="text-sm text-muted">{t.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <SliderField
          label={t.employeesLabel}
          value={employees}
          min={1}
          max={250}
          step={1}
          onChange={setEmployees}
          display={formatNumber(employees, locale)}
        />
        <SliderField
          label={t.hourlyLabel}
          value={hourly}
          min={20}
          max={200}
          step={5}
          onChange={setHourly}
          display={formatEUR(hourly, locale)}
        />
        <SliderField
          label={t.hoursLabel}
          hint={t.hoursHint}
          value={hours}
          min={1}
          max={15}
          step={1}
          onChange={setHours}
          display={`${formatNumber(hours, locale)} h`}
        />

        {/* Results */}
        <div className="mt-auto rounded-3xl border border-line bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
            {t.resultsTitle}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <ResultStat
              icon={<Clock className="h-4 w-4" strokeWidth={2} />}
              value={`${formatNumber(annualHours, locale)} h`}
              label={t.hoursReturned}
              sub={t.perYear}
            />
            <ResultStat
              icon={<TrendingUp className="h-4 w-4" strokeWidth={2} />}
              value={formatEUR(annualValue, locale)}
              label={t.valueCreated}
              sub={t.perYear}
              highlight
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-subtle">
            {t.assumptionNote}
          </p>
        </div>

        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand !py-3"
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={2} />
          {t.cta}
        </a>
      </div>
    </div>
  );
}

function SliderField({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-ink">{label}</label>
        <span className="font-display text-lg font-bold text-brand">
          {display}
        </span>
      </div>
      {hint && <p className="mt-0.5 text-xs text-subtle">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand"
        style={{ accentColor: "rgb(var(--brand))" }}
      />
    </div>
  );
}

function ResultStat({
  icon,
  value,
  label,
  sub,
  highlight,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.4, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-line bg-bg p-4"
    >
      <div
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
          highlight ? "bg-brand text-white" : "bg-brand-soft text-brand"
        }`}
      >
        {icon}
      </div>
      <p
        className={`mt-3 font-display text-xl font-bold ${
          highlight ? "text-brand" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs leading-snug text-muted">{label}</p>
      <p className="text-[11px] text-subtle">{sub}</p>
    </motion.div>
  );
}
