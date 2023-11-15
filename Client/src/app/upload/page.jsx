"use client";

import SideBar from "@/components/SideBar";
import Dropbox from "@/components/Dropbox";
import UploadButton from "@/components/UploadButton";

import React from "react";
import MyDocument from "@/components/MyDocument";

const page = () => {
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={4} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
        <Dropbox />

        <div className='flex justify-end w-[50vw]'>
          <MyDocument url='https://pdfobject.com/pdf/sample.pdf' />
        </div>
      </div>
    </div>
  );
};

export default page;
