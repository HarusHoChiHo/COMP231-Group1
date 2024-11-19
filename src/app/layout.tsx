import type {Metadata} from "next";
import localFont from "next/font/local";
import Link from "next/link"; // Import Link
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";

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
                <nav className="navbar">
                    <Link
                        href="/pages/article_list"
                        style={{
                            textDecoration: 'none',
                            color         : 'white'
                        }}
                    >
                        <h1>Dan's Farmaroot</h1>
                    </Link>
                    <ul className="nav-links">
                        <li>
                            <Link
                                href="/pages/login"
                                style={{
                                    fontWeight    : 'bold',
                                    color         : 'white',
                                    textDecoration: 'none'
                                }}
                            >Login</Link>
                        </li>
                    </ul>
                    <ul className="nav-links">
                        <li>
                            <Link
                                href="/pages/text_editor"
                                style={{
                                    fontWeight    : 'bold',
                                    color         : 'white',
                                    textDecoration: 'none'
                                }}
                            >Write article</Link>
                        </li>
                    </ul>
                </nav>
                {children}
            </body>
        </html>
    );
}
