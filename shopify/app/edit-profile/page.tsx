"use client";
import Card from "../components/layout/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "@/firebase/config";
import { useState } from "react";
import Input from "../components/ui/Input";

const formSchema = z
  .object({
    Fname: z.string().min(2, "First name must be at least 2 characters"),
    Lname: z.string().min(2, "Last name must be at least 2 characters"),
    oldPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must be the same",
    path: ["confirmPassword"],
  });

type FormField = z.infer<typeof formSchema>;

const EditProfile = () => {
  const [isEdited, setisEdited] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(formSchema),
  });

  const reauthenticate = async (email: string, oldPassword: string) => {
    const credential = EmailAuthProvider.credential(email, oldPassword);
    if (auth.currentUser) {
      await reauthenticateWithCredential(auth.currentUser, credential);
    }
  };
  const user = auth.currentUser;

  const onSubmit = async (data: FormField) => {
    try {
      if (user) {
        await reauthenticate(user.email!, data.oldPassword);

        await updatePassword(user, data.newPassword);

        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, {
          Fname: data.Fname,
          Lname: data.Lname,
        });

        console.log("Profile updated successfully");
        setisEdited(true);
      } else {
        console.error("No authenticated user found");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-14 mb-5 text-gray-500 min-h-screen">
      <Card>
        <h1 className="text-blue-400 font-semibold">
          Edit your profile details
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 grid grid-cols-2 gap-5 justify-around"
        >
          <Input
            title="First Name"
            error={errors?.Fname?.message}
            {...register("Fname")}
            type="text"
            placeholder="First Name"
          />
          <Input
            title="Last Name"
            error={errors?.Lname?.message}
            {...register("Lname")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            title="Current Password"
            error={errors?.oldPassword?.message}
            {...register("oldPassword")}
            type="password"
            placeholder="Old password"
          />

        <Input
            title="New Password"
            error={errors?.newPassword?.message}
            {...register("newPassword")}
            type="password"
            placeholder="New password"
          />

          <Input
            title="Current Password"
            error={errors?.confirmPassword?.message}
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm New password"
          />
          <div className="col-start-2">
            <button type="button" className="text-gray-500 mr-10">
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-500 outline-none border-none text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
        {isEdited && <div>User Details edited successfully</div>}
      </Card>
    </div>
  );
};

export default EditProfile;
