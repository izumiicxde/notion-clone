"use client"
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/shared'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const Heading = () => {
    return (
        <div className='max-w-3xl space-y-4 flex flex-col justify-center items-center'>
            <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold'>Your Ideas, Documents & Plans. Unified. Welcome to <span className='underline '>{siteConfig.name}</span></h1>
            <h3 className='text-base sm:text-xl md:text-2xl font-medium'>{siteConfig.name} is the connected workspace where <br /> Better and Faster work happens</h3>
            <Button className='flex justify-center items-center gap-1 '>
                Enter Jotion
                <ArrowRight className='h-5 w-5 ml-2' />
            </Button>
        </div>
    )
}

export default Heading