import SideBar from "@/components/SideBar";

const page = () => {
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={2} />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>ADR Reports Page</div>
    </div>
  );
};

export default page;
