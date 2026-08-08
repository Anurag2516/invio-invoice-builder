import { Skeleton } from "../skeleton";

export const InvoiceListSkeleton = () => {
  return (
    <div className="flex flex-col gap-0.5 px-1.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="py-3 pl-3 pr-1.5">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-3 w-[70px]" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-[18px] w-[44px] rounded-sm" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
          <Skeleton className="h-2.5 w-[120px] mb-1.5" />
          <Skeleton className="h-2.5 w-[60px]" />
        </div>
      ))}
    </div>
  );
};
