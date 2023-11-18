"use client";

import Dropbox from "@/components/Dropbox";
import SideBar from "@/components/SideBar";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import ReactionCard from "@/components/ReactionCard";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion as m } from "framer-motion";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const page = () => {
  // State variables for listening status, note content, mute status, microphone and selected patient
  const [isListening, setIsListening] = React.useState(false); // State variable for microphone listening status
  const [note, setNote] = React.useState(""); // State variable for storing the transcribed note
  const [isMuted, setIsMuted] = React.useState(true); // State variable for microphone mute status
  const [mic, setMic] = React.useState(null); // State variable for the microphone object
  const [selectedPatient, setSelectedPatient] = React.useState(""); // State variable for storing the selected patient

  // Callback function to set the selected patient
  function CallBack(childData) {
    setSelectedPatient(childData); // Set the selected patient to the data received from the child component
  }

  // Initialize SpeechRecognition on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition; // Use the appropriate SpeechRecognition object depending on the browser
      if (SpeechRecognition) {
        const newMic = new SpeechRecognition(); // Create a new SpeechRecognition object
        newMic.continuous = true; // Set the microphone to continuous mode
        newMic.interimResults = true; // Set the microphone to return interim results
        newMic.lang = "en-US"; // Set the language of the microphone to English (US)
        setMic(newMic); // Set the microphone state variable to the new microphone object
      } else {
        console.log("SpeechRecognition not supported on this browser."); // Log a message if SpeechRecognition is not supported on the browser
      }
    }
  }, []);

  // Handle microphone listening
  const handleListening = () => {
    setIsListening(!isListening); // Toggle the listening status
    setIsMuted(!isMuted); // Toggle the mute status
    if (isListening) {
      mic.start(); // Start the microphone if it is listening
      mic.onend = () => {
        console.log("continue..");
        mic.start; // Restart the microphone when it ends
      };
    } else {
      mic.stop(); // Stop the microphone if it is not listening
      mic.onend = () => {
        console.log("Stopped Mic on Click"); // Log a message when the microphone is stopped
      };
    }

    mic.onstart = () => {
      console.log("Mics on"); // Log a message when the microphone starts
    };

    // Handle speech recognition results
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(""); // Transcribe the speech into text
      console.log(transcript); // Log the transcribed text
      setNote(transcript); // Set the note state variable to the transcribed text
      mic.onerror = (event) => {
        console.log(event.error); // Log any errors that occur during speech recognition
      };
    };
  };

  const [recievedData, setRecievedData] = React.useState([]); // State variable for storing the data received from the server
  const [isPredicting, setIsPredicting] = React.useState(false); // State variable for prediction status
  const [showDiv, setShowDiv] = React.useState(false); // State variable for showing/hiding a div

  // Handle prediction
  const handlePredict = async () => {
    if (selectedPatient === "" || note === "") return; // Return if no patient is selected or if the note is empty
    try {
      setShowDiv(true); // Show the div
      const response = await fetch("http://localhost:5000/get_prediction", {
        // Send a POST request to the server with the selected patient and note
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: selectedPatient, prescription: note }),
      });

      // Parse the response as JSON
      const jsonData = await response.json();
      const data = jsonData.result;
      // Set the patients state variable to the names of  the patients
      setRecievedData(data); // Set the received data state variable to the data received from the server
      setIsPredicting(true); // Set the predicting status to true
      setShowDiv(false); // Hide the div
      console.log(recievedData); // Log the received data
      console.log(recievedData[0]); // Log the first item in the received data
      console.log(data[0].DrugName); // Log the DrugName property of the first item in the data
    } catch (error) {
      console.error("Error during upload:", error); // Log any errors that occur during the upload
    }
  };

  // State variable and ref for carousel width
  const [leftWidth, setLeftWidth] = React.useState(0); // State variable for the left width of the carousel
  const carsousel = React.useRef(); // Ref for the carousel

  // Update leftWidth on component mount
  useEffect(() => {
    setLeftWidth(
      carsousel.current.scrollWidth * 1.5 - carsousel.current.offsetWidth
    ); // Set the left width state variable to the scroll width of the carousel minus its offset width
  }, []);

  return (
    <div className='flex'>
      <SideBar activeButtonNumber={0} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col pt-40 px-40 gap-12 '>
        <Dropbox handleCallback={CallBack} />
        <TextareaAutosize
          maxRows={10}
          minRows={8}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          onClick={(e) => setNote(e.target.value)}
          style={{
            color: "#1e1e1e",
            fontSize: "18px",
            width: "50vw",
            height: "20vh",
            padding: "1rem",
            backgroundColor: "#deeeeb",
            borderRadius: "8px",
            border: "2px solid #008081",
            ":hover": { bgcolor: "#c6dada" },
            ":focus": { bgcolor: "#cde2e2" },
          }}
        />

        <div className='flex justify-between w-[50vw]'>
          <Fab
            className='bg-[#008081] hover:bg-[#008081]'
            onClick={handleListening}>
            <FontAwesomeIcon
              icon={isMuted ? faMicrophone : faMicrophoneSlash}
              style={{ fontSize: "20px", color: "#F3F8FE" }}
            />
          </Fab>
          <Button
            variant='contained'
            disableElevation={true}
            onClick={handlePredict}
            style={{
              textAlign: "center",
              backgroundColor: "#008081",
              borderRadius: "12px",
              width: "8rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              color: "#F3F8FE",
            }}>
            Predict
          </Button>
        </div>
        {!isPredicting && showDiv && (
          <div className='flex justify-center mt-20 w-[50vw]'>
            <CircularProgress color='success' size={50} />
          </div>
        )}

        <div className='flex'>
          <div
            ref={carsousel}
            className='flex justify-center cursor-grab overflow-hidden w-[50vw] bg-[#deeeeb] rounded-[20px] px-2'>
            {isPredicting && (
              <m.div
                initial={{ x: leftWidth, opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                whileTap={{ cursor: "grabbing" }}
                drag='x'
                dragConstraints={{ right: leftWidth, left: -leftWidth }}
                className='flex gap-16 py-4 h-72'>
                {recievedData.map((adr, item) => (
                  <ReactionCard
                    key={item}
                    drugName={adr.DrugName}
                    possibleInteractions={adr.PossibleInteractions}
                    sideEffects={adr.SideEffects}
                    riskColor={adr.Risk_level}
                    riskInfo={adr.Riskinfo}
                  />
                ))}
              </m.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
