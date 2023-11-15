"use client";

import React, { useEffect } from "react";
import Dropbox from "@/components/Dropbox";
import PredictButton from "@/components/PredictButton";
import SideBar from "@/components/SideBar";
import Fab from "@mui/material/Fab";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion as m } from "framer-motion";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactionCard from "@/components/ReactionCard";

const page = () => {
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

  const [leftWidth, setLeftWidth] = React.useState(0);
  const carsousel = React.useRef();

  useEffect(() => {
    setLeftWidth(carsousel.current.scrollWidth - carsousel.current.offsetWidth);
  }, []);

  return (
    <div className='flex'>
      <SideBar activeButtonNumber={0} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col pt-40 px-40 gap-12'>
        <Dropbox />
        <TextareaAutosize
          maxRows={10}
          minRows={8}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onClick={(e) => setNote(e.target.value)}
          style={{
            color: "#6E7191",
            width: "50vw",
            backgroundColor: "#EEEEEE",
            borderRadius: "8px",
            border: "1px solid #6E7191",
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
          <PredictButton />
        </div>

        <div className='flex'>
          <div
            ref={carsousel}
            className='flex justify-center cursor-grab overflow-hidden w-[50vw] bg-[#EEEEEE] rounded-[20px] px-2'>
            <m.div
              initial={{ x: leftWidth }}
              whileTap={{ cursor: "grabbing" }}
              drag='x'
              dragConstraints={{ right: leftWidth, left: -leftWidth }}
              className='flex gap-16 py-4'>
              <ReactionCard />
            </m.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
