import { Skeleton } from "../skeleton";

const ClientsTableSkeleton = () => {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <Skeleton className="size-8 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-36 hidden sm:block" />
          <Skeleton className="h-3 w-24 hidden md:block" />
          <Skeleton className="h-3 w-40 hidden lg:block" />
        </div>
      ))}
    </div>
  );
};

export default ClientsTableSkeleton;
