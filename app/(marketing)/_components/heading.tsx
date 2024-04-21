"use client"
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/shared'
import { useConvexAuth } from 'convex/react'
import { SignInButton } from "@clerk/clerk-react"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    return (
        <div className='max-w-3xl space-y-4 flex flex-col justify-center items-center'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Your Ideas, Documents & Plans.
                <br />
                Unified. Welcome to <span className='underline '>{siteConfig.name}</span></h1>
            <h3 className='text-base sm:text-xl md:text-2xl font-medium'>{siteConfig.name} is the connected workspace where <br /> Better and Faster work happens</h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size={"lg"} />
                </div>
            )}
            {
                isAuthenticated && !isLoading && (
                    <Button className='flex justify-center items-center gap-1' asChild>
                        <Link href={"/documents"}>
                            Enter Jotion
                            <ArrowRight className='h-5 w-5 ml-2' />
                        </Link>
                    </Button>
                )
            }
            {!isAuthenticated && !isLoading && (
                <>
                    <SignInButton mode='modal'>
                        <Button >
                            Get {siteConfig.name}.
                            <ArrowRight className='h-5 w-5 ml-1' />
                        </Button>
                    </SignInButton>
                </>
            )}
        </div>
    )
}

export default Heading