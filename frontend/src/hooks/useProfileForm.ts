import type { UserProfileFormValues, UserResponse } from "@/types/invoice";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUser";
import userProfileSchema from "@/schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formDataToUserApiPayload,
  UserResponseToformData,
} from "@/mapper/user.mapper";

export const useProfileForm = (user: UserResponse) => {
  const { mutateAsync: updateUser, isPending, isSuccess } = useUpdateUser();

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: UserResponseToformData(user),
  });

  const onSubmit = form.handleSubmit(async (user: UserProfileFormValues) => {
    const payload = formDataToUserApiPayload(user);
    const data = await updateUser(payload);
    if (data) form.reset(UserResponseToformData(data));
  });

  return { form, onSubmit, isPending, isSuccess };
};
