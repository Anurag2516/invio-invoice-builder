import { Skeleton } from "../skeleton";

export const InvoiceFormSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-3 w-32" />
        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2 w-32">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2 w-36">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid grid-cols-2 gap-6">
        {[0, 1].map((col) => (
          <div key={col} className="space-y-4">
            <Skeleton className="h-3 w-20" />
            {[
              "h-3 w-24",
              "h-10 w-full",
              "h-3 w-28",
              "h-10 w-full",
              "h-3 w-16",
              "h-10 w-full",
              "h-3 w-12",
              "h-10 w-full",
            ].map((cls, i) => (
              <Skeleton key={i} className={`${cls} rounded-lg`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
