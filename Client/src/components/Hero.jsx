"use client";
import "./styles/Hero.css";
import Image from "next/image";
import doctor from "../../public/doctor.png";
import Waves from "../../public/waves.svg";

const hero = () => {
  return (
    <>
      <div className='hero' id='hero'>
        <div className='hero-left'>
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
        </div>
        <div className='hero-right'>
          <div className='transRectangle'></div>
          <div className='doctorImg'>
            <Image src={doctor} alt='doctor' className='doctor' />
          </div>
          <div className='whiteRectangle'></div>
          <div className='wavesImg'>
            <Image src={Waves} alt='waves' className='waves' />
          </div>
        </div>
      </div>
    </>
  );
};

export default hero;
