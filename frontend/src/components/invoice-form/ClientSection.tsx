import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClients, useCreateClient } from "@/hooks/useClients";
import { useDebounce } from "@/hooks/useDebounce";
import type {
  ClientFormData,
  ClientResponse,
  InvoiceFormData,
} from "@/types/invoice";
import { useRef, useState, type SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown, Plus, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";
import { useFormContext, useWatch, type SetValueConfig } from "react-hook-form";

type ClientData = {
  id: string | null;
  name: string;
  email: string;
  companyName: string;
  address: string;
  phone: string;
  website: string;
};

interface ClientSearchProps {
  clientData: ClientData;
  formData: ClientFormData;
  isClientSelected: boolean;
  formReset: () => void;
  mode: "Edit" | "Create" | null;
  setMode: React.Dispatch<SetStateAction<"Edit" | "Create" | null>>;
  handleOnChange: (field: keyof ClientFormData, value: string) => void;
  handleOnClear: () => void;
  handleOnSelect: (client: ClientResponse) => void;
  handleEdit: () => void;
  handleCreate: () => void;
  handleEditClick: () => void;
}

interface ClientCardProps {
  clientData: ClientData;
  handleEditClick: () => void;
  setMode: React.Dispatch<SetStateAction<"Edit" | "Create" | null>>;
  handleOnClear: () => void;
}

interface EditModalProps {
  formData: ClientFormData;
  mode: "Edit" | "Create" | null;
  setMode: React.Dispatch<SetStateAction<"Edit" | "Create" | null>>;
  handleOnChange: (field: keyof ClientFormData, value: string) => void;
  handleEdit: () => void;
  handleCreate: () => void;
}

const ClientCard = ({
  clientData,
  handleOnClear,
  setMode,
  handleEditClick,
}: ClientCardProps) => {
  return (
    <div className="rounded-md border border-border bg-foreground/3 mt-4 p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-7 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
            <User className="size-3.5 text-teal" />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-foreground truncate">
              {clientData.name}
            </p>
            {clientData.email && (
              <p className="text-sm text-foreground/50 truncate">
                {clientData.email}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-1 shrink-0">
          <Button
            onClick={() => {
              handleEditClick();
              setMode("Edit");
            }}
            type="button"
            variant="ghost"
            className="px-2 py-1 text-sm"
          >
            Edit
          </Button>
          <Button
            type="button"
            onClick={handleOnClear}
            variant="ghost"
            className="px-2 py-1"
          >
            <X size={10} />
          </Button>
        </div>
      </div>

      {(clientData.companyName ||
        clientData.address ||
        clientData.phone ||
        clientData.website) && (
        <div className="pl-9 flex flex-col space-y-[0.5px] text-sm">
          {clientData.companyName && (
            <p className=" text-foreground/60">{clientData.companyName}</p>
          )}
          {clientData.address && (
            <p className="text-foreground/60">{clientData.address}</p>
          )}
          {clientData.phone && (
            <p className=" text-foreground/60 pt-1.5">{clientData.phone}</p>
          )}
          {clientData.website && (
            <p className=" text-foreground/60">{clientData.website}</p>
          )}
        </div>
      )}
    </div>
  );
};

const ClientEditModal = ({
  formData,
  mode,
  setMode,
  handleOnChange,
  handleEdit,
  handleCreate,
}: EditModalProps) => {
  const lastMode = useRef(mode);
  if (mode) lastMode.current = mode;

  return (
    <Dialog
      open={mode === "Edit" || mode === "Create"}
      onOpenChange={(open) => {
        if (!open) setMode(null);
      }}
    >
      <DialogContent className="md:max-w-107.5">
        <DialogHeader>
          <DialogTitle>
            {lastMode.current === "Edit"
              ? "Edit client details"
              : "Create new client"}
          </DialogTitle>
          <DialogDescription>
            {lastMode.current === "Edit"
              ? "Edit client details for this invoice"
              : "Create a new client"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <h3 className="text-sm font-semibold tracking-wider text-foreground/95 pb-1">
              Name *
            </h3>
            <Input
              value={formData.name}
              onChange={(e) => handleOnChange("name", e.target.value)}
              placeholder="John Doe"
              className="h-10"
            />
          </div>
          <div className="w-full">
            <h3 className="text-sm font-semibold  tracking-wider text-foreground pb-1">
              Email
            </h3>
            <Input
              value={formData.email}
              onChange={(e) => handleOnChange("email", e.target.value)}
              placeholder="johndoe@gmail.com"
              className="h-10"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold  tracking-wider text-foreground pb-1">
            Company Name
          </h3>
          <Input
            value={formData.companyName}
            onChange={(e) => handleOnChange("companyName", e.target.value)}
            placeholder="Abc Industries"
            className="h-10"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold  tracking-wider text-foreground pb-1">
            Address
          </h3>
          <Input
            value={formData.address}
            onChange={(e) => handleOnChange("address", e.target.value)}
            placeholder="New York City, New York"
            className="h-10"
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <h3 className="text-sm font-semibold  tracking-wider text-foreground pb-1">
              Phone
            </h3>
            <Input
              value={formData.phone}
              onChange={(e) => handleOnChange("phone", e.target.value)}
              placeholder="+91 9587564459"
              className="h-10"
            />
          </div>
          <div className="w-full">
            <h3 className="text-sm font-semibold  tracking-wider text-foreground pb-1">
              Website
            </h3>
            <Input
              value={formData.website}
              onChange={(e) => handleOnChange("website", e.target.value)}
              placeholder="abcindustries.com"
              className="h-10"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={mode === "Edit" ? handleEdit : handleCreate}
            type="button"
          >
            {mode === "Edit" ? "Save" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ClientSearch = ({
  formData,
  clientData,
  mode,
  setMode,
  isClientSelected,
  formReset,
  handleOnChange,
  handleOnClear,
  handleOnSelect,
  handleEdit,
  handleCreate,
  handleEditClick,
}: ClientSearchProps) => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);
  const {
    data: clients = [],
    isLoading,
    isError,
  } = useClients(debouncedSearch);

  const isSearching = search !== debouncedSearch || isLoading;
  const hasSearched = debouncedSearch.length > 0;

  return (
    <div className="w-full max-w-md">
      <SectionHeader label="Bill To" subLabel="(Client Details)" />

      {!isClientSelected && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="mt-3 flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 text-sm"
            >
              {clientData.name ? (
                <span className="font-medium">{clientData.name}</span>
              ) : (
                <span className="text-muted-foreground">
                  Select a client...
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
            <Command shouldFilter={false}>
              <CommandInput
                onValueChange={setSearch}
                placeholder="Search clients..."
              />

              <CommandList>
                {isSearching && hasSearched && (
                  <CommandEmpty>Searching...</CommandEmpty>
                )}

                {!isSearching && isError && (
                  <CommandEmpty>Something went wrong. Try again.</CommandEmpty>
                )}

                {!isSearching &&
                  !isError &&
                  hasSearched &&
                  clients.length === 0 && (
                    <CommandEmpty>
                      No clients found for "{debouncedSearch}".
                    </CommandEmpty>
                  )}

                {!isSearching && !isError && !hasSearched && (
                  <CommandEmpty>Start typing to search clients.</CommandEmpty>
                )}

                {!isSearching && !isError && clients.length > 0 && (
                  <CommandGroup>
                    {clients.map((client: ClientResponse) => (
                      <CommandItem
                        key={client.id}
                        value={`${client.name} ${client.email}`}
                        onSelect={() => {
                          handleOnSelect(client);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{client.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {client.email}
                          </span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            clientData.id === client.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>

              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    formReset();
                    setMode("Create");
                  }}
                >
                  <Plus /> Create New
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      <ClientEditModal
        mode={mode}
        setMode={setMode}
        formData={formData}
        handleOnChange={handleOnChange}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />

      {isClientSelected && (
        <ClientCard
          clientData={clientData}
          handleEditClick={handleEditClick}
          handleOnClear={handleOnClear}
          setMode={setMode}
        />
      )}
    </div>
  );
};

const ClientSection = () => {
  const { setValue, control } = useFormContext<InvoiceFormData>();

  const [id, name, email, companyName, address, phone, website] = useWatch({
    control,
    name: [
      "clientId",
      "snapshotClientName",
      "snapshotClientEmail",
      "snapshotClientCompany",
      "snapshotClientAddress",
      "snapshotClientPhone",
      "snapshotClientWebsite",
    ],
  });

  const { mutateAsync: addClient } = useCreateClient();

  const [form, setForm] = useState<ClientFormData>({
    name,
    email,
    companyName,
    address,
    phone,
    website,
  });
  const [mode, setMode] = useState<"Edit" | "Create" | null>(null);

  const isClientSelected = Boolean(name?.trim());

  const formReset = () => {
    setForm({
      name: "",
      email: "",
      companyName: "",
      address: "",
      phone: "",
      website: "",
    });
  };

  const handleOnChange = (field: keyof ClientFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setClientValues = (
    client: Partial<ClientResponse>,
    options: SetValueConfig = { shouldDirty: true },
  ) => {
    setValue("clientId", client.id ?? null, options);
    setValue("snapshotClientName", client.name ?? "", options);
    setValue("snapshotClientEmail", client.email ?? "", options);
    setValue("snapshotClientCompany", client.companyName ?? "", options);
    setValue("snapshotClientAddress", client.address ?? "", options);
    setValue("snapshotClientPhone", client.phone ?? "", options);
    setValue("snapshotClientWebsite", client.website ?? "", options);
  };

  const toFormData = (client: Partial<ClientResponse>): ClientFormData => ({
    name: client.name ?? "",
    email: client.email ?? "",
    companyName: client.companyName ?? "",
    address: client.address ?? "",
    phone: client.phone ?? "",
    website: client.website ?? "",
  });

  const handleOnSelect = (client: ClientResponse) => {
    setClientValues(client);
    setForm(toFormData(client));
  };

  const handleOnClear = () => {
    setValue("clientId", null, { shouldDirty: true });
    setValue("snapshotClientName", "", { shouldDirty: true });
    setValue("snapshotClientEmail", "", { shouldDirty: true });
    setValue("snapshotClientCompany", "", { shouldDirty: true });
    setValue("snapshotClientAddress", "", { shouldDirty: true });
    setValue("snapshotClientPhone", "", { shouldDirty: true });
    setValue("snapshotClientWebsite", "", { shouldDirty: true });
    formReset();
  };

  const handleEdit = () => {
    setValue("snapshotClientName", form.name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("snapshotClientEmail", form.email, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("snapshotClientCompany", form.companyName, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("snapshotClientAddress", form.address, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("snapshotClientPhone", form.phone, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("snapshotClientWebsite", form.website, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setMode(null);
  };

  const handleCreate = async () => {
    const client = await addClient(form);

    setClientValues(client, { shouldDirty: true, shouldValidate: true });
    setForm(toFormData(client));
    setMode(null);
  };

  const handleEditClick = () => {
    setForm({ name, email, companyName, address, phone, website });
  };

  const clientData = {
    id,
    name,
    email,
    companyName,
    address,
    phone,
    website,
  };
  return (
    <ClientSearch
      clientData={clientData}
      formData={form}
      mode={mode}
      setMode={setMode}
      isClientSelected={isClientSelected}
      formReset={formReset}
      handleOnChange={handleOnChange}
      handleOnClear={handleOnClear}
      handleOnSelect={handleOnSelect}
      handleEdit={handleEdit}
      handleCreate={handleCreate}
      handleEditClick={handleEditClick}
    />
  );
};

export default ClientSection;
