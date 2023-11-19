"use client";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import SideBar from "@/components/SideBar";
import PieChart from "@/components/PieChart";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={1} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>
        <PieChart />
      </div>
    </div>
  );
};

export default page;
