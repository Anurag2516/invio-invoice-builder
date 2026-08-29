import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Building2, CreditCard } from "lucide-react";
import Input from "@/components/ui/Input";
import Navbar from "@/components/layout/Navbar";
import type { UserResponse } from "@/types/invoice";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/hooks/useUser";
import { useProfileForm } from "@/hooks/useProfileForm";
import { FormProvider } from "react-hook-form";
import UserProfileSkeleton from "@/components/ui/skeleton/UserProfileSkeleton";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}
const SectionCard = ({ icon: Icon, title, children }: SectionCardProps) => (
  <div className="border border-border rounded-lg bg-background overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
      <div className="size-7 rounded-md bg-teal/10 flex items-center justify-center shrink-0">
        <Icon className="size-3.5 text-teal" />
      </div>
      <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">
        {title}
      </h2>
    </div>
    <div className="px-5 py-5">{children}</div>
  </div>
);

const ProfileFormLoader = () => {
  const { data: profile, isLoading } = useUser();

  if (isLoading || !profile) return <UserProfileSkeleton />;

  return <Profile profile={profile} />;
};

const Profile = ({ profile }: { profile: UserResponse }) => {
  const navigate = useNavigate();
  const { form, onSubmit, isPending, isSuccess } = useProfileForm(profile);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    register,
    formState: { isDirty, errors },
  } = form;

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
    }
  }, [isSuccess]);

  const handleBack = () => {
    if (isDirty) {
      setShowModal(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FormProvider {...form}>
        <form className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
          <div className="flex justify-between gap-1.5">
            <Button type="button" onClick={handleBack} variant="outline">
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              {isDirty && (
                <Button
                  type="submit"
                  variant="default"
                  onClick={onSubmit}
                  disabled={isPending}
                  className="text-white bg-teal hover:bg-teal-dark"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </div>

          <div className="my-8">
            <h2 className="text-2xl text-foreground font-medium">Profile</h2>
            <p className="text-sm text-foreground/80 mt-1">
              These details pre-fill your invoices. Changes apply to new
              invoices only.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <SectionCard icon={User} title="Personal Info">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Full Name"
                  {...register("name")}
                  error={errors.name?.message}
                  placeholder="John Doe"
                />
                <Input
                  type="text"
                  label="Email"
                  {...register("email")}
                  error={errors.email?.message}
                  placeholder="john@example.com"
                />
                <Input
                  type="text"
                  label="Phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                  placeholder="+91 98765 43210"
                />
                <Input
                  type="text"
                  label="Website"
                  {...register("website")}
                  error={errors.website?.message}
                  placeholder="example.com"
                />
                <div className="sm:col-span-2">
                  <Input
                    type="text"
                    label="Address"
                    {...register("address")}
                    error={errors.address?.message}
                    placeholder="New York City, New York"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard icon={Building2} title="Business Info">
              <Input
                type="text"
                label="Company Name"
                {...register("companyName")}
                error={errors.companyName?.message}
                placeholder="Acme Corp"
              />
            </SectionCard>

            <SectionCard icon={CreditCard} title="Payment Info">
              <p className="text-sm text-foreground/60 mb-4">
                Shown on invoices as default payment details.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Bank Name"
                  {...register("bankName")}
                  error={errors.bankName?.message}
                  placeholder="HDFC Bank"
                />
                <Input
                  type="text"
                  label="Account Holder Name"
                  {...register("accountHolderName")}
                  error={errors.accountHolderName?.message}
                  placeholder="John Doe"
                />
                <div className="sm:col-span-2">
                  <Input
                    type="text"
                    label="Account Number"
                    {...register("accountNumber")}
                    error={errors.accountNumber?.message}
                    placeholder="XXXX XXXX XXXX"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        </form>
      </FormProvider>

      <AlertDialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to save or discard the changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate(-1)}>
              Discard
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onSubmit}
              disabled={isPending}
              className="text-white bg-teal hover:bg-teal-dark"
            >
              Save changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileFormLoader;
