"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore"; 
import { firestore } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Input from "../components/ui/Input";

const schema = z.object({
  Fname: z.string().min(1, "First name is required"),
  Lname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormFields = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const router = useRouter();
  const { signUp } = useAuth();  

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const userCredential = await signUp(data.email, data.password);
      const user = userCredential.user;

      if (!user) {
        throw new Error("User is not authenticated");
      }

      const userRef = doc(firestore, 'users', user.uid); 
      await setDoc(userRef, {
        Fname: data.Fname,
        Lname: data.Lname,
        email: data.email,
      });

      router.push("/login");
    } catch (error) {
      console.error("Error during signup or Firestore operation:", error);
      setError("root", {
        message: "An error occurred during signup. Please try again.",
      });
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-xl mt-[-35rem] rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="fixed inset-0 z-[-1] bg-cover bg-center">
            <Image src="/Products.jpg" alt="" layout="fill" />
          </div>
          <form
            className="absolute flex flex-col gap-4 bg- text-white rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-white text-2xl mb-5">Sign Up</h1>
            <Input
              {...register("Fname")}
              title="First Name"
              type="text"
              placeholder="First name"
              error={errors?.Fname?.message}
            />
            <Input
              {...register("Fname")}
              title="Last Name"
              type="text"
              placeholder="Last name"
              error={errors?.Lname?.message}
            />
            
            <Input
              {...register("email")}
              title="Email"
              type="text"
              placeholder="Email"
              error={errors?.email?.message}
            />

            <Input
              {...register("password")}
              title="Password"
              type="text"
              placeholder="Pasword"
              error={errors.password?.message}
            />
            
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign Up"}
            </button>
            {errors.root && (
              <div className="text-red-600">{errors.root.message}</div>
            )}
            <div>
              Already have an account? <Link href="/login" className="text-primary italic">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
