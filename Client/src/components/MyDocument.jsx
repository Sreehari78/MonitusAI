"use client";

import React from "react";
import { Button } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Input } from "@mui/material";
import ConvertApi from "convertapi-js";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const MyDocument = (props) => {
  // Initialize the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // Define the accepted file types
  const fileType = ["application/pdf"];

  // State variables for the PDF file and the view
  const [pdfFile, setPdfFile] = React.useState([]);
  const [viewPdf, setViewPdf] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Handler for file selection
  const handleChange = async (e) => {
    let selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check if the selected file is of the accepted file type
      if (selectedFile && fileType.includes(selectedFile.type)) {
        setLoading(true);
        let reader = new FileReader();

        reader.readAsDataURL(selectedFile);

        reader.onloadend = () => {
          // Set the PDF file state variable to the data URL of the selected file
          setPdfFile(reader.result);
        };
        setPdfFile(e.target.files[0]);
        let convertApi = ConvertApi.auth("gBTgo0spxZF4hfIS");
        let params = convertApi.createParams();
        params.add("File", e.target.files[0]);
        let result = await convertApi.convert("pdf", "txt", params);
        console.log(typeof result);
        const pdfLink = result.dto.Files[0];
        setLoading(false);
        // Call the parent component's callback function with the PDF file state variable
        props.handleCallback(pdfLink);
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
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Worker>
    </div>
  );
};

export default MyDocument;
