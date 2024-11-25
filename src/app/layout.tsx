import type {Metadata} from "next";
import localFont from "next/font/local";
import Link from "next/link"; // Import Link
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import {Providers} from "@/app/providers";
import NavigationBar from "@/components/NavBar";
import WriteArticleButton from "@/components/WriteArticleButton";

const geistSans = localFont({
    src     : "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight  : "100 900",
});
const geistMono = localFont({
    src     : "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight  : "100 900",
});

export const metadata: Metadata = {
    title      : "Dan'sFarmaRoot",
    description: "Power base in your case.",
    authors    : {
        name: "Daniel",
        url : "http://localhost:3000/"
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <NavigationBar />
                    {children}
                    <WriteArticleButton />
                </Providers>
            </body>
        </html>
    );
}
