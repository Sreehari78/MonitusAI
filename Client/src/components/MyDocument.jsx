"use client";

import React from "react";
import { Button } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Input } from "@mui/material";

const MyDocument = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const fileType = ["application/pdf"];
  const [pdfFile, setPdfFile] = React.useState(null);
  const [viewPdf, setViewPdf] = React.useState(null);

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          setPdfFile(reader.result);
        };
      } else setPdfFile(null);
    } else console.log("select a file");
  };

  const handleSubmitPDF = (e) => {
    e.preventDefault();
    localStorage.setItem("pdfData", pdfFile);
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
