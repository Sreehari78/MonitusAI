"use client";
import Dropbox from "@/components/Dropbox";
import SideBar from "@/components/SideBar";
import { TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactionReport from "@/components/ReactionReport";
import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const page = () => {
  // State variables for patient name, reaction name, reaction list and a boolean for text field
  const [patientName, setPatientName] = useState("");
  const [reactionName, setReactionName] = useState("");
  const [reactionList, setReactionList] = useState([]);
  const [isTextField, setIsTextField] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // Handler for reaction name input field
  const handleReactionName = (event) => {
    setReactionName(event.target.value);
  };

  // Callback function to set patient name
  function CallBack(childData) {
    setPatientName(childData);
  }

  // Handler for patient selection
  const handlePatientSelect = async () => {
    try {
      // Clear the reaction list
      setReactionList([]);
      // Make a POST request to get ADR (Adverse Drug Reaction) for the selected patient
      const response = await fetch("http://localhost:5000/get_adr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patient: patientName }),
      });

      // Check if the request was successful
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData.reaction);
        // If there are reactions, set them in the reaction list
        if (jsonData.reaction) {
          setReactionList(jsonData.reaction);
        }
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  // Function to toggle the visibility of the text field
  const toggleTextField = () => {
    setIsTextField(!isTextField);
  };

  // Handler for select event
  const handleSelect = (event) => {
    // If Enter key is pressed and reaction name is not empty, add it to the reaction list
    if (event.key === "Enter" && reactionName.trim() !== "") {
      setReactionList([...reactionList, reactionName]);
      setReactionName("");
    }
  };

  // Handler for delete event
  const handleDelete = (nameToDelete) => {
    // Filter out the reaction to be deleted from the reaction list
    const updatedList = reactionList.filter((item) => item !== nameToDelete);
    setReactionList(updatedList);
  };

  // Handler for upload event
  const handleUpload = async () => {
    if (patientName === "") return;
    try {
      // Make a POST request to upload reported ADRs for the selected patient
      const response = await fetch("http://localhost:5000/reported_adrs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patient: patientName, adrs: reactionList }),
      });

      // Check if the request was successful
      if (response.ok) {
        console.log(response);
        setOpen(true);
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
    // Clear the reaction list after upload
    setReactionList([]);
  };
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={2} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>
        <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
          <div className='flex gap-5'>
            <Dropbox handleCallback={CallBack} isPatients={true} />
            <Button
              variant='contained'
              disableElevation={true}
              onClick={handlePatientSelect}
              style={{
                textAlign: "center",
                backgroundColor: "#008081",
                borderRadius: "12px",
                width: "8rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                color: "#F3F8FE",
              }}>
              Search
            </Button>
          </div>

          <div className='w-[50vw] flex flex-col gap-1'>
            <div className=' h-[30vh] bg-[#deeeeb] border-2 p-3 flex flex-wrap mb-5 gap-5'>
              {reactionList.map((item, index) => (
                <ReactionReport
                  drug={item}
                  onDelete={handleDelete}
                  key={index}
                />
              ))}
            </div>
            <div className='flex gap-8'>
              {isTextField ? (
                <div className='flex gap-5'>
                  <TextField
                    color='success'
                    placeholder='Enter Name'
                    onChange={handleReactionName}
                    onKeyDown={handleSelect}
                    colour='success'
                    style={{
                      width: "35vw",
                      backgroundColor: "#deeeeb",
                    }}
                  />
                  <Fab
                    style={{ backgroundColor: "#cc0000", color: "#FFFFFF" }}
                    aria-label='remove'
                    onClick={toggleTextField}>
                    <RemoveIcon />
                  </Fab>
                </div>
              ) : (
                <Fab
                  style={{ backgroundColor: "#008081", color: "#FFFFFF" }}
                  aria-label='add'
                  onClick={toggleTextField}>
                  <AddIcon />
                </Fab>
              )}
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
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  sx={{ width: "100%", backgroundColor: "#008081" }}>
                  Data Uploaded successfully!
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
