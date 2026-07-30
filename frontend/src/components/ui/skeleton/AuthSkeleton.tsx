import { Skeleton } from "../skeleton";

export function AuthSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full bg-background border-b border-stone-300 dark:border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-16 h-4 rounded-md" />
        </div>
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl shadow-sm w-full max-w-md px-10 py-10 space-y-5">
          <Skeleton className="w-40 h-7 rounded-md" />
          <Skeleton className="w-64 h-4 rounded-md" />

          <div className="space-y-2 pt-2">
            <Skeleton className="w-12 h-3 rounded-md" />
            <Skeleton className="w-full h-11 rounded-lg" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-16 h-3 rounded-md" />
            <Skeleton className="w-full h-11 rounded-lg" />
          </div>

          <Skeleton className="w-full h-11 rounded-xl" />
        </div>
      </div>
    </div>
  );
}