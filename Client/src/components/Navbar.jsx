import React from "react";
import Image from "next/image";
import Logo from "../../public/logo.svg";

const Navbar = () => {
  return (
    <nav className='flex my-10 h-[3vh] ml-6 relative justify-around'>
      <div className='flex lg:flex-1 items-center gap-4 '>
        <Image src={Logo} width={30} height={30} alt='Monitus Logo' />
        <div className=' font-bold text-2xl text-[#008081]'>Monitus</div>
      </div>
      <div className='flex flex-1 items-center'>
        <div className='flex-1'>
          <ul className='flex list-none justify-evenly font-bold'>
            <li>Home</li>
            <li>About</li>
            <li>Album</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
