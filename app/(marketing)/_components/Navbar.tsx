"use client"
import Logo from './Logo'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/ModeToggle'
import { useConvexAuth } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/shared'
import { Spinner } from '@/components/Spinner'
import Link from 'next/link'

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
                    <Spinner />
                )}
                {
                    !isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode='modal' >
                                <Button variant={"ghost"} size={"sm"}>Login</Button>
                            </SignInButton>
                            <SignInButton mode='modal' >
                                <Button size={"sm"}>
                                    Get {siteConfig.name} free
                                </Button>
                            </SignInButton>
                        </>
                    )
                }

                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant={"ghost"} size={"sm"} asChild>
                            <Link href={"/documents"}>Enter {siteConfig.name}</Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl='/'
                        />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}
