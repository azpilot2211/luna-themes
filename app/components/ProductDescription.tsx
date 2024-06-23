"use client"

import { type JSONContent, useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function ProductDescription({content}: {content: JSONContent}) {
    const editor = useEditor({
        editable: false,
        extensions: [StarterKit],
        content: content,
        editorProps: {
            attributes: {
                class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
            }
        }
    });

    if(!editor) return null;
    return(
        <>
            <EditorContent editor={editor} className=' p-2 min-h-[150px] mt-2' />
        </>
    )
}