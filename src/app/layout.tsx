import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <title>Test</title>
        </head>
        <body className="min-w-screen min-h-screen overflow-x-hidden">
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
