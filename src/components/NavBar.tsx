"use client"

import Link from "next/link";
import {useAuth} from "@/app/AuthContext";
import {useRouter} from "next/navigation";


export default function NavigationBar() {
    const {
        token,
        logout
    } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/pages/article_list");
    }

    return (
        <nav className="navbar bg-white">
            <Link
                href="/pages/article_list"
                style={{
                    textDecoration: 'none',
                    color         : '#09886A'
                }}
            >
                <h1>Dan's Farmaroot</h1>
            </Link>
            <ul className="nav-links pl-4">
                <li>
                    {!token
                     ? <button
                         onClick={() => router.push("/pages/login")}
                         style={{
                             fontWeight    : 'bold',
                             color         : 'white',
                             textDecoration: 'none',
                             backgroundColor: '#09886A',
                             borderRadius: '25px',
                             minWidth: '90px',
                             paddingTop: '8px',
                             paddingBottom: '8px'
                         }}
                     > Login</button>
                     : <button
                         onClick={handleLogout}
                         style={{
                             fontWeight    : 'bold',
                             color         : 'white',
                             textDecoration: 'none',
                             backgroundColor: '#09886A',
                             borderRadius: '25px',
                             minWidth: '90px',
                             paddingTop: '8px',
                             paddingBottom: '8px'
                         }}
                     >Logout</button>

                    }
                </li>
            </ul>
        </nav>
    );
}