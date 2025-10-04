import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/providers/SettingsProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className='antialiased flex'
      >
        <SettingsProvider>
          <RefreshEventsProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </RefreshEventsProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
