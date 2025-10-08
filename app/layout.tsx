import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { RefreshEventsProvider } from "@/providers/RefreshEventsProvider";

export const metadata: Metadata = {
  title: "Dating App",
  description: "Dates you wont forget",
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
