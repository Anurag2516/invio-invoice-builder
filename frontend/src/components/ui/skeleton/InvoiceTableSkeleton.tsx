import { Skeleton } from "@/components/ui/skeleton";

const InvoiceTableSkeleton = () => {
  return (
    <div className="space-y-4 my-6">
      <div className="flex gap-2 mx-4">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      <div className="rounded-lg border border-border">
        <div className="grid grid-cols-6 px-4 py-3 border-b border-border">
          {["INVOICE", "CLIENT", "DUE DATE", "TOTAL", "STATUS", "ACTIONS"].map(
            (col) => (
              <Skeleton key={col} className="h-3 w-16" />
            ),
          )}
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 items-center px-4 py-4 border-b border-border last:border-0"
          >
            <Skeleton className="h-4 w-16" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTableSkeleton;