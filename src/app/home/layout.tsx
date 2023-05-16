import MainSidebar from "@/components/sidebar/MainSidebar";
import NavbarLayout from "@/layouts/NavbarLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-[600px] h-screen bg-zinc-800 flex flex-col text-white">
      {/* Main Navbar */}
      <NavbarLayout />

      <div className="h-full grid grid-rows-1 grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <MainSidebar />

        {children}
      </div>
    </main>
  );
};

export default layout;
