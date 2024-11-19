"use client";

import {useState, useEffect, useId, LegacyRef, useRef} from "react";
import {HttpServices} from "@/lib/HttpServices";
import {Blog} from "@/lib/models/Blog";
import {useParams} from "next/navigation";
import {Comments, CommentsCreation} from "@/lib/models/Comments";
import Delta from "quill-delta";
import Editor from "@/components/ArticleManager";
import Quill from "quill";


export default function BlogDetailPage() {
    const params = useParams<{
        id: string
    }>();
    const httpService = new HttpServices();

    const [blog, setBlog] = useState<Blog>();
    const [comments, setComments] = useState<Comments[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [id, setId] = useState<string>('');

    const quillRef: LegacyRef<Quill> = useRef(null);

    const options = {
        debug      : "error",
        modules    : {
            toolbar: null
        },
        placeholder: "Testing",
        readOnly   : true,
        theme      : "snow"
    };
    
    useEffect(() => {
        (async () => {

            try {
                setId(params.id);
                const responseBlog: Blog = await (await (httpService.callAPI(`/api/blogs/${params.id}`, null, "GET"))).json();
                const responseComment: Comments[] = await (await (httpService.callAPI(`/api/comments/${params.id}`, null, "GET"))).json();
                setBlog(responseBlog);
                setComments(responseComment);
            } catch (e) {
                console.log(e);
            }
        })();

    }, []);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            (async () => {
                try {
                    const newComments: CommentsCreation = new CommentsCreation(null, newComment, new Date().toUTCString(), { id:id});
                    
                    setComments([await (await httpService.callAPI(`/api/comments`, newComments, "POST")).json(), ...comments].sort((first: Comments, second: Comments) => -(Date.parse(first.publishDate) - Date.parse(second.publishDate))));
                    setNewComment('');
                } catch (e) {
                    console.log(e)
                }
            })();
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div
            style={{
                display        : 'flex',
                justifyContent : 'center',
                minHeight      : '100vh',
                backgroundColor: '#f5f5f5'
            }}
        >
            <div
                style={{
                    width     : '100%',
                    maxWidth  : '800px',
                    padding   : '0 10px',
                    color     : '#333',
                    fontFamily: 'Arial, sans-serif'
                }}
            >
                <article
                    style={{
                        backgroundColor: 'white',
                        padding        : '20px',
                        borderRadius   : '8px',
                        boxShadow      : '0 2px 4px rgba(0,0,0,0.1)',
                        marginBottom   : '20px'
                    }}
                >
                    <h2
                        style={{
                            fontSize    : '24px',
                            marginBottom: '10px'
                        }}
                    >{blog.title}</h2>
                    <p>By {blog.author.username}</p>
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
                        backgroundColor: 'white',
                        padding        : '20px',
                        borderRadius   : '8px',
                        boxShadow      : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <h3
                        style={{
                            fontSize    : '20px',
                            marginBottom: '10px'
                        }}
                    >Comments</h3>
                    <form
                        onSubmit={handleCommentSubmit}
                        style={{marginBottom: '20px'}}
                    >
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={3}
                            style={{
                                width       : '100%',
                                marginBottom: '10px',
                                borderRadius: '4px',
                                border      : '1px solid #ccc',
                                padding     : '10px'
                            }}
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            style={{
                                padding        : '10px 15px',
                                border         : 'none',
                                backgroundColor: '#b18560',
                                color          : 'white',
                                borderRadius   : '4px',
                                cursor         : 'pointer'
                            }}
                        >
                            Submit
                        </button>
                    </form>

                    <ul
                        style={{
                            listStyleType: 'none',
                            padding      : '0'
                        }}
                    >
                        {comments.map((comment) => (
                            <li
                                key={comment.id}
                                style={{
                                    marginBottom   : '10px',
                                    padding        : '10px',
                                    border         : '1px solid #ccc',
                                    borderRadius   : '5px',
                                    backgroundColor: '#f9f9f9'
                                }}
                            >
                                <p>{comment.content}</p>
                                <span>{new Date(comment.publishDate).toLocaleString("Locale", {
                                    year  : "numeric",
                                    month : "2-digit",
                                    day   : "2-digit",
                                    hour  : "2-digit",
                                    minute: "2-digit"
                                })}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
