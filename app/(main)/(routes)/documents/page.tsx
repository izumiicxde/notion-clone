"use client"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/shared"
import { useUser } from "@clerk/clerk-react"
import { PlusCircleIcon } from "lucide-react"
import Image from "next/image"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"


export default function Documents() {
    const { user } = useUser()
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({ title: "untitled planet" })

        toast.promise(promise, {
            loading: "Creating a new planet..",
            success: "New planet created",
            error: "Insufficient gases and mixtures for planet. Planet exploded."
        })
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center space-y-4 select-none'>
            <Image src={"/empty.png"} height={300} width={300} alt="empty" className="dark:hidden" />
            <Image src={"/empty-dark.png"} height={300} width={300} alt="empty" className="dark:block hidden" />
            <h2 className="text-lg font-bold">
                Welcome to {user?.firstName}&apos;s Galaxy
            </h2>
            <Button className="rounded-full" onClick={onCreate}>
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                Create a planet
            </Button>
        </div>
    )
}
