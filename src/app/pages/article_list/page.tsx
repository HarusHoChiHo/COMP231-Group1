"use client";

import {useEffect, useState} from "react";
import {HttpServices} from "@/lib/HttpServices";
import {Blog} from "@/lib/models/Blog";
import Link from "next/link";
import {useAuth} from "@/app/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import {FaFilePen, FaRegTrashCan} from "react-icons/fa6";

export default function BlogListPage() {
    const httpService = new HttpServices();
    const [blogs, setBlogs] = useState<Blog[]>();
    const [isLoading, setIsLoading] = useState(true);
    const {token} = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const response: Blog[] = await (await (httpService.callAPI("/api/blogs", null, "GET"))).json();
                setBlogs(response);
                setIsLoading(false);
                window.scrollTo(0,0);
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
            setBlogs(blogs?.filter((blog) => blog.id !== id));
            alert("Blog deleted successfully.");
        } catch (e) {
            console.error("Error deleting the blog:", e);
            alert("Failed to delete the blog.");
        }
    };

    const handleEdit = (id: string) => {
        window.location.href = `/pages/text_editor/${id}`;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
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
                        color     : '#b18560',
                        fontFamily: 'Arial, sans-serif',
                        fontSize  : '2rem'
                    }}
                >
                    <b>Latest News</b>
                </h1>
                <div
                    style={{
                        width     : '100%',
                        maxWidth  : '800px',
                        color     : '#333',
                        fontFamily: 'Arial, sans-serif'
                    }}
                >
                    {
                        !isLoading && blogs?.map((blog, index) => (
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
                                    <Link href={`/pages/home/${blog.id}`}>
                                        <h2
                                            style={{
                                                color     : '#09886A',
                                                fontFamily: 'Arial, sans-serif',
                                                fontSize  : '2rem'
                                            }}
                                        >
                                            <b>{blog.title}</b>
                                        </h2>
                                    </Link>
                                    <p>
                                        <b>Author: {blog.authorName}</b>
                                    </p>
                                    <p>
                                        <b>Publish Date: {new Date(blog.publishDate).toLocaleString("Locale", {
                                            year  : "numeric",
                                            month : "2-digit",
                                            day   : "2-digit",
                                            hour  : "2-digit",
                                            minute: "2-digit"
                                        })}</b>
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap    : '10px'
                                    }}
                                >
                                    {
                                        token
                                        ? (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(blog.id!)}
                                                    style={{
                                                        border      : 'none',
                                                        padding     : '10px 15px',
                                                        borderRadius: '4px',
                                                        cursor      : 'pointer'
                                                    }}
                                                >
                                                    <FaFilePen
                                                        size={"1.5rem"}
                                                        title={"Edit"}
                                                        color={"#05b138"}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog.id!)}
                                                    style={{
                                                        border      : 'none',
                                                        padding     : '10px 15px',
                                                        borderRadius: '4px',
                                                        cursor      : 'pointer'
                                                    }}
                                                >
                                                    <FaRegTrashCan
                                                        size={"1.5rem"}
                                                        title={"Delete"}
                                                        color={"#d60c0c"}
                                                    />
                                                </button>
                                            </>
                                        )
                                        : (<></>)
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
