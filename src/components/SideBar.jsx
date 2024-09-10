import React from 'react'
import Navbar, { SideBarItem } from './NavBar'
import {CircleHelp, Clipboard, Gem, Layers, LayoutDashboard, Mail, Search } from 'lucide-react';
export default function SideBar() {
  return (
      <Navbar>
        <SideBarItem icon={<Search size={20} />} text="Search"  />
        {/* <SideBarItem icon={<LayoutDashboard size={20} />} text="Dashboard"  /> */}
        <SideBarItem icon={<Layers size={20} />} text="Resources"  />
        <SideBarItem icon={<Mail size={20} />} text="Affiliated Programs"  />
        <SideBarItem icon={<Gem size={20} />} text="Earnings"  />
        <SideBarItem icon={<Clipboard size={20} />} text="Guidelines"  />
        <SideBarItem icon={<CircleHelp size={20} />} text="Help Centre /FAQs"  />
      </Navbar>
      
  )
}
