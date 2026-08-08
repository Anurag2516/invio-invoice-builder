import { useDeleteInvoices } from "@/hooks/useInvoices";
import { Trash2 } from "lucide-react";
import { Spinner } from "./spinner";

interface DeleteConfirmModalProps {
  deleteModalId: string | null;
  invoiceNumber?: string;
  onClose: () => void;
}

const DeleteConfirmModal = ({
  deleteModalId,
  invoiceNumber,
  onClose,
}: DeleteConfirmModalProps) => {
  const { mutate: deleteInvoice, isPending } = useDeleteInvoices();

  const handleConfirmDelete = () => {
    if (deleteModalId) {
      deleteInvoice(deleteModalId, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative z-10 bg-background border border-white/12 rounded-xl shadow-2xl w-full max-w-80 p-6 flex flex-col gap-5"
        onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20">
              <Trash2 size={14} className="text-red-400" />
            </div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Delete Invoice
            </h3>
          </div>
          <p className="text-foreground/70 text-xs mt-1 leading-relaxed">
            {invoiceNumber
              ? `Are you sure you want to delete ${invoiceNumber}?`
              : "This invoice will be permanently removed."}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase border border-foreground/25 text-foreground/60 hover:text-foreground/80 hover:bg-foreground/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleConfirmDelete}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase bg-red-500/80 hover:bg-red-500 text-white transition-colors cursor-pointer disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
