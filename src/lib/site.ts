/**
 * Central configuration for outward-facing links and contact details.
 * Swap these placeholders for production values before launch.
 */
export const site = {
  name: "Xplainery",
  domain: "xplainery.com",
  url: "https://xplainery.com",
  email: "hello@xplainery.com",
  // Booking link for the "Book a Free Discovery Call" CTA.
  // Janine's Google Calendar appointment scheduling page.
  bookingUrl: "https://calendar.app.google/JFGA1XPMQhBL391K6",
  social: {
    linkedin: "https://www.linkedin.com/company/xplainery",
    twitter: "https://x.com/xplainery",
    youtube: "https://www.youtube.com/@xplainery",
  },
  founder: {
    name: "Janine Waletzke",
    role: "Founder & Lead AI Educator",
  },
} as const;

export type SiteConfig = typeof site;
