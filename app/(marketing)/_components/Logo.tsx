import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/shared'

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
})

const Logo = () => {
    return (
        <div className='hidden md:flex items-center gap-2'>
            <Image src={"/logo.svg"} height={40} width={40} alt='logo' className='dark:hidden' />
            <Image src={"/logo-dark.svg"} height={40} width={40} alt='logo' className='hidden dark:block' />
            <p className={cn("font-semibold tracking-widest uppercase", font.className)}>{siteConfig?.name}</p>
        </div>
    )
}

export default Logo