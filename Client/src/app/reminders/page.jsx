import SideBar from "@/components/SideBar";

const page = () => {
  return (
    <div className='flex'>
      <SideBar activeButtonNumber={3} />
      <div className='w-[85vw] h-[100vh]'>Reminders Page</div>
    </div>
  );
};

export default page;
