"use client";

import { useEffect, useState } from "react";
import { HttpServices } from "@/lib/HttpServices";
import {Blog} from "@/lib/models/Blog";

export default function BlogListPage() {
    const httpService = new HttpServices();
    const [blogs, setBlogs] = useState<Blog[]>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch blogs on component mount
        httpService.callAPI("/api/blogs",null, "GET")
            .then(async response => {
            setBlogs(await response.json());
            setLoading(false);
            console.log(response);
        })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
            <h1 style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>Blog List</h1>
            <div style={{ width: '100%', maxWidth: '800px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                {
                    blogs?.map((blog, index) => (
                        <div key={blog.id || index} style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            marginBottom: '20px'
                        }}>
                            <h2>{blog.title}</h2>
                            <p>Author: {blog.author.id}</p>
                            <p>Publish Date: {blog.publishDate}</p> 
                            <p>{blog.content.slice(0, 100)}...</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
