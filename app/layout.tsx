import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
