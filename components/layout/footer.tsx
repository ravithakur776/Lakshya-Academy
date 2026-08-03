import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Container } from "@/components/common/container";
import { SITE_CONFIG } from "@/lib/constants";
import { navLinks, courses } from "@/data/homepage-data";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: YoutubeIcon, href: SITE_CONFIG.social.youtube, label: "YouTube" },
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#063B1D] via-[#042C15] to-[#021F0E] text-emerald-100 border-t-2 border-[#0F7A3C] shadow-2xl relative overflow-hidden" role="contentinfo">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#0F7A3C]/20 blur-3xl rounded-full pointer-events-none" />

      {/* Main footer grid */}
      <Container className="py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <Logo size="md" dark />

            <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed max-w-xs font-medium">
              Mathura&apos;s premier IIT-JEE coaching institute, led by IIT (BHU) alumni directors. Dedicated to concept-based learning and personalized mentorship.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-[11px] font-bold text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Established 2017 • Mathura</span>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#0F7A3C] hover:text-white hover:border-emerald-400 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <span className="flex items-center justify-center h-4 w-4">
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-100/90 hover:text-amber-300 text-sm transition-all duration-200 hover:translate-x-1.5 inline-block font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Targeted Courses
            </h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={course.href}
                    className="text-emerald-100/90 hover:text-amber-300 text-sm transition-all duration-200 hover:translate-x-1.5 inline-block font-semibold"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-5">
            <h3 className="text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Contact Info
            </h3>
            
            <ul className="space-y-4 text-xs md:text-sm">
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-start gap-3 text-emerald-100 hover:text-amber-300 transition-colors group">
                  <div className="p-2 rounded-lg bg-white/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-white">{SITE_CONFIG.phone}</span>
                    <span className="text-xs text-emerald-200/80 font-medium">{SITE_CONFIG.phoneAlternate}</span>
                  </div>
                </a>
              </li>

              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-emerald-100 hover:text-amber-300 transition-colors group">
                  <div className="p-2 rounded-lg bg-white/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-xs md:text-sm">{SITE_CONFIG.email}</span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-emerald-100">
                  <div className="p-2 rounded-lg bg-white/10 text-amber-400 flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-xs leading-relaxed text-emerald-100/90">
                    {SITE_CONFIG.address.building}, {SITE_CONFIG.address.area}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}
                  </span>
                </div>
              </li>
            </ul>

            {/* Google Maps Card */}
            <a
              href={SITE_CONFIG.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400/60 rounded-2xl p-4 transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs font-black text-white">Campus Location</p>
                    <p className="text-[11px] text-emerald-200 font-medium">Krishna Nagar, Mathura</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>

        </div>
      </Container>

      {/* Bottom copyright bar */}
      <div className="border-t border-emerald-900/80 bg-[#02170A]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-emerald-300/80 font-semibold">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-amber-300 transition-colors">Terms of Service</Link>
              <Link href="/sitemap.xml" className="hover:text-amber-300 transition-colors">Sitemap</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
