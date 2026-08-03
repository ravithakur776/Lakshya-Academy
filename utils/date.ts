/**
 * Date utility functions
 */

/**
 * Formats a date to a readable string
 * @example formatDate(new Date()) → "31 Jul 2025"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Formats a date with time
 * @example formatDateTime(new Date()) → "31 Jul 2025, 04:30 PM"
 */
export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

/**
 * Returns a relative time string
 * @example timeAgo(new Date()) → "just now"
 * @example timeAgo(yesterday) → "1 day ago"
 */
export function timeAgo(date: Date | string): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const then = new Date(date);
  const diffMs = then.getTime() - now.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffMonths / 12);

  if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, "second");
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, "day");
  if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, "month");
  return rtf.format(diffYears, "year");
}

/**
 * Returns the current academic year string
 * @example getCurrentAcademicYear() → "2025-26"
 */
export function getCurrentAcademicYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  // Academic year starts in April
  const startYear = month >= 3 ? year : year - 1;
  const endYear = (startYear + 1).toString().slice(2);
  return `${startYear}-${endYear}`;
}

/**
 * Checks if a date is in the past
 */
export function isPast(date: Date | string): boolean {
  return new Date(date) < new Date();
}

/**
 * Checks if a date is in the future
 */
export function isFuture(date: Date | string): boolean {
  return new Date(date) > new Date();
}
