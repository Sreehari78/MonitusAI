"use client";
import SideBar from "@/components/SideBar";
import PieChart from "@/components/PieChart";
import React from "react";
import Dropbox from "@/components/Dropbox";
import { Button } from "@mui/material";

const page = () => {
  const [selectedDrug, setSelectedDrug] = React.useState(""); // State variable for storing the selected patient
  const [recievedData, setRecievedData] = React.useState([]); // State variable for storing the selected patient

  function CallBack(childData) {
    setSelectedDrug(childData); // Set the selected patient to the data received from the child component
  }

  const handleStats = async () => {
    if (selectedDrug === "") return; // Return if no patient is selected or if the note is empty
    try {
      const response = await fetch("http://localhost:5000/get_stats", {
        // Send a POST request to the server with the selected patient and note
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drug: selectedDrug }),
      });

      // Parse the response as JSON
      const jsonData = await response.json();
      const data = jsonData.sideEffects;
      setRecievedData(data); // Set the received data state variable to the data received from the server
    } catch (error) {
      console.error("Error during upload:", error); // Log any errors that occur during the upload
    }
  };

  return (
    <div className='flex'>
      <SideBar activeButtonNumber={1} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
        <div className='flex gap-5'>
          <Dropbox handleCallback={CallBack} isPatients={false} />
          <Button
            variant='contained'
            disableElevation={true}
            onClick={handleStats}
            style={{
              textAlign: "center",
              backgroundColor: "#008081",
              borderRadius: "12px",
              width: "8rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              color: "#F3F8FE",
            }}>
            Get Stats
          </Button>
        </div>
        {selectedDrug !== "" && (
          <div className='text-[#008081] text-2xl'>
            Observed Symptom for {selectedDrug}
          </div>
        )}
        <div className='w-[60vw] h-[40vh]'>
          <PieChart chartData={recievedData} />
        </div>
      </div>
    </div>
  );
};

export default page;
