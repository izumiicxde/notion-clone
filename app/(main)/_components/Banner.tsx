"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/ConfirmModal";

interface BannerProps {
    documentId: Id<"documents">
}

export default function Banner({ documentId }: BannerProps) {

    const router = useRouter();
    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.restore)

    const onRemove = () => {
        const promise = remove({
            id: documentId
        })

        toast.promise(promise, {
            loading: "Nuking the planet or the moon",
            success: "The planet | moon successfully nuked",
            error: "Failed to nuke. retry later"
        })

        router.push('/documents')
    }

    const onRestore = () => {
        const promise = restore({
            id: documentId
        })
        toast.promise(promise, {
            loading: "restoring the planet or the moon",
            success: "The planet | moon successfully restored",
            error: "Failed to restore. retry later"
        })
    }

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is in the nuking list
            </p>
            <Button
                size={"sm"}
                onClick={onRestore}
                variant={"outline"}
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restore
            </Button>
            <ConfirmModal
                onConfirm={onRemove}
            >
                <Button
                    size={"sm"}
                    // onClick={onRemove}
                    variant={"outline"}
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Delete
                </Button>
            </ConfirmModal>
        </div>
    )
}
