"use client"; // Ensure this is a client-side component

import localFont from "next/font/local";
import { useEffect } from "react";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import { Providers } from "@/app/providers";
import NavigationBar from "@/components/NavBar";
import WriteArticleButton from "@/components/WriteArticleButton";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            style={{ margin: 0, padding: 0 }}
        >
        <Providers>
            {/* Fixed NavigationBar */}
            <NavigationBar />
            {/* Prevent overlap by adding padding equal to navbar height */}
            <div style={{ paddingTop: "75px" }}>{children}</div>
            <WriteArticleButton />
        </Providers>
        </body>
        </html>
    );
}
