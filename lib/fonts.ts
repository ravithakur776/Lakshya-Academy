import { Poppins, Inter } from "next/font/google";

/**
 * Poppins — Primary heading font
 * Geometric sans-serif with premium, modern feel
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

/**
 * Inter — Body text font
 * Highly legible, optimized for UI
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

/** Combined font variables for use in layout */
export const fontVariables = `${poppins.variable} ${inter.variable}`;
