"use client";

import React, { useEffect } from "react";
import Fab from "@mui/material/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const VoiceButton = () => {
  // Initialize state variables for listening status, note content, and mute status
  const [isListening, setIsListening] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [isMuted, setIsMuted] = React.useState(false);

  // React useEffect hook to perform side effects when 'isMuted' state changes
  useEffect(() => {}, [isMuted]);

  // Initialize state variable for the microphone
  const [mic, setMic] = React.useState(null);

  // React useEffect hook to set up the microphone when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for SpeechRecognition API support
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        // Initialize a new SpeechRecognition object
        const newMic = new SpeechRecognition();
        newMic.continuous = true;
        newMic.interimResults = true;
        newMic.lang = "en-US";
        setMic(newMic);
      } else {
        console.log("SpeechRecognition not supported on this browser.");
        // Handle the case where SpeechRecognition API is not supported
      }
    }
  }, []);

  // Function to handle listening status
  const handleListening = () => {
    setIsListening(!isListening);
    setIsMuted(!isMuted);
    if (isListening) {
      // Start the microphone if it is listening
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start;
      };
    } else {
      // Stop the microphone if it is not listening
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }

    // Log when the microphone starts
    mic.onstart = () => {
      console.log("Mics on");
    };

    // Handle the result from the microphone
    mic.onresult = (event) => {
      // Convert the result to a transcript
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      // Handle errors from the microphone
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  return (
    <div className='text-black'>
      <Fab
        className='bg-[#008081] hover:bg-[#008081]'
        onClick={handleListening}>
        <FontAwesomeIcon
          icon={isMuted ? faMicrophone : faMicrophoneSlash}
          style={{ fontSize: "20px", color: "#F3F8FE" }}
        />
      </Fab>
      <p>{note}</p>
    </div>
  );
};

export default VoiceButton;
