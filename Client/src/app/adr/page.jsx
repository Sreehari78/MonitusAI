"use client";
import Dropbox from "@/components/Dropbox";
import SideBar from "@/components/SideBar";
import { TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactionReport from "@/components/ReactionReport";
import { useEffect, useState } from "react";

const page = () => {
  const [patientName, setPatientData] = useState("");
  const [reactionName, setReactionName] = useState("");
  const [reactionList, setReactionList] = useState([]);
  const [isTextField, setIsTextField] = useState(false);

  const handleReactionName = (event) => {
    setReactionName(event.target.value);
  };

  function CallBack(childData) {
    setPatientData(childData);
  }

  const handlePatientSelect = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: patientName }),
      }); // Replace with your backend endpoint
      if (response.ok) {
        const data = await response.json();
        setPatientData(data); // Set the fetched data in state
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state if needed
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

  return (
    <div className='flex'>
      <SideBar activeButtonNumber={2} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>
        <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
          <Dropbox handleCallback={CallBack} />

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
            {isTextField ? (
              <div className='flex gap-5'>
                <TextField
                  color='success'
                  placeholder='Enter Name'
                  onChange={handleReactionName}
                  onKeyDown={handleSelect}
                  colour='success'
                  style={{
                    width: "45vw",
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
