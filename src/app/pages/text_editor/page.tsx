"use client";

import { LegacyRef, useRef, useState } from "react";
import Editor from "@/components/ArticleManager";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import Quill from "quill";

export default function Page() {
    const [text, setText] = useState("abc");
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();

    const quillRef: LegacyRef<Quill> = useRef(null);

    const toolBarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],

        ['clean']
    ];

    const options = {
        debug      : "error",
        modules    : {
            toolbar: toolBarOptions
        },
        placeholder: "Testing",
        readOnly   : false,
        theme      : "snow"
    };

    const updateText = (value: string) => {
        setText(value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '0 10px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <Editor
                        ref={quillRef}
                        readOnly={options.readOnly}
                        defaultValue={new Delta().insert(text)}
                        onSelectionChange={setRange}
                        onTextChange={setLastChange}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
