"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useFirebaseAuth } from "@/firebase/config";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import Image from "next/image";

type FormFields ={
  name: string;
  email: string;
  password: string;

}


const SignUp = () => {
  const { register } = useForm<FormFields>();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useFirebaseAuth();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const  handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-xl mt-[-35rem] rounded-xl">
        <div className="flex flex-col gap-4">
        <div className="fixed inset-0 z-[-1] bg-cover bg-center">
        <Image src="/Products.jpg" alt="" layout="fill" />
      </div>
      <form className=" absolute flex flex-col gap-4  bg- text-white rounded-lg " >
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <label htmlFor="email" className="">
            Name
          </label>
        <input
          {...register('name')}
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered flex items-center gap-2 text-blue-600"
        />
        <label htmlFor="email" className="pt-">
            Email
          </label>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered flex items-center gap-2 text-blue-600"
        />
        {/* <label htmlFor="email" className="pt-">
            Password
          </label>
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered flex items-center gap-2 text-blue-600"
        /> */}
        <label htmlFor="email" className="pt-">
            Password
          </label>
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered flex items-center gap-2 text-blue-600"
        />

        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
