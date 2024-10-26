'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy validation logic
        if (username === 'user' && password === 'password') {
            alert('Login successful!');
            // Redirect to the home page (you can use router.push for more control)
            window.location.href = '/';
        } else {
            setError('Invalid username or password');
        }
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
                <p style={{ marginTop: '20px' }}>
                    Don't have an account? <Link href="/signup">Sign up</Link>
                </p>
                <Link href="/pages/home" style={{ color: '#b18560', textDecoration: 'none', fontWeight: 'bold' }}>Back to Home</Link>
            </div>
        </div>
    );
}
