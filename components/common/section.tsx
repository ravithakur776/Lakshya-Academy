import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Controls vertical padding */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Optional background variant */
  variant?: "default" | "muted" | "dark" | "primary";
  as?: "section" | "div" | "article";
}

/**
 * Section component
 *
 * Consistent vertical spacing and background for page sections.
 * Pairs with Container for proper layout.
 *
 * @example
 * <Section variant="muted">
 *   <Container>
 *     <h2>Our Courses</h2>
 *   </Container>
 * </Section>
 */
export function Section({
  children,
  spacing = "lg",
  variant = "default",
  as: Tag = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        // Vertical padding by spacing size
        {
          "py-8 md:py-12": spacing === "sm",
          "py-12 md:py-16": spacing === "md",
          "py-16 md:py-24": spacing === "lg",
          "py-24 md:py-32": spacing === "xl",
        },
        // Background variants
        {
          "bg-white": variant === "default",
          "bg-gray-50": variant === "muted",
          "bg-gray-900 text-white": variant === "dark",
          "bg-primary text-white": variant === "primary",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
