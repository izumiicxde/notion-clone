"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"



const Error = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4 ">
            <Image
                src={'/error.png'}
                height={300}
                width={300}
                alt="error image"
                className="dark:hidden"
            />
            <Image
                src={'/error-dark.png'}
                height={300}
                width={300}
                alt="error image"
                className="dark:block hidden"
            />


            <h2 className=" text-xl md:text-2xl font-semibold "> The planet or the moon was not found.</h2>

            <Button asChild>
                <Link href={"/documents"}>
                    Go back
                </Link>
            </Button>
        </div>
    )
}

export default Error