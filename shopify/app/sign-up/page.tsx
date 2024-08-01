"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const schema = z.object({
  Fname: z.string().min(1, "First name is required"),
  Lname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormFields = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const router = useRouter();
  const { signUp, currentUser } = useAuth();  

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
        password: data.password,
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
            <label htmlFor="Fname">First Name</label>
            <input
              {...register("Fname")}
              type="text"
              placeholder="First name"
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            {errors.Fname && (
              <div className="text-red-600">{errors.Fname.message}</div>
            )}
            <label htmlFor="Lname">Last Name</label>
            <input
              {...register("Lname")}
              type="text"
              placeholder="Last name"
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            {errors.Lname && (
              <div className="text-red-600">{errors.Lname.message}</div>
            )}
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            {errors.password && (
              <div className="text-red-600">{errors.password.message}</div>
            )}
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
