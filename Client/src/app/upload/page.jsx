"use client";

import SideBar from "@/components/SideBar";
import React, { use } from "react";
import { Button } from "@mui/material";
import MyDocument from "@/components/MyDocument";
import { TextField } from "@mui/material";
import ConvertApi from "convertapi-js";

const page = () => {
  // State variable for patient name and stored PDF data
  const [PatientName, setPatientName] = React.useState("");
  const [storedPdfData, setStoredPdfData] = React.useState(null);

  // Callback function to set stored PDF data
  function CallBack(childData) {
    setStoredPdfData(childData);
  }

  // Handler for patient name input
  const handleName = (event) => {
    setPatientName(event.target.value);
  };

  // Handler for upload action
  const handleUpload = async () => {
    // Check if there is stored PDF data
    if (storedPdfData) {
      try {
        // Send a POST request to the server with the PDF data and patient name
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pdfData: storedPdfData, name: PatientName }),
        });

        // Check if the request was successful
        if (response.ok) {
          console.log(response);
        } else {
          console.error("Failed to upload");
        }
      } catch (error) {
        console.error("Error during upload:", error);
      }
    } else {
      console.error("No PDF data found.");
    }
  };

  return (
    <div className='flex'>
      <SideBar activeButtonNumber={4} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
        <TextField placeholder='Enter Name' onChange={handleName} />
        <div className='flex justify-end w-[50vw]'>
          <MyDocument handleCallback={CallBack} />
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
