"use client";
import { Link } from "react-scroll";
import Image from "next/image";
import { useState } from "react";
import logo from "../../public/logo.svg";
import downArrow from "../../public/Arrow-down.svg";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div className='flex justify-between bg-[#f3f8fe] gap-80 z-50 py-8 px-10'>
      <div className='flex h-fit gap-5'>
        <Image src={logo} alt='logo' width={35} height={35} />
        <p className='text-[#008081] font-semibold text-2xl'>Monitus</p>
      </div>
      <div className='flex flex-auto justify-end'>
        <div className='flex-1'>
          <ul className='flex justify-evenly list-none gap-5'>
            <li>
              <Link to='hero' smooth={true} offset={-70} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to='about' smooth={true} offset={-70} duration={500}>
                About <img src={downArrow} alt='' className='downArrow' />
              </Link>
            </li>
            <li>
              <Link to='services' smooth={true} offset={-70} duration={500}>
                Company <img src={downArrow} alt='' className='downArrow' />
              </Link>
            </li>
            <li>
              <Link to='contact' smooth={true} offset={-70} duration={500}>
                Pages <img src={downArrow} alt='' className='downArrow' />
              </Link>
            </li>
            <li>
              <Link to='contact' smooth={true} offset={-70} duration={500}>
                Blog <img src={downArrow} alt='' className='downArrow' />
              </Link>
            </li>
            <li>
              <Link to='contact' smooth={true} offset={-70} duration={500}>
                Shop <img src={downArrow} alt='' className='downArrow' />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
