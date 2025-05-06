"use client"
import { useSidebarContext } from '@/contexts/SidebarContext'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import React, { MouseEvent } from 'react'

const NavigationToggle =  () => {
  const {isOpen, toggle} = useSidebarContext();
  const handleToggle = (e: MouseEvent<SVGSVGElement>) => {
    toggle();
  }
  return (
    <>
      {  
        (isOpen ? <X onClick={handleToggle}/> : <MenuIcon onClick={handleToggle}/>)
      }
      
      <Link href={"/"}>Nocodefy</Link>
    </>
  )
}

export default NavigationToggle