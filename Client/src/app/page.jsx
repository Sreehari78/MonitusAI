import Navbar from "@/components/Navbar";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main className='flex'>
      <div className='w-[100vw] h-[100vh] bg-[#f3f8fe] text-black'>
        <div>
          <Navbar />
        </div>
        <div className='h-[50vh] bg-[#BEE1E6] flex justify-between px-40 py-20'>
          <div className=' text-5xl w-2/5 font-bold leading-normal flex flex-col gap-9'>
            Pioneering ADR prediction for Safer Healthcare
            <div className='text-lg font-medium'>
              "Monitus pioneers ADR prediction for safer healthcare. Our
              advanced AI technology proactively identifies potential risks,
              providing precise insights for informed decision-making and
              improved patient safety."
            </div>
            <div className='flex gap-20'>
              <div>
                <Button
                  style={{
                    backgroundColor: "#030303",
                    width: "9rem",
                    height: "3rem",
                    color: "#fefefe",
                    fontSize: "0.75rem",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                  }}>
                  Get Started
                </Button>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid #006D77",
                    width: "9.1rem",
                    height: "3.1rem",
                    color: "#030303",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                  }}>
                  How it Works ?
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
