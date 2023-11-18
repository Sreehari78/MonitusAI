import Dropbox from "@/components/Dropbox";
import SideBar from "@/components/SideBar";

const page = () => {
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={2} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>
        <div className='w-[85vw] h-[100vh] bg-[#f3f8fe] flex flex-col px-40 py-40 gap-20'>
          <Dropbox />
        </div>
      </div>
    </div>
  );
};

export default page;
