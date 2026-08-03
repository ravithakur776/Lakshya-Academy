import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/common/container";

/**
 * Root Loading UI
 *
 * Shown by Next.js while a page segment is loading.
 * Provides a skeleton placeholder that matches the general page layout.
 */
export default function Loading() {
  return (
    <Container className="pt-24 pb-16">
      <div className="space-y-8">
        {/* Hero skeleton */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-5 w-2/3 mx-auto" />
          <div className="flex gap-3 justify-center mt-6">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3 p-6 border rounded-2xl">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
