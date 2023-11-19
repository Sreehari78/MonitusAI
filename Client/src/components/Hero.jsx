"use client";
import "./styles/Hero.css";
import Image from "next/image";
import doctor from "../../public/doctor.png";
import { motion as m } from "framer-motion";

const hero = () => {
  return (
    <>
      <div className='hero' id='hero'>
        <m.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='hero-left'>
          <div className='l-text1'>Product Company</div>
          <div className='l-text2'>
            Pioneering ADR prediction for Safer Healthcare
          </div>
          <div className='l-text3'>
            "Monitus pioneers ADR prediction for safer healthcare. Our advanced
            AI technology proactively identifies potential risks, providing
            precise insights for informed decision-making and improved patient
            safety."
          </div>
          <div className='l-buttons'>
            <button className='l-button1'>Get Started &#10140;</button>
            <button className='l-button2'>How It Works &#10140;</button>
          </div>
        </m.div>
        <div className='hero-right'>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='transRectangle'></m.div>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className='doctorImg'>
            <Image src={doctor} alt='doctor' className='doctor' />
          </m.div>
        </div>
      </div>
    </>
  );
};

export default hero;
