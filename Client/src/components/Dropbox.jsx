import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Autocomplete from "@mui/material/Autocomplete";

const Patients = [
  "Akhil Binoy Vettical",
  "Pranav Sathish",
  "Sreehari S",
  "Richard Jopseph",
  "Aiden Smith",
  "Sophia Johnson",
  "Liam Brown",
  "Olivia Davis",
  "Lucas Miller",
  "Emma Wilson",
  "Jackson Moore",
  "Amelia Anderson",
  "Carter Taylor",
  "Ava Thomas",
  "Ethan Harris",
  "Chloe White",
  "Logan Martin",
  "Mia Martinez",
  "Jack Thompson",
  "Harper Garcia",
  "Caleb Robinson",
  "Ella Martinez",
  "Sebastian Clark",
  "Avery Lewis",
  "Benjamin Hall",
  "Lily Rodriguez",
  "Grayson Turner",
  "Addison Scott",
  "Matthew Green",
  "Abigail Lewis",
  "Leo Young",
  "Sofia King",
  "David Turner",
  "Scarlett Evans",
  "Gabriel Baker",
  "Aria Lee",
  "Samuel Nelson",
  "Aurora Hall",
  "Wyatt Harris",
  "Emily Stewart",
  "Isaac Moore",
  "Hannah Taylor",
  "Owen Perez",
  "Evelyn Martinez",
  "Nathan Smith",
  "Aubrey Gonzalez",
  "Henry Davis",
  "Grace Wright",
  "Julian Harris",
  "Madison Clark",
  "Levi Turner",
  "Zoe Hill",
  "Jameson Wilson",
  "Nova Turner",
  "Lincoln Moore",
  "Brooklyn White",
  "Nicholas Nelson",
  "Samantha Thompson",
  "Elijah Harris",
  "Layla Garcia",
  "Connor Hall",
  "Ellie King",
  "Joseph Moore",
  "Paisley Baker",
  "Hudson Turner",
  "Maya Scott",
  "Cameron Hill",
  "Alice Robinson",
  "Ezra Harris",
  "Penelope Martinez",
  "Hunter Turner",
  "Stella Adams",
  "Christian Lewis",
  "Zoey Young",
  "Colton Robinson",
  "Lillian Turner",
  "Austin Gonzalez",
  "Violet Clark",
  "Jordan Martinez",
  "Ruby Turner",
  "Dylan Wright",
  "Alexis Harris",
  "Adrian Turner",
  "Autumn King",
  "Cole Nelson",
  "Natalie Hall",
  "Jeremiah Smith",
  "Anna Thompson",
  "Brayden Davis",
  "Lucy White",
  "Juliana Harris",
  "Mason Turner",
  "Hailey Baker",
  "Leo Martinez",
];

export default function Dropbox({ onDropdownChange }) {
  const handleDropdownChange = (event, value) => {
    onDropdownChange(value);
  };
  return (
    <div className='flex gap-3'>
      <Autocomplete
        disablePortal
        options={Patients}
        inputcomponent={OutlinedInput}
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
      <div className='flex text-red-500'>Image Here</div>
    </div>
  );
}
