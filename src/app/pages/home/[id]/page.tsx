"use client";

import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { HttpServices } from "@/lib/HttpServices";
import { Blog } from "@/lib/models/Blog";
import { useParams } from "next/navigation";
import { Comments, CommentsCreation } from "@/lib/models/Comments";
import Delta from "quill-delta";
import Editor from "@/components/ArticleManager";
import Quill from "quill";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlogDetailPage() {
    const params = useParams<{
        id: string;
    }>();
    const httpService = new HttpServices();

    const [blog, setBlog] = useState<Blog>();
    const [comments, setComments] = useState<Comments[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [id, setId] = useState<string>("");

    const quillRef: LegacyRef<Quill> = useRef(null);

    const options = {
        modules: {
            toolbar: null,
        },
        placeholder: "",
        readOnly: true,
        theme: "",
    };

    useEffect(() => {
        // Fetch the blog and comments data
        (async () => {
            try {
                setId(params.id);
                const responseBlog: Blog = await (
                    await httpService.callAPI(`/api/blogs/${params.id}`, null, "GET")
                ).json();
                const responseComment: Comments[] = await (
                    await httpService.callAPI(`/api/comments/${params.id}`, null, "GET")
                ).json();
                setBlog(responseBlog);
                setComments(responseComment);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [params.id]);

    // Ensure that the page scrolls to the top after the content is rendered
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top on every render
    }, [blog]); // This will trigger scrollTo on every change of the blog data

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            (async () => {
                try {
                    const newComments: CommentsCreation = new CommentsCreation(
                        null,
                        newComment,
                        new Date().toUTCString(),
                        { id: id }
                    );

                    setComments([
                        await (await httpService.callAPI(`/api/comments`, newComments, "POST")).json(),
                        ...comments
                    ].sort((first: Comments, second: Comments) => -(Date.parse(first.publishDate) - Date.parse(second.publishDate))));
                    setNewComment("");
                } catch (e) {
                    console.log(e);
                }
            })();
        }
    };

    if (!blog || !comments) {
        return <LoadingSpinner />;
    }

    return blog && comments && (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                alignItems: "flex-start",
                paddingTop: "20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "800px",
                    padding: "0 10px",
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <article
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        marginBottom: "20px",
                    }}
                >
                    <h2
                        style={{
                            color: "#09886A",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "2rem",
                            marginBottom: "10px",
                        }}
                    >
                        <b>{blog.title}</b>
                    </h2>
                    <p>
                        By <b>{blog.authorName}</b>
                        <span style={{ marginLeft: '10px' }}>
                            | Publish Date: <b>{new Date(blog.publishDate).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</b>
                        </span>
                    </p>
                    <Editor
                        ref={quillRef}
                        readOnly={options.readOnly}
                        defaultValue={new Delta(JSON.parse(blog?.content as string)["ops"])}
                        onSelectionChange={() => {}}
                        onTextChange={() => {}}
                        options={options}
                    />
                </article>

                <section
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        Comments
                    </h3>
                    <form
                        onSubmit={handleCommentSubmit}
                        style={{
                            marginBottom: "20px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={2}
                            style={{
                                width: "86%",
                                marginBottom: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "10px",
                            }}
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "10px 15px",
                                border: "none",
                                backgroundColor: "#b18560",
                                color: "white",
                                borderRadius: "25px",
                                cursor: "pointer",
                                minWidth: "90px",
                                width: "10%",
                            }}
                        >
                            Post
                        </button>
                    </form>
                    <hr />
                    <ul
                        style={{
                            listStyleType: "none",
                            padding: "0",
                            marginTop: "20px",
                        }}
                    >
                        {comments.map((comment) => (
                            <li
                                key={comment.id}
                                style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                <p><b>{comment.content}</b ></p>
                                <span>
                                    {new Date(comment.publishDate).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
