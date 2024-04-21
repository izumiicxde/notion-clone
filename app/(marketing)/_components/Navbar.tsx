"use client"
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import React from 'react'
import Logo from './Logo'
import { ModeToggle } from '@/components/ModeToggle'
import { useConvexAuth } from 'convex/react'
import { SignInButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop()

    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-3",
            scrolled && "border-b shadow-sm "
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <p>loading....</p>
                )}
                {
                    !isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode='modal'>
                                <Button variant={"ghost"} size={"sm"}>Login</Button>
                            </SignInButton>
                        </>
                    )
                }
                <ModeToggle />
            </div>
        </div>
    )
}
