import Dropbox from "@/components/Dropbox";
import SideBar from "@/components/SideBar";
import { TextField } from "@mui/material";

const page = () => {
  return (
    <div className="flex">
      <SideBar activeButtonNumber={2} />
      <div className="w-[85vw] h-[100vh] bg-[#f3f8fe]">
        <div className="w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20">
          <Dropbox />

          <div className="w-[50vw] flex flex-col gap-1">
            <TextField
              color="success"
              placeholder="Enter Name"
              // onChange={handleName}
              colour="success"
              style={{
                width: "50vw",
                backgroundColor: "#EEEEEE",
              }}
            />
            <div className=" h-[30vh] bg-[#EEEEEE] border-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
