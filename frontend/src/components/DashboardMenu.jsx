import React from 'react'
import logo from "../assets/logo.png"
import { Link, NavLink } from 'react-router-dom'
const DashboardMenu = () => {
  const DASHBOARD_MENU_DATA = [
    {
      key: "Profile",
      path: "/dashboard",
    },
    {
      key: 'Chat',
      path: "/dashboard/chatadmin"
    },
    {
      key: "User",
      path: "/dashboard/userdashboard",
    },
    {
      key: "Product",
      path: "",
    },
    {
      key: 'Create User',
      path: "",
    },
    {
      key: 'Create Category',
      path: "",
    },
    {
      key: 'Create Product',
      path: "dashboard/create-product",
    },
    {
      key: 'Promote',
      path: ""
    }
  ]

  
  return (
    
      <div className='flex flex-col bg-black' >
        {DASHBOARD_MENU_DATA.map((item) =>  (
          <Sidebar key={item.key} item={item}/>
))}
      </div>

      
  
  )
}

const Sidebar =({item}) =>{
  return (
    <NavLink to={item.path} className="font-light text-center hover:text-black hover:bg-neutral-100 p-3 ">
      <span>{item.key}</span>
    </NavLink>
  )
}

export default DashboardMenu
