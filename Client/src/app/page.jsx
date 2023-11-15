import SideBar from "@/components/SideBar";
// Import the styles provided by the react-pdf-viewer packages

export default function Home() {
  return (
    <main className='flex'>
      <SideBar />
      <div className='w-[85vw] h-[100vh] bg-[#f3f8fe]'>Hello World </div>
    </main>
  );
}
