import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/IconProvider";

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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
