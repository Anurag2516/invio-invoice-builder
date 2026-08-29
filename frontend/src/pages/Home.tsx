import InvoiceFilterTabs from "@/components/home/InvoiceFilterTabs";
import InvoiceTable from "@/components/home/InvoiceTable";
import StatsCards from "@/components/home/StatsCards";
import Navbar from "@/components/layout/Navbar";
import InvoiceTableSkeleton from "@/components/ui/skeleton/InvoiceTableSkeleton";
import { useInvoices } from "@/hooks/useInvoices";
import { useState } from "react";

export type ActiveTab =
  | "all"
  | "outstanding"
  | "paid"
  | "overdue"
  | "cancelled";

const Home = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");

  const { data: invoices = [], isLoading, isError } = useInvoices();

  return (
    <div>
     <Navbar />

      <StatsCards invoices={invoices} />

      <div className="pt-14 pb-20 px-4 sm:px-8 lg:px-24 bg-background">
        <h2 className="text-2xl text-foreground font-medium pb-4">
          My Invoices
        </h2>
        <div className="bg-background flex items-start justify-center w-full">
          <div className=" w-full flex flex-col border border-border shadow-xs rounded-lg bg-background overflow-hidden">
            {isLoading && <InvoiceTableSkeleton />}

            {!isLoading && !isError && (
              <>
                <InvoiceFilterTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <InvoiceTable invoices={invoices} activeTab={activeTab} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;