import React, { forwardRef, useEffect, useLayoutEffect, useRef, RefObject } from 'react';
import Quill from 'quill';

interface EditorProps {
    readOnly?: boolean;
    defaultValue?: any;
    onTextChange?: (...args: any[]) => void;
    onSelectionChange?: (...args: any[]) => void;
    options: {}
}

const Editor = forwardRef<Quill, EditorProps>(
    ({ readOnly, defaultValue, onTextChange, onSelectionChange, options }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        useEffect(() => {
            (ref as RefObject<Quill>).current?.enable(!readOnly);
        }, [ref, readOnly]);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const editorContainer = container.appendChild(
                container.ownerDocument.createElement('div')
            );
            const quill = new Quill(editorContainer, options);

            (ref as React.MutableRefObject<Quill>).current = quill;

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            quill.on(Quill.events.TEXT_CHANGE, (...args: any[]) => {
                onTextChangeRef.current?.(...args);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args: any[]) => {
                onSelectionChangeRef.current?.(...args);
            });

            return () => {
                (ref as React.MutableRefObject<Quill | null>).current = null;
                container.innerHTML = '';
            };
        }, [ref]);

        return <div ref={containerRef}></div>;
    }
);

Editor.displayName = 'Editor';

export default Editor;