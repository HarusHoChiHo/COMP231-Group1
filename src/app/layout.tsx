
import localFont from "next/font/local";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import {Providers} from "@/app/providers";
import NavigationBar from "@/components/NavBar";
import WriteArticleButton from "@/components/WriteArticleButton";
import {Metadata} from "next";

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
    title: "Dan'sFarmaRoot",
    applicationName: "Dan'sFarmaRoot Blog",
    description: "Welcome to Dan'sFarmaRoot Blog. It provide lastest news.",
    authors: {
        name: "Daniel Kaye"
    },
    keywords: "Ginseng, Dan'sFarmRoot, DFEnergy",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            {/*<head>
                <title>Dan'sFarmaRoot</title>
                <meta charSet={"utf-8"} />
                <meta
                    name={"application-name"}
                    content={"Dan'sFarmaRoot Blog"}
                />
                <meta
                    name={"description"}
                    content={"Welcome to Dan'sFarmaRoot Blog. It provide lastest news."}
                />
                <meta
                    name={"author"}
                    content={"Daniel Kaye"}
                />
                <meta
                    name={"keywords"}
                    content={"Ginseng, Dan'sFarmRoot, DFEnergy"}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>*/}
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                style={{
                    margin : 0,
                    padding: 0
                }}
            >
                <Providers>
                    {/* Fixed NavigationBar */}
                    <NavigationBar />
                    {/* Prevent overlap by adding padding equal to navbar height */}
                    <div style={{paddingTop: "75px"}}>{children}</div>
                    <WriteArticleButton />
                </Providers>
            </body>
        </html>
    );
}
