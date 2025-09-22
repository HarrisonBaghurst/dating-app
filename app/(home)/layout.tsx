import SideBar from "@/components/SideBar";
import { ModalProvider } from "@/providers/ModalProvider";
import { RefreshEventsProvider } from "@/providers/RefreshEventsProvider";

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
            <RefreshEventsProvider>
              <ModalProvider>
                  {children}
              </ModalProvider>
            </RefreshEventsProvider>
        </div>
    </>
  );
}
