import React ,{useState}from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function DashBoardContainer() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const [isListView, setIsListView] = useState(false); // State for view toggle

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} 
       isListView={isListView} setIsListView={setIsListView} />
      <Outlet context={{ searchQuery , isSidebarOpen , isListView }} />
    </div>
  )
}
