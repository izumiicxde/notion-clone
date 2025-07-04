"use client"

import { cn } from '@/lib/utils'
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import UserItem from './UserItem'
import { Item } from './Item'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { DocumentList } from './DocumentList'
import Trashbox from './Trashbox'
import { useSearch } from '@/hooks/useSearch'
import { useSettings } from '@/hooks/useSettings'
import Navbar from './Navbar'

const Navigation = () => {
    const search = useSearch()
    const settings = useSettings()

    const pathname = usePathname()
    const params = useParams()

    const isMobile = useMediaQuery("(max-width:768px)");
    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)

    const router = useRouter()

    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    const create = useMutation(api.documents.create)

    useEffect(() => {
        if (isMobile) collapse()
        else resetWidth()
    }, [isMobile])

    useEffect(() => {
        if (isMobile) collapse()
    }, [pathname, isMobile])

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;
        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty("width", isMobile ? "0" : 'calc(100% - 240px)')
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")

            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")

            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const handleCreate = () => {
        const promise = create({ title: "untitled planet" }).then((docId) => {
            router.push(`/documents/${docId}`)
        })


        toast.promise(promise, {
            loading: "Planet creation in progress",
            success: "Planet created.",
            error: "Failed.Planet exploded!"
        })
    }

    return (
        <div className='select-none h-full dark:bg-[#1f1f1f]'>
            <aside
                ref={sidebarRef}
                className={cn(
                    'group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"

                )}
            >
                <div
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                    role='button'
                    onClick={collapse}
                >
                    <ChevronsLeft className='h-6 w-6 ' />
                </div>

                <div className="">
                    <UserItem />
                    <Item onClick={search.onOpen} isSearch label="Search" icon={Search} />
                    <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
                    <Item onClick={handleCreate} label="New planet" icon={PlusCircle} />


                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label='Add a planet'
                    />
                    <Popover>
                        <PopoverTrigger className='w-full mt-4 '>
                            <Item label='trash' icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent
                            className='p-1 w-72'
                            side={isMobile ? "bottom" : "right"}
                        >
                            <Trashbox />
                        </PopoverContent>
                    </Popover>

                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
            </aside>
            <div
                className={cn("absolute top-0 z-[99999] left-60 w-[calc(100% - 240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
                ref={navbarRef} >
                {!!params?.documentId ? (
                    <Navbar
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                    />
                ) : (
                    <nav className='bg-transparent px-3 py-2 w-full'>
                        {isCollapsed && <ChevronsLeft className='h-6 rotate-180 w-6 text-muted-foreground' role='button' onClick={resetWidth} />}
                    </nav>
                )}
            </div>
        </div>
    )
}

export default Navigation