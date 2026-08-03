/**
 * Format utility functions
 */

/**
 * Formats a number as Indian currency (INR)
 * @example formatINR(49999) → "₹49,999"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a large number with compact notation
 * @example compactNumber(10000) → "10K"
 * @example compactNumber(2500000) → "2.5M"
 */
export function compactNumber(num: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
}

/**
 * Formats a phone number to a readable format
 * @example formatPhone("9999999999") → "+91 99999 99999"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Capitalizes the first letter of each word
 * @example titleCase("iit jee main") → "Iit Jee Main"
 */
export function titleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

/**
 * Formats a percentage with a given decimal places
 * @example formatPercent(95.5) → "95.5%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats a file size from bytes to human-readable
 * @example formatFileSize(1048576) → "1 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Pluralizes a word based on count
 * @example pluralize(1, "student") → "1 student"
 * @example pluralize(5, "student") → "5 students"
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const pluralForm = plural ?? `${singular}s`;
  return `${count} ${count === 1 ? singular : pluralForm}`;
}
