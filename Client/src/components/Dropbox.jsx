import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";

export default function Dropbox(props) {
  // State variable for the list of patients
  const [patients, setPatients] = useState([]);

  // Handler for dropdown change
  const handleDropdownChange = (e, value) => {
    // Get the selected patient data from the dropdown
    const selectedPatientData = e.target.getAttribute("data-option-index");
    // Call the parent component's callback function with the selected patient data
    props.handleCallback(patients[selectedPatientData]);
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
      setPatients(result.names);
    } catch (error) {
      // Log an error message if there is an error fetching patient details
      setError("Error fetching patient details");
      console.error("Error fetching patient details:", error);
    }
  }, []);

  // Effect hook to fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className='flex gap-3'>
      <Autocomplete
        disablePortal
        options={patients}
        inputComponent={OutlinedInput}
        sx={{
          borderRadius: "12px",
          width: { sm: 100, md: 200, lg: 250, xl: 350 },
          bgcolor: "#EEEEEE",
          "& fieldset": { borderColor: "#DAF0F0" },
        }}
        onChange={handleDropdownChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Patient'
            color='success'
            variant='filled'
          />
        )}
      />
    </div>
  );
}
