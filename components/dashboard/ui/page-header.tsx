import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  icon: Icon,
  breadcrumbs,
  actions,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100/80 pb-5">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-1 font-medium">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-emerald-600" />}
                {b.href ? (
                  <Link href={b.href} className="hover:text-emerald-800 transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-bold">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#0F7A3C] shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <h1 className="font-heading font-black text-2xl text-gray-900 tracking-tight">{title}</h1>
            {description && (
              <p className="text-xs text-gray-500 font-medium mt-0.5">{description}</p>
            )}
          </div>
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
