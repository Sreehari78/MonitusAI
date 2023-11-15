"use client";

import React from "react";
import { Button } from "@mui/material";

const PredictButton = () => {
  return (
    <div>
      <Button
        variant='contained'
        disableElevation={true}
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
  );
};

export default PredictButton;
