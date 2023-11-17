"use client";

import React from "react";
import { Button } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Input } from "@mui/material";

const MyDocument = (props) => {
  // Initialize the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // Define the accepted file types
  const fileType = ["application/pdf"];

  // State variables for the PDF file and the view
  const [pdfFile, setPdfFile] = React.useState(null);
  const [viewPdf, setViewPdf] = React.useState(null);

  // Handler for file selection
  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    // Check if a file is selected
    if (selectedFile) {
      // Check if the selected file is of the accepted file type
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        // Read the selected file as a data URL
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          // Set the PDF file state variable to the data URL of the selected file
          setPdfFile(reader.result);
        };
      } else {
        // If the selected file is not of the accepted file type, set the PDF file state variable to null
        setPdfFile(null);
      }
    } else {
      console.log("select a file");
    }
  };

  // Handler for PDF submission
  const handleSubmitPDF = (e) => {
    e.preventDefault();
    // Call the parent component's callback function with the PDF file state variable
    props.handleCallback(pdfFile);
    // If there is a PDF file, set the view PDF state variable to the PDF file state variable
    // Otherwise, set the view PDF state variable to null
    if (pdfFile) setViewPdf(pdfFile);
    else setViewPdf(null);
  };

  return (
    <div className='h-[50vh] w-screen text-black flex flex-col gap-8'>
      <form className='flex justify-between'>
        <Input type='file' onChange={handleChange} />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleSubmitPDF}
          style={{ backgroundColor: "#008081" }}>
          View PDF
        </Button>
      </form>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
        {viewPdf && (
          <>
            <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
          </>
        )}
        {!viewPdf && <>Upload a PDF to View it here</>}
      </Worker>
    </div>
  );
};

export default MyDocument;
