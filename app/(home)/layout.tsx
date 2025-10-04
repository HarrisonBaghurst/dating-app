import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>  
        <div className="">
          <SideBar />
        </div>
        <div className="ml-0 mb-[20dvw] 2xl:mb-0 2xl:ml-[20dvw] w-full">
          {children}
        </div>
    </>
  );
}
