"use client"
import { headerLinks } from '@/constants/index'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className='md:flex-between w-full flex gap-6 flex-col items-start md:flex-row'>
     {
      headerLinks.map((link) => {
        const isActive = pathname === link.href
        return (
        <li 
           key={link.id} 
           className={`${ isActive && `text-blue-500`} flex-center p-medium-16 whitespace-nowrap hover-underline-animation`}
           >
            <Link href={link.href}>
              {link.name}
            </Link>
        </li>)
      })
     }
    </ul>
  )
}

export default NavItems