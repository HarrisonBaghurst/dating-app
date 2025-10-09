import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { RefreshEventsProvider } from "@/providers/RefreshEventsProvider";

const APP_NAME = "Dating App";
const APP_DEFAULT_TITLE = "Dating App";
const APP_TITLE_TEMPLATE = "Dating App";
const APP_DESCRIPTION = "Dates you won't forget";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
