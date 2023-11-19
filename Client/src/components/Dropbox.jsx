"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { use, useEffect, useState } from "react";

export default function Dropbox(props) {
  // State variable for the list of patients

  const [myOptions, setMyOptions] = useState([]);

  // Handler for dropdown change
  const handleDropdownChange = (e) => {
    // Get the selected patient data from the dropdown
    const selectedPatientData = e.target.getAttribute("data-option-index");
    // Call the parent component's callback function with the selected patient data
    props.handleCallback(myOptions[selectedPatientData]);
  };

  // Function to fetch patients
  const fetchPatients = React.useCallback(async () => {
    try {
      // Send a POST request to the server to get all patients
      const response = await fetch("http://localhost:5000/get_all_patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the response as JSON
      const result = await response.json();
      // Set the patients state variable to the names of the patients
      setMyOptions(result.names);
    } catch (error) {
      // Log an error message if there is an error fetching patient details
      setError("Error fetching patient details");
      console.error("Error fetching patient details:", error);
    }
  }, []);

  // Function to fetch Drugs
  const fetchDrug = React.useCallback(async () => {
    try {
      // Send a POST request to the server to get all Drugs
      const response = await fetch("http://localhost:5000/get_all_medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the response as JSON
      const result = await response.json();
      // Set the Drugs state variable to the names of the Drugs
      setMyOptions(result.medicines);
    } catch (error) {
      // Log an error message if there is an error fetching Drug details
      setError("Error fetching Drug details");
      console.error("Error fetching Drug details:", error);
    }
  }, []);

  useEffect(() => {
    // Fetch patients/Drugs when the component is mounted
    if (props.isPatients) fetchPatients();
    else fetchDrug();
  }, []);

  return (
    <div className='flex gap-3'>
      <Autocomplete
        disablePortal
        options={myOptions}
        sx={{
          width: { sm: 100, md: 200, lg: 250, xl: 350 },
          bgcolor: "#deeeeb",
          "& fieldset": { borderColor: "#008081" },
        }}
        onChange={handleDropdownChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.isPatients ? "Patients" : "Drugs"}
            color='success'
            variant='filled'
            key={params.id}
          />
        )}
      />
    </div>
  );
}
