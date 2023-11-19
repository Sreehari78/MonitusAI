"use client";

import SideBar from "@/components/SideBar";
import React from "react";
import { render } from "react-dom";
import BarChart from "@/components/BarChart";
import DonutChart from "@/components/DonutChart";
import PieChart from "@/components/PieChart";
const page = () => {
  return (
    <div className="flex">
      <SideBar activeButtonNumber={1} />
      <div className="w-[85vw] h-[100vh] bg-[#f3f8fe]">
        <div className="bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20">
          <div className="w-[80vw] flex gap-10">
            <div className="py-4 w-[30vw]">
              <BarChart />
            </div>
            <div className="py-4 w-[10vw]">
              <DonutChart />
            </div>
            <div className="py-4 w-[10vw]">
              <PieChart />
            </div>
            <div className="py-4 w-[10vw]">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
