"use client"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react"
import "@blocknote/core/style.css"
import "@blocknote/react/style.css";
// import "@blocknote/core/fonts/inter.css";
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore";



interface EditorProps {
    onChange: (value: string) => void
    initialContent?: string
    editable?: boolean
}

const Editor = ({
    onChange, initialContent, editable
}: EditorProps) => {

    const { resolvedTheme } = useTheme()
    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })

        return response.url
    }

    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
        uploadFile: handleUpload,
    })

    const { edgestore } = useEdgeStore()




    return (
        <div>
            <BlockNoteView
                className="dark:bg-none"
                editor={editor}
                editable={editable}

                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => onChange(JSON.stringify(editor.document))}
            />
        </div>
    )
}


export default Editor