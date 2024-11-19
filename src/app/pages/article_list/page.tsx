"use client";

import {LegacyRef, useEffect, useRef, useState} from "react";
import {HttpServices} from "@/lib/HttpServices";
import {Blog} from "@/lib/models/Blog";
import Link from "next/link";
import Delta from "quill-delta";
import Editor from "@/components/ArticleManager";
import Quill from "quill";

export default function BlogListPage() {
    const httpService = new HttpServices();
    const [blogs, setBlogs] = useState<Blog[]>();
    const [loading, setLoading] = useState(true);
    const quillRef: LegacyRef<Quill> = useRef(null);

    const options = {
        debug      : "error",
        modules    : {
            toolbar: null
        },
        placeholder: "Testing",
        readOnly   : false,
        theme      : "snow"
    };

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

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            await httpService.callAPI(`/api/blogs/${id}`, null, "DELETE");
            // Remove the deleted blog from the state
            setBlogs(blogs?.filter((blog) => blog.id !== id));
            alert("Blog deleted successfully.");
        } catch (e) {
            console.error("Error deleting the blog:", e);
            alert("Failed to delete the blog.");
        }
    };


    const handleEdit = (id: string) => {
        // Navigate to the edit page (create an edit page for this)
        window.location.href = `/blogs/text_editor/${id}`;
    };

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
                                marginBottom   : '20px',
                                display        : 'flex',
                                justifyContent : 'space-between',
                                alignItems     : 'center'
                            }}
                        >
                            <div>
                                <Link href={`/pages/home/${blog.id}`}><h2>{blog.title}</h2></Link>
                                <p>Author: {blog.author.username}</p>
                                <p>Publish Date: {blog.publishDate}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEdit(blog.id!)}
                                    style={{
                                        backgroundColor: '#007bff',
                                        color          : 'white',
                                        border         : 'none',
                                        padding        : '10px 15px',
                                        borderRadius   : '4px',
                                        cursor         : 'pointer'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id!)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color          : 'white',
                                        border         : 'none',
                                        padding        : '10px 15px',
                                        borderRadius   : '4px',
                                        cursor         : 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
