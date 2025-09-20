import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/SideBar";
import { ModalProvider } from "@/providers/ModalProvider";
import { RefreshEventsProvider } from "@/providers/RefreshEventsProvider";

export const metadata: Metadata = {
  title: "Personal Calendar",
  description: "Calendar for Me, Myself and I",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased flex'
      >
        <SideBar />
        <div className="ml-[20dvw] w-full">
          <RefreshEventsProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </RefreshEventsProvider>
        </div>
      </body>
    </html>
  );
}
