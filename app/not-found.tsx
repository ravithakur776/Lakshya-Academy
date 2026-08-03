import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 404 Not Found Page
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-dvh items-center justify-center">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black text-primary/10 font-heading">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-4 font-heading">
          Page not found
        </h1>
        <p className="text-gray-500 mt-2 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className={cn(buttonVariants())}>
            Back to Home
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
            Contact Us
          </Link>
        </div>
      </div>
    </Container>
  );
}
