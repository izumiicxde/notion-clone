"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./Title";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;

}

export default function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {

    const params = useParams()
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    })

    if (document === undefined)
        return (
            <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center ">
                <Title.Skeleton />
            </nav>
        )

    if (document === null)
        return null


    return (
        <>
            <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
                {
                    isCollapsed && (
                        <ChevronsLeft
                            role="button"
                            onClick={onResetWidth}
                            className="h-6 w-6 text-muted-foreground rotate-180 hover:bg-black/10 dark:hover:bg-primary/10 rounded-md"
                        />

                    )
                }
                <div className="flex items-center justify-between w-full">
                    <Title initialData={document} />
                </div>
            </nav>
        </>
    )
}
