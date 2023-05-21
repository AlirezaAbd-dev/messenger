import MainSidebar from "@/components/sidebar/MainSidebar";
import NavbarLayout from "@/layouts/NavbarLayout";
import Modal from "@/components/ui/Modal";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-[600px] h-screen bg-zinc-800 flex flex-col text-white">
      {/* Main Navbar */}
      <NavbarLayout />

      <Modal />

      <div className="h-full grid grid-rows-1 grid-cols-1 md:grid-cols-4 pb-24 md:pb-10">
        {/* Sidebar */}
        <MainSidebar />

        {children}
      </div>
    </main>
  );
};

export default layout;
