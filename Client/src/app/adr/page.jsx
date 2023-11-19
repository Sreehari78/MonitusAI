"use client";
import Dropbox from "@/components/Dropbox";
import SideBar from "@/components/SideBar";
import { TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactionReport from "@/components/ReactionReport";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const page = () => {
  const [patientName, setPatientName] = useState("");
  const [reactionName, setReactionName] = useState("");
  const [reactionList, setReactionList] = useState([]);
  const [isTextField, setIsTextField] = useState(false);

  const handleReactionName = (event) => {
    setReactionName(event.target.value);
  };

  function CallBack(childData) {
    setPatientName(childData);
  }

  const handlePatientSelect = async () => {
    try {
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
        setReactionList(jsonData.reaction);
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  const toggleTextField = () => {
    setIsTextField(!isTextField);
  };

  const handleSelect = (event) => {
    if (event.key === "Enter" && reactionName.trim() !== "") {
      setReactionList([...reactionList, reactionName]);
      setReactionName("");
    }
  };

  const handleDelete = (nameToDelete) => {
    const updatedList = reactionList.filter((item) => item !== nameToDelete);
    setReactionList(updatedList);
  };

  const handleUpload = async () => {
    try {
      const response = await fetch("http://localhost:5000/reported_adrs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adrs: reactionList }),
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
  };
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={2} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>
        <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
          <div className='flex gap-5'>
            <Dropbox handleCallback={CallBack} />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
