import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Test</title>
      </head>
      <body className="min-w-screen min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
