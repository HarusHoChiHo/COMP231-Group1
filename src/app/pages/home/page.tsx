'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
    // State to hold comments
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');

    // Handle adding a new comment
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment.trim()]);
            setNewComment(''); // Clear the input field
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', color: '#333', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <article style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Understanding the Benefits of DFENERGY</h2>
                <p style={{ lineHeight: '1.6' }}>
                    DFENERGY is a revolutionary product designed to enhance your energy levels and improve your overall well-being.
                    With its unique blend of natural ingredients, it provides sustained energy without the crash associated with traditional energy drinks.
                </p>
                <p style={{ lineHeight: '1.6' }}>
                    In this blog, we will explore the various benefits of DFENERGY and how it can help you lead a more active and fulfilling life.
                </p>
                <p style={{ lineHeight: '1.6' }}>
                    Whether you're a fitness enthusiast or just looking for an extra boost during your busy day, DFENERGY is here to help.
                </p>
            </article>

            <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Comments</h3>
                <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px' }}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        style={{ width: '100%', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', padding: '10px' }}
                        placeholder="Add a comment..."
                    />
                    <button type="submit" style={{ padding: '10px 15px', border: 'none', backgroundColor: '#b18560', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                        Submit
                    </button>
                </form>

                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {comments.map((comment, index) => (
                        <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                            {comment}
                        </li>
                    ))}
                </ul>
            </section>

            <nav style={{ marginTop: '20px' }}>
                <Link href="/public" style={{ color: '#b18560', textDecoration: 'none', fontWeight: 'bold' }}>Back to Home</Link>
            </nav>
        </div>
    );
}
