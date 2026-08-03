import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  // Student statuses
  ACTIVE: { label: "Active", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  INACTIVE: { label: "Inactive", className: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
  PASSED_OUT: { label: "Passed Out", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  DROPPED: { label: "Dropped", className: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  SUSPENDED: { label: "Suspended", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  // Enquiry statuses
  NEW: { label: "New", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  INTERESTED: { label: "Interested", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  CALLBACK: { label: "Callback", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  ADMISSION_DONE: { label: "Admitted", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  LOST: { label: "Lost", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  NOT_INTERESTED: { label: "Not Interested", className: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
  // Blog statuses
  DRAFT: { label: "Draft", className: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
  PUBLISHED: { label: "Published", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ARCHIVED: { label: "Archived", className: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  // Payment
  PENDING: { label: "Pending", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  PAID: { label: "Paid", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  PARTIAL: { label: "Partial", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  FAILED: { label: "Failed", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  REFUNDED: { label: "Refunded", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status.replace(/_/g, " "),
    className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

// Role badge variant
export function RoleBadge({ role }: { role: string }) {
  const ROLE_CONFIG: Record<string, { label: string; className: string }> = {
    SUPER_ADMIN: { label: "Super Admin", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    ADMIN: { label: "Admin", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    COUNSELLOR: { label: "Counsellor", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    FACULTY: { label: "Faculty", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  };

  const config = ROLE_CONFIG[role] ?? {
    label: role,
    className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
