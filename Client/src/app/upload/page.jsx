"use client";

import SideBar from "@/components/SideBar";

import React from "react";
import { Button } from "@mui/material";
import MyDocument from "@/components/MyDocument";
import { TextField } from "@mui/material";

const page = () => {
  const [name, setName] = React.useState("");
  const handleName = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const handleUpload = async () => {
    const storedPdfData = localStorage.getItem("pdfData");
    if (storedPdfData) {
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfData: storedPdfData,
            name: name,
          }),
        });

        if (response.ok) {
          console.log("Upload successful");
          // Additional logic after successful upload if needed
        } else {
          console.error("Failed to upload");
        }
      } catch (error) {
        console.error("Error during upload:", error);
      }
    } else {
      console.error("No PDF data found in localStorage.");
    }
  };

  return (
    <div className='flex'>
      <SideBar activeButtonNumber={4} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
        <TextField placeholder='Enter Name' onChange={handleName} />
        <div className='flex justify-end w-[50vw]'>
          <MyDocument url='https://pdfobject.com/pdf/sample.pdf' />
        </div>
        <Button
          variant='contained'
          disableElevation={true}
          onClick={handleUpload}
          style={{
            textAlign: "center",
            backgroundColor: "#008081",
            borderRadius: "12px",
            width: "8rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            color: "#F3F8FE",
          }}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default page;
