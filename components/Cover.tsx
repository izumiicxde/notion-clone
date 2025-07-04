"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"
import { useCoverImage } from "@/hooks/useCoverImage"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { useEdgeStore } from "@/lib/edgestore"
import { Skeleton } from "./ui/skeleton"

interface CoverImageProps {
    url?: string
    preview?: boolean
}
export default function Cover({ url, preview }: CoverImageProps) {

    const coverImage = useCoverImage()
    const removeCoverImage = useMutation(api.documents.removeCoverImage)
    const { edgestore } = useEdgeStore()
    const params = useParams()


    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            })
        }

        removeCoverImage({
            id: params.documentId as Id<"documents">
        })
    }

    return (
        <div className={cn(
            "relative w-full h-[40vh] group",
            !url && "h-[20vh]",
            url && "bg-muted"

        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="cover"
                    className="object-cover object-center"
                />
            )}
            {
                url && !preview && (
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-2">
                        <Button onClick={() => coverImage.onReplace(url)} className="text-muted-foreground text-xs backdrop-blur-lg" variant={"outline"} size={"sm"}>
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Change Cover
                        </Button>
                        <Button onClick={onRemove} className="text-muted-foreground text-xs  backdrop-blur-lg" variant={"outline"} size={"sm"}>
                            <X className="h-4 w-4 mr-2" />
                            Remove Icon
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton
            className="w-full h-[20vh]"
        />
    )
}