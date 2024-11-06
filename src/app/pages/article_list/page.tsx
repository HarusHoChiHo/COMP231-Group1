"use client";

import {useEffect, useState} from "react";
import {HttpServices} from "@/lib/HttpServices";
import {Blog} from "@/lib/models/Blog";

export default function BlogListPage() {
    const httpService = new HttpServices();
    const [blogs, setBlogs] = useState<Blog[]>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch blogs on component mount
        (async () => {
            try {
                const response: Blog[] = await (await (httpService.callAPI("/api/blogs", null, "GET"))).json();
                setBlogs(response);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
            
            
        })();
        
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                display        : 'flex',
                flexDirection  : 'column',
                alignItems     : 'center',
                minHeight      : '100vh',
                backgroundColor: '#f5f5f5',
                padding        : '20px'
            }}
        >
            <h1
                style={{
                    color     : '#333',
                    fontFamily: 'Arial, sans-serif'
                }}
            >Blog List</h1>
            <div
                style={{
                    width     : '100%',
                    maxWidth  : '800px',
                    color     : '#333',
                    fontFamily: 'Arial, sans-serif'
                }}
            >
                {
                    !loading && blogs?.map((blog, index) => (
                        <div
                            key={blog.id || index}
                            style={{
                                backgroundColor: 'white',
                                padding        : '20px',
                                borderRadius   : '8px',
                                boxShadow      : '0 2px 4px rgba(0,0,0,0.1)',
                                marginBottom   : '20px'
                            }}
                        >
                            <a href={`/pages/home/${blog.id}`}>{blog.title}</a>
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
