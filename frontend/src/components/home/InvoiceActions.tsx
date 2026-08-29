import type { InvoiceResponse } from "@/types/invoice";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../invoice-pdf/InvoicePDF";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import { useState } from "react";
import { getCurrencySign } from "@/utils/currency";

interface InvoiceActionsProps {
  invoice: InvoiceResponse;
}

const InvoiceActions = ({ invoice }: InvoiceActionsProps) => {
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteBtnClick = (e: React.SyntheticEvent, id: string) => {
    e.stopPropagation();
    setDeleteModalId(id);
  };

  return (
    <>
      <div className="flex items-center justify-start md:justify-center gap-3 text-foreground/60 order-6 md:order-0 col-span-2 md:col-span-1">
        <Tooltip>
          <TooltipTrigger
            onClick={() => navigate(`/invoices/edit?id=${invoice.id}`)}
            className="px-2 py-1.5 hover:bg-ring/30 hover:text-foreground rounded-md cursor-pointer transition-colors duration-150 ease-in-out"
          >
            <Pencil size={18} />
          </TooltipTrigger>
          <TooltipContent>Edit Invoice</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() =>
              navigate(`/invoices/${invoice.id}/preview`, {
                state: { backgroundLocation: location },
              })
            }
            className="px-2 py-1.5 hover:bg-ring/30 hover:text-foreground rounded-md cursor-pointer transition-colors duration-150 ease-in-out"
          >
            <Eye size={18} />
          </TooltipTrigger>
          <TooltipContent>Open Invoice</TooltipContent>
        </Tooltip>

        <PDFDownloadLink
          document={
            <InvoicePDF
              invoice={invoice}
              currency={getCurrencySign(invoice.currency)}
            />
          }
          fileName={`invoice-${invoice.invoiceNumber}.pdf`}
        >
          <Tooltip>
            <TooltipTrigger className="px-2 py-1.5 hover:bg-ring/30 hover:text-foreground rounded-md cursor-pointer transition-colors duration-150 ease-in-out">
              <Download size={18} />
            </TooltipTrigger>
            <TooltipContent>Download Invoice</TooltipContent>
          </Tooltip>
        </PDFDownloadLink>

        <Tooltip>
          <TooltipTrigger
            onClick={(e: React.SyntheticEvent) =>
              handleDeleteBtnClick(e, invoice.id)
            }
            className="px-2 py-1.5 text-red-400/90 hover:bg-ring/30 rounded-md cursor-pointer transition-colors duration-150 ease-in-out"
          >
            <Trash2 size={18} />
          </TooltipTrigger>
          <TooltipContent>Delete Invoice</TooltipContent>
        </Tooltip>
        {deleteModalId && (
          <DeleteConfirmModal
            deleteModalId={deleteModalId}
            invoiceNumber={invoice.invoiceNumber}
            onClose={() => setDeleteModalId(null)}
          />
        )}
      </div>
    </>
  );
};

export default InvoiceActions;
