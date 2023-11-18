import SideBar from "@/components/SideBar";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={1} />
      <div className='w-[85vw] h-[100vh]'>Reports Page</div>
    </div>
  );
};

export default page;
