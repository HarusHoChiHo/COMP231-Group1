"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HttpServices } from "@/lib/HttpServices";
import {Blog} from "@/lib/models/Blog";

export default function BlogDetailPage() {
    const router = useRouter();
    const { id } = router.query; // Get the blog ID from the route
    const httpService = new HttpServices();

    const [blog, setBlog] = useState<Blog>()
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch blogs on component mount
        (async () => {

            try {
                const response: Blog = await (await (httpService.callAPI(`/api/blogs/${router.query.id}`, null, "GET"))).json();
                setBlog(response);
            } catch (e) {
                console.log(e);
            }



        })();

    }, []);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment.trim()]);
            setNewComment('');
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '0 10px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                <article style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{blog.title}</h2>
                    <p>By {blog.author.id}</p>
                    <p style={{ lineHeight: '1.6' }}>{blog.content}</p>
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
            </div>
        </div>
    );
}
