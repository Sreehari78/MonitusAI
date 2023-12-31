"use client";
import { Link } from "react-scroll";
import Image from "next/image";
import logo from "../../public/logo.svg";

const Navbar = (props) => {
  return (
    <div className='flex justify-between bg-[#f3f8fe] gap-[50vw] z-50 py-8 px-10'>
      <div className='flex h-fit gap-5'>
        <Image src={logo} alt='logo' width={35} height={35} />
        <p className='text-[#008081] font-semibold text-2xl'>Monitus</p>
      </div>
      <div className='flex flex-auto justify-end'>
        <div className='flex-1'>
          <ul className='flex justify-evenly list-none gap-5'>
            <li>
              <Link to={props.hero} smooth={true} offset={-70} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to={props.features}
                smooth={true}
                offset={-70}
                duration={500}>
                Features
              </Link>
            </li>
            <li>
              <Link to={props.about} smooth={true} offset={-70} duration={500}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
