"use client";

import Link from "next/link";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
    const { token, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/pages/article_list");
    };

    return (
        <nav
            className="navbar bg-white"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "75px", // Set navbar height
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
                backdropFilter: "blur(10px)", // Optional blur effect
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow
                zIndex: 1000, // Ensure it's above other elements
            }}
        >
            <Link href="/pages/article_list" style={{ textDecoration: "none" }}>
                {/* Logo using <picture> for multiple format support */}
                <picture>
                    <source srcSet="/dansfarmarootlogo.avif" type="image/avif" />
                    <img
                        src="/logo.png"
                        alt="Dan's FarmaRoot Logo"
                        style={{
                            height: "65px", // Adjust height as needed
                            display: "block",
                        }}
                    />
                </picture>
            </Link>
            <ul
                className="nav-links"
                style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    gap: "20px",
                }}
            >
                <li>
                    {!token ? (
                        <button
                            onClick={() => router.push("/pages/login")}
                            style={{
                                fontWeight: "bold",
                                color: "white",
                                textDecoration: "none",
                                backgroundColor: "#09886A",
                                borderRadius: "25px",
                                minWidth: "90px",
                                padding: "8px 16px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            style={{
                                fontWeight: "bold",
                                color: "white",
                                textDecoration: "none",
                                backgroundColor: "#09886A",
                                borderRadius: "25px",
                                minWidth: "90px",
                                padding: "8px 16px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
}
