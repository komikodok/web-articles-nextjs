import Navbar from '@/components/navbar/Navbar'
import React from 'react'

const ArticleLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className='bg-amber-50/70'>
        <Navbar></Navbar>

        {children}
    </div>
  )
}

export default ArticleLayout
