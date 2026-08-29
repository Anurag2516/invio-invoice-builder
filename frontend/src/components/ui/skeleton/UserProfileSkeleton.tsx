import { Skeleton } from "@/components/ui/skeleton";

const SectionCardSkeleton = ({ rows = 2 }: { rows?: number }) => (
  <div className="border border-border rounded-lg bg-background overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
      <Skeleton className="size-7 rounded-md" />
      <Skeleton className="h-4 w-28" />
    </div>
    <div className="px-5 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const UserProfileSkeleton = () => (
  <div className="min-h-screen bg-background">
    <header className="flex items-center justify-between px-4 sm:px-8 lg:px-24 py-3 bg-background border-b border-border/30">
      <Skeleton className="h-7 w-16" />
    </header>

    <div className="px-4 sm:px-8 lg:px-24 py-10 max-w-3xl mx-auto">
      <Skeleton className="h-4 w-12 mb-6" />

      <div className="mb-8 flex flex-col gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="flex flex-col gap-5">
        <SectionCardSkeleton rows={4} />
        <SectionCardSkeleton rows={2} />
        <SectionCardSkeleton rows={3} />
      </div>
    </div>
  </div>
);

export default UserProfileSkeleton;
