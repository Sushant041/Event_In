import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img from "@/public/assets/images/logo-no-background.svg"

const Footer = () => {
  return (
    <footer className="bordre-t bg-gray-100 text-center py-3">
      <div className='flex-center wrapper flex-between flex flex-col gap-4 text-center sm:flex-row'>
        <Link href="/">
          <Image 
            src={img} 
            alt="Logo" 
            height={40} 
          />
        </Link>
       <p>&copy; 2024, All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer