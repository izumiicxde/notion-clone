import React from 'react'
import { Footer, Heading, Heroes } from "./_components"

const MarketingPage = () => {
  return (
    <div className='min-h-screen border flex flex-col'>
      <div className="flex flex-col items-center justify-center md:justify-start mt-10 text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  )
}

export default MarketingPage