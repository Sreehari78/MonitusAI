"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import {
  faWandMagicSparkles,
  faPieChart,
  faPills,
  faUpload,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import SideButton from "./SideButton";

const SideBar = (props) => {
  // The SideBar component is a functional component in React
  // It takes a prop 'activeButtonNumber' which indicates the currently active button on the sidebar
  let activeButton = props.activeButtonNumber;
  let buttonColorAttributes = [];

  // The component returns a sidebar with various buttons
  return (
    <div className='w-[15vw] h-[100vh] bg-[#DAF0F0] text-black flex flex-col justify-between '>
      <div className='flex flex-col justify-between gap-10 mx-8'>
        <div className='py-10 px-5 flex gap-3'>
          <Image src={Logo} width={30} height={30} alt='Monitus Logo' />
          <div className='text-[#6E7191] font-bold'>MONITUS</div>
        </div>
        <SideButton
          type='contained'
          {...(activeButton == 0
            ? ((buttonColorAttributes[0] = "#008081"),
              (buttonColorAttributes[1] = "#DAF0F0"))
            : ((buttonColorAttributes[0] = "#DAF0F0"),
              (buttonColorAttributes[1] = "#6E7191")))}
          color={buttonColorAttributes[0]}
          icon={faWandMagicSparkles}
          title='Predict'
          link='/predict'
          textColor={buttonColorAttributes[1]}
        />
        <SideButton
          type='contained'
          {...(activeButton == 1
            ? ((buttonColorAttributes[0] = "#008081"),
              (buttonColorAttributes[1] = "#DAF0F0"))
            : ((buttonColorAttributes[0] = "#DAF0F0"),
              (buttonColorAttributes[1] = "#6E7191")))}
          color={buttonColorAttributes[0]}
          icon={faPieChart}
          title='Reports'
          link='/reports'
          textColor={buttonColorAttributes[1]}
        />
        <SideButton
          type='contained'
          {...(activeButton == 2
            ? ((buttonColorAttributes[0] = "#008081"),
              (buttonColorAttributes[1] = "#DAF0F0"))
            : ((buttonColorAttributes[0] = "#DAF0F0"),
              (buttonColorAttributes[1] = "#6E7191")))}
          color={buttonColorAttributes[0]}
          icon={faPills}
          title='ADR Report'
          link='/adr'
          textColor={buttonColorAttributes[1]}
        />
        <SideButton
          type='contained'
          {...(activeButton == 3
            ? ((buttonColorAttributes[0] = "#008081"),
              (buttonColorAttributes[1] = "#DAF0F0"))
            : ((buttonColorAttributes[0] = "#DAF0F0"),
              (buttonColorAttributes[1] = "#6E7191")))}
          color={buttonColorAttributes[0]}
          icon={faUpload}
          title='Upload EHR'
          link='/upload'
          textColor={buttonColorAttributes[1]}
        />
      </div>
      <div className='mb-16 mx-8'>
        <SideButton
          type='contained'
          {...(activeButton == 4
            ? ((buttonColorAttributes[0] = "#008081"),
              (buttonColorAttributes[1] = "#DAF0F0"))
            : ((buttonColorAttributes[0] = "#DAF0F0"),
              (buttonColorAttributes[1] = "#6E7191")))}
          color={buttonColorAttributes[0]}
          icon={faRightFromBracket}
          title='Logout'
          link='/'
          textColor={buttonColorAttributes[1]}
        />
      </div>
    </div>
  );
};

export default SideBar;
