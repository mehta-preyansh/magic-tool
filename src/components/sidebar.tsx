'use client';

import { useSidebarContext } from '@/contexts/SidebarContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FilesIcon, GlobeIcon, HouseIcon } from 'lucide-react';

const links = [
  {
    href: '/',
    label: 'Home',
    icon: <HouseIcon />,
  },
  {
    href: '/public-inventory',
    label: 'Public Inventory',
    icon: <GlobeIcon />,
  },
  {
    href: '/private-inventory',
    label: 'Private Inventory',
    icon: <FilesIcon />,
  },
]
export default function Sidebar() {
  const { isOpen } = useSidebarContext();

  return (
    <motion.aside
      initial={false}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-16 left-0 bottom-0 w-64 bg-surface z-50 p-4"
    >
      <nav className="space-y-4 flex flex-col">
        {
          links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-surface/50 transition-colors"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))
        }
      </nav>
    </motion.aside>
  );
}
