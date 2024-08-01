"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useFirebaseAuth } from "@/firebase/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { firestore } from "@/firebase/config";
import { collection, addDoc } from "@firebase/firestore";
import { useRouter } from 'next/navigation';
import { create } from 'zustand'


type FormFields = {
  Fname: string;
  Lname: string;
  email: string;
  password: string;
};

async function addDataToFirestore(
  Fname: string,
  Lname: string,
  email: string,
  password: string
) {
  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      Fname,
      Lname,
      email,
      password,
    });
    console.log("Doc written w Id:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}
interface GenerationState{
isLoggedIn: boolean
setIsLoggedIn:(isLoggedIn: boolean) => void
}

export const useGenerationStore = create<GenerationState>()((set) => ({
  isLoggedIn : false,
  setIsLoggedIn: (isLoggedIn:boolean) => set({isLoggedIn})
}))

const SignUp = () => {
  const router = useRouter();
  const { register } = useForm<FormFields>();
  const { setIsLoggedIn } = useGenerationStore()
  const [email, setEmail] = useState("");
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useFirebaseAuth();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault(); 
    
      try {
        const res = await createUserWithEmailAndPassword(email, password);
          const added = await addDataToFirestore(Fname, Lname, email, password);
          // console.log("User added to Firestore:", added);
    
          sessionStorage.setItem("user", "true");
    
          if (added) {
            setEmail("");
            setPassword("");
            setFName("");
            setLName("");
            router.push('/login');
          }
        
      } catch (error) {
        console.error("Error during signup or Firestore operation:", error);
      }
    };
    


  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-xl mt-[-35rem] rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="fixed inset-0 z-[-1] bg-cover bg-center">
            <Image src="/Products.jpg" alt="" layout="fill" />
          </div>
          <form className="absolute flex flex-col gap-4 bg- text-white rounded-lg" method="post">
            <h1 className="text-white text-2xl mb-5">Sign Up</h1>
            <label htmlFor="Fname" className="">
              First Name
            </label>
            <input
              {...register("Fname")}
              type="text"
              placeholder="First name"
              value={Fname}
              onChange={(e) => setFName(e.target.value)}
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            <label htmlFor="Lname" className="">
              Last Name
            </label>
            <input
              {...register("Lname")}
              type="text"
              placeholder="Last name"
              value={Lname}
              onChange={(e) => setLName(e.target.value)}
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            <label htmlFor="email" className="pt-">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered flex items-center gap-2 text-blue-600"
            />
            <label htmlFor="password" className="pt-">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered flex items -center gap-2 text-blue-600"
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