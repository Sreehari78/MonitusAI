"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SubFooter from "@/components/SubFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className='flex'>
      <div className='w-[100vw] h-[100vh] bg-[#f3f8fe] text-black'>
        <Navbar />
        <Hero />
        <Features />
        <SubFooter />
        <Footer />
      </div>
    </main>
  );
}
