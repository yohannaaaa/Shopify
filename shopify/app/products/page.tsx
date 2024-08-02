'use client';
import Image from "next/image";
import Intro from "../components/layout/ProductIntro/Intro";
import Hero from "../components/layout/Hero/Hero";
export default function Products() {
 
  return (
   <div className="flex flex-col">
   <Intro />
   <h1 className="text-4xl m-4 text-white font-sans">New Products</h1>
    <Hero />
   </div>
  );
}; 