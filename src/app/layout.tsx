import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/shared-components/AppSidebar";
import { 
  SidebarProvider,
  SidebarInset,
 } from "@/components/ui/sidebar"
import { Metadata } from "next";
import AppHeader from "@/components/shared-components/AppHeader";

export const metadata: Metadata = {
  title: "Moorad Mahal",
  description: 'Application for handling dontaion, due etc of Moorad Mahal'
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <AppHeader /> 
              {children}
            </SidebarInset>
          </SidebarProvider>
      </body>
    </html>
  );
}

