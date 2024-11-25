'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {useAuth} from "@/app/AuthContext";
import {HttpServices} from "@/lib/HttpServices";
import {useRouter} from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const httpService = new HttpServices();
    const router = useRouter();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if (username === 'user' && password === 'password') {
        //     alert('Login successful!');
        //    
        //     window.location.href = '/';
        // } else {
        //     setError('Invalid username or password');
        // }
        
        if (username.length < 1 || password.length < 1) {
            setError('Please enter a username and password');
            return;
        }

        (async () => {
            const response = await httpService.callAPI('/api/user/login', {username, password}, 'POST');
            
            if (response.ok) {
                const data = await response.json();
                login(data.token);
                router.push("/pages/article_list");
            } else {
                setError('Invalid username or password');
            }
        })();
    };
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', color: '#333', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#b18560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
                        Login
                    </button>
                </form>
                <Link href="/home" style={{ color: '#b18560', textDecoration: 'none', fontWeight: 'bold' }}>Back to Home</Link>
            </div>
        </div>
    );
}
