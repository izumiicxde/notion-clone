"use client"

import { Spinner } from "@/components/Spinner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { SearchIcon, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useState } from "react";
import { toast } from "sonner";

export default function Trashbox() {
    const router = useRouter()
    const params = useParams()

    const documents = useQuery(api.documents.getTrash)
    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search, setSearch] = useState("")

    const filteredDocuments = documents?.filter((document) => {
        return document.title.includes(search?.toLowerCase())
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
        event.stopPropagation();
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: "Moon is being restored...",
            success: "Moon successfully restored",
            error: "Sorry moon couldn't be restored"
        })
    }


    const onRemove = (documentId: Id<"documents">) => {

        const promise = remove({ id: documentId })

        toast.promise(promise, {
            loading: "Moon is being destroyed...",
            success: "Moon successfully nuked",
            error: "Sorry moon couldn't be nuked."
        })


        if (params.documentId === documentId) {
            router.push("/documents")
        }
    }
    if (documents === undefined) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Spinner size={"lg"} />
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <SearchIcon className="h4 w-4 " />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title"
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No document found
                </p>

                {filteredDocuments?.map((document) => (
                    <div className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between" role="button" onClick={() => onClick(document._id)} key={document._id}>
                        <span className="truncate pl-2">{document.title}</span>
                        <div className="flex items-center">
                            <div
                                className="rounded-sm p-2 hover:bg-neutral-200/30"
                                onClick={(e) => onRestore(e, document._id)}
                                role="button"
                            >
                                <Undo className="w-4 h-4 text-muted-foreground" />
                            </div>
                            {/* DELETE PAGE */}
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>

                                <div
                                    className="rounded-sm p-2 hover:bg-red-200/30 hover:text-red-400/80 dark:hover:text-red-400/40 text-muted-foreground"
                                    role="button"

                                >
                                    <Trash className="h-4 w-4" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
