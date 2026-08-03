import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Use "narrow" for blog/article content */
  size?: "default" | "narrow" | "wide" | "full";
}

/**
 * Container component
 *
 * Centers content with consistent max-width and responsive padding.
 * Use this as the layout wrapper for all page sections.
 *
 * @example
 * <Container>
 *   <h1>Hello World</h1>
 * </Container>
 *
 * @example
 * <Container size="narrow">
 *   <article>Blog content</article>
 * </Container>
 */
export function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-7xl": size === "default",
          "max-w-3xl": size === "narrow",
          "max-w-screen-2xl": size === "wide",
          "max-w-none": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
