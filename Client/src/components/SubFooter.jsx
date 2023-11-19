"use client";
import "./styles/SubFooter.css";
import Image from "next/image";
import lRightArrow from "../../public/light-right-arrow.svg";
import logo from "../../public/logo.svg";

const subFooter = () => {
  return (
    <div className='subFooter'>
      <div className='col col1'>
        <div className='sf-logo'>
          <Image src={logo} alt='' className='sf-logo-img' />
          <p className='sf-logo-text'>Monitus</p>
        </div>
        <div className='col1-text'>Eleanor Pena</div>
      </div>
      <div className='col col2'>
        <div className='col-heading'>ABOUT US</div>
        <ul className='sb-ul'>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Mission & Vision
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            our Company
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Our Projects
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Our Team
          </li>
        </ul>
      </div>
      <div className='col col3'>
        <div className='col-heading'>DISCOVER</div>
        <ul className='sb-ul'>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Projects & Research
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Clents Review
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Our Projects
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Our Team
          </li>
        </ul>
      </div>
      <div className='col col4'>
        <div className='col-heading'>USEFUL LINKS</div>
        <ul className='sb-ul'>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Contact Us
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Terms & Conditions
          </li>
          <li className='sb-li'>
            <Image src={lRightArrow} alt='' className='sb-li-img' />
            Review
          </li>
        </ul>
      </div>
    </div>
  );
};

export default subFooter;
