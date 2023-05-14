import Image from "next/image";

import Avatar from "../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-[600px] h-screen bg-zinc-800 flex flex-col text-white">
      {/* Main Navbar */}
      <nav className="w-full h-10 md:h-16 py-2 md:text-xl text-lg flex justify-center items-center text-yellow-500 font-bold bg-zinc-800 shadow-xl">
        {/* Title */}
        <h1>پیامرسان</h1>
      </nav>
      <div className="h-full grid grid-rows-1 grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <section className="md:col-span-1 col-span-4 h-full md:border-l md:border-zinc-700 overflow-y-auto">
          {/* Conversations header */}
          <header className="w-full h-5 hidden md:flex justify-center items-center my-2 text-yellow-500 text-sm font-bold ">
            <h2>مکالمه ها</h2>
          </header>
          {/* Conversation Cards list */}
          <ul className="list-none flex flex-col">
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>علیرضا</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>آرمان</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>امیر</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
            {/* card */}
            <li className="flex justify-start items-center border-b-2 border-zinc-700 h-24 p-4 cursor-pointer">
              <Image
                src={Avatar.src}
                alt="Avatar"
                priority
                width={100}
                height={100}
                className="rounded-full aspect-square w-16 h-16 ml-2"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between">
                  <h3>شروین</h3>
                  <p>23:45</p>
                </div>
                <p className="text-xs">سلام داداش حالت چطوره؟</p>
              </div>
            </li>
          </ul>
        </section>
        {/* Chat Section */}
        <section className="hidden md:block md:col-span-3 h-full overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
};

export default layout;
