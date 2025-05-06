"use client"
import { useSidebarContext } from '@/contexts/SidebarContext';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import React, { MouseEvent } from 'react'

const NavigationToggle =  ({isAuthenticated}: {isAuthenticated: boolean} ) => {
  const {isOpen, toggle} = useSidebarContext();
  const handleToggle = (e: MouseEvent) => {
    toggle();
  }
  return (
    <>
    {
      isAuthenticated && (!isOpen ? <MenuIcon onClick={handleToggle}/> : <XIcon onClick={handleToggle}/>)
    }
      <Link href="/" className="text-xl font-bold">
        NoCodefy
      </Link>
    </>
  )
}

export default NavigationToggle