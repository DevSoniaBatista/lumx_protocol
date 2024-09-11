import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumx Protocol",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="icon" type="image/x-icon" href="/favicon.jpeg" />
    </head>
      <body className="text-gray-500">
      <div className="max-w-4xl mx-auto p-4">
        {children}
       </div>
       </body>
    </html>
  );
}
