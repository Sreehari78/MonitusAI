"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SubFooter from "@/components/SubFooter";
import Footer from "@/components/Footer";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-scroll";
import Image from "next/image";
import logo from "../../public/logo.svg";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <main>
      <div className='w-[100vw] h-[100vh] bg-[#f3f8fe] text-black'>
        <motion.div
          className='fixed h-5 bg-[#008081] origin-top'
          style={{ scaleX: scrollYProgress }}
        />
        <div className='flex justify-between bg-[#f3f8fe] gap-[50vw] z-50 py-8 px-10'>
          <div className='flex h-fit gap-5'>
            <Image src={logo} alt='logo' width={35} height={35} />
            <p className='text-[#008081] font-semibold text-2xl'>Monitus</p>
          </div>
          <div className='flex flex-auto justify-end'>
            <div className='flex-1'>
              <ul className='flex justify-evenly list-none gap-5'>
                <li className=' hover:cursor-pointer'>
                  <Link to={"hero"} smooth={true} offset={-70} duration={500}>
                    Home
                  </Link>
                </li>
                <li className=' hover:cursor-pointer'>
                  <Link
                    to={"features"}
                    smooth={true}
                    offset={-70}
                    duration={500}>
                    Features
                  </Link>
                </li>
                <li className=' hover:cursor-pointer'>
                  <Link to={"footer"} smooth={true} offset={-70} duration={500}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Hero name='home' />
        <Features name='features' />
        <SubFooter />
        <Footer name='footer' />
      </div>
    </main>
  );
}
