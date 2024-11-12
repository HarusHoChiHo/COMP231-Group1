"use client";

import { LegacyRef, useEffect, useRef, useState } from "react";
import Editor from "@/components/ArticleManager";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { HttpServices } from "@/lib/HttpServices";
import {BlogCreation} from "@/lib/models/Blog";
import {useAuth} from "@/app/AuthContext";

export default function Page() {
    const httpService = new HttpServices();
    const [title, setTitle] = useState(""); // State for blog title
    const [text, setText] = useState("abc");
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    // const auth = useAuth();

    const quillRef: LegacyRef<Quill> = useRef(null);

    // useEffect(() => {
    //     console.log(JSON.stringify(quillRef.current?.getContents()));
    // }, [text]);

    const toolBarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const options = {
        debug: "error",
        modules: {
            toolbar: toolBarOptions
        },
        placeholder: "Testing",
        readOnly: false,
        theme: "snow"
    };

    const handleCreatePost = () => {
        const content = JSON.stringify(quillRef.current?.getContents());

        // Prepare blog data to send
        const blogData: BlogCreation = new BlogCreation(
            title, // Include title from state
            content,
            new Date().toUTCString(),
            { id: "67211f481a20111bfd62de92" }
        );

        console.log("Creating post with data:", blogData);

        httpService.callAPI("/api/blogs", blogData, "POST")
            .then(response => {
                console.log("Post created successfully:", response);
            })
            .catch(error => {
                console.error("Error creating post:", error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '0 10px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                    <Editor
                        ref={quillRef}
                        readOnly={options.readOnly}
                        defaultValue={new Delta().insert(text)}
                        onSelectionChange={setRange}
                        onTextChange={setText}
                        options={options}
                    />
                </div>
                <button
                    onClick={handleCreatePost}
                    style={{
                        marginTop: '10px',
                        padding: '10px 15px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Create Post
                </button>
            </div>
        </div>
    );
}
