"use client";

import {LegacyRef, useEffect, useRef, useState} from "react";
import Editor from "@/components/ArticleManager";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { HttpServices } from "@/lib/HttpServices";
import { Blog, BlogCreation } from "@/lib/models/Blog";
import { useAuth } from "@/app/AuthContext";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { jwtDecode } from "jwt-decode";

export default function Page() {
    const httpService = new HttpServices();
    const [title, setTitle] = useState(""); // State for blog title
    const [text, setText] = useState("");
    const router = useRouter();
    const params = useParams<{ id: string | undefined }>();
    const [blog, setBlog] = useState<Blog>({
        authorName: "",
        content: "",
        id: "",
        publishDate: "",
        title: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const quillRef: LegacyRef<Quill> = useRef(null);
    const { token } = useAuth();
    
    const toolBarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
    ];
    const options = {
        debug: "error",
        modules: { toolbar: toolBarOptions },
        placeholder: "Testing",
        readOnly: false,
        theme: "snow",
    };

    useEffect(() => {
        try {
            if (!token) {
                router.push("/pages/login");
            }
            if (params.id) {
                (async () => {
                    const responseBlog: Blog = await (
                        await httpService.callAPI(`/api/blogs/${params.id}`, null, "GET", token)
                    ).json();
                    setTitle(responseBlog.title);
                    setBlog(responseBlog);
                    setIsLoading(false);
                })();
            } else {
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleCreatePost = () => {
        const content = JSON.stringify(quillRef.current?.getContents());
        if (!token) {
            return;
        }
        const userName = jwtDecode(token).sub;
        if (!userName) {
            return;
        }
        // Prepare blog data to send
        const blogData: BlogCreation = new BlogCreation(
            title, // Include title from state
            content,
            new Date().toUTCString(),
            userName
        );
        httpService
            .callAPI("/api/blogs", blogData, "POST", token)
            .then((response) => {
                console.log("Post created successfully:", response);
                router.push("/pages/article_list");
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    const handleUpdatePost = () => {
        const content = JSON.stringify(quillRef.current?.getContents());
        const { id, publishDate, authorName } = blog;
        const blogData: Blog = new Blog(
            id,
            title,
            content,
            publishDate,
            authorName
        );
        httpService
            .callAPI("/api/blogs", blogData, "POST", token)
            .then((response) => {
                console.log("Post updated successfully:", response);
                router.push("/pages/article_list");
            })
            .catch((error) => {
                console.error("Error updating post:", error);
            });
    };

    const handleCancel = () => {
        if (confirm("Would you like to cancel? All content will be lost.")) {
            router.push("/pages/article_list");
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div
            className={"flex justify-center min-h-[100vh] bg-white"}
            style={{ marginBottom: 0, paddingBottom: 0 }}
        >
            <div
                className={
                    "w-full max-w-[800px] px-2.5 pt-4 text-[#333] font-[Arial, sans-serif]"
                }
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "10px",
                        border: "black",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <Editor
                        ref={quillRef}
                        readOnly={options.readOnly}
                        defaultValue={
                            params.id
                                ? new Delta(JSON.parse(blog?.content as string)["ops"])
                                : new Delta().insert(text)
                        }
                        onTextChange={setText}
                        options={options}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        // Align buttons to the right
                        marginTop: "10px",
                        gap: "10px", // Space between buttons
                        marginBottom: "50px", // Add margin from the bottom
                    }}
                >
                    <button
                        onClick={params.id ? handleUpdatePost : handleCreatePost}
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "#B18560",
                            color: "white",
                            border: "none",
                            borderRadius: "25px",
                            cursor: "pointer",
                            width: "fit-content",
                            minWidth: "110px",
                        }}
                    >
                        {params.id ? "Update Post" : "Create Post"}
                    </button>
                    <button
                        onClick={handleCancel}
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "#B18560",
                            color: "white",
                            border: "black",
                            borderRadius: "25px",
                            cursor: "pointer",
                            width: "fit-content",
                            minWidth: "110px",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}