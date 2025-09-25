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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var storedTheme = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = storedTheme ? storedTheme : (prefersDark ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (_) {}
          })();
        `,
      }}
    />
      </head>
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
