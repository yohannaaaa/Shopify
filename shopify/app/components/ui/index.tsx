'use client';

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext"; 
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormFields = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { logIn } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      clearErrors(); 
      const user = await logIn(data.email, data.password);
      if (user) {
        router.push('/products');
      } else {
        setError("root", {
          type: "manual",
          message: "Sign in failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="fixed inset-0 z-[-1] bg-cover bg-center">
        <Image src="/Products.jpg" alt="Background Image" layout="fill" />
      </div>
      <div className="flex items-center justify-center">
        <form className="absolute flex flex-col gap-4  bg-gray-800 p-10 text-white rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <h1 className='font-bold text-3xl'>Welcome Back</h1>
          <label htmlFor="email">Email</label>
          <div className="input input-bordered flex items-center gap-2 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="grow text-green"
            />
          </div>
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
          <label htmlFor="password">Password</label>
          <div className="input input-bordered flex items-center gap-2 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="grow text-blue-500"
            />
          </div>
          {errors.password && (
            <div className="text-red-600">{errors.password.message}</div>
          )}
          <button className="btn btn-outline btn-info">
            {isSubmitting ? "Loading..." : "Login"}
          </button>
          <div>
            Don't have an account? <Link href='/sign-up' className="text-info italic">Sign Up</Link>
          </div>
          {errors.root && <div className="text-red-600">{errors.root.message}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
