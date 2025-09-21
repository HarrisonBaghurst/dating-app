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
        <SideBar />
        <div className="ml-[20dvw] w-full">
            <RefreshEventsProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
            </RefreshEventsProvider>
        </div>
    </>
  );
}
