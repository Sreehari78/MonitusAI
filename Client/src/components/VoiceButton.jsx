"use client";

import React, { useEffect } from "react";
import Fab from "@mui/material/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const VoiceButton = () => {
  const [isListening, setIsListening] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [isMuted, setIsMuted] = React.useState(false);
  useEffect(() => {}, [isMuted]);

  const [mic, setMic] = React.useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
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

  const handleListening = () => {
    setIsListening(!isListening);
    setIsMuted(!isMuted);
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start;
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }

    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  return (
    <div className="text-black">
      <Fab
        className="bg-[#008081] hover:bg-[#008081]"
        onClick={handleListening}
      >
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
