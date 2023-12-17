import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import {HiOutlineUserCircle} from "react-icons/hi"
import {BsCartFill} from "react-icons/bs"
import { useAuth } from '../context/auth'
import SearchInput from './SearchInput'
import { useCart } from '../context/cart'
const Header = () => {
  const [auth,setAuth] = useAuth()
  const [cart,setCart] = useCart()
  const [showMenu, setShowMenu]= useState(false);
  const handleShowMenu =()=>{
    setShowMenu( prev  => !prev)
  }
  const handleLogOut =()=>{
    setAuth( 
      {
        ...auth,
        user: null,
        token: "",
      }
    );
    localStorage.removeItem("auth")  
  }
  
  return (
    <header className=" shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12">
            <img src={logo} alt="" className='h-full'/>
          </div>
        </Link>
        <div className='flex items-center gap-6'>
          <nav className='flex items-center gap-4 md:gap-6 text-base md:text-lg' >
            <div>
              <SearchInput />
            </div>
            
            <Link to={""}>Home</Link>
            <Link to={"product"}>Product</Link>
            <Link to={"magazine"}>Magazines</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className='text-2xl text-slate-600 relative'>
            <Link to={"cart"}><BsCartFill /></Link>
            <div className='absolute -top-2 -right-1 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-center'>{cart.length}</div>
          </div>
          {
            !auth.user ? (
              <div className='text-2xl text-slate-600'>
                
                <div className="text-3xl cursor-pointer" onClick={handleShowMenu}>
                  <HiOutlineUserCircle />
                </div>
                {
                  showMenu && (
                    <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                      <Link to={"login"} className="whitespace-nowrap cursor-pointer">Login</Link>
                    </div>
                  )
                }
              </div>
            ) : (
              auth.user.role === 0 ? (
              <div className='flex items-center gap-5'>
                <div>Hi, {auth.user.name}</div>
                <div className='text-2xl text-slate-600'>
                  
                    <div className="text-3xl cursor-pointer" onClick={handleShowMenu}>
                        <img src={`/api/v1/auth/user/${auth.user._id}`} alt="" className='h-10 rounded-[50%]' />
                    </div>
                {
                  showMenu && (
                    <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                      <Link to={"login"} onClick={handleLogOut} className="whitespace-nowrap cursor-pointer">Log out</Link>
                    </div>
                  )
                }
                </div>
              </div>
              ) : (
                <div className=' flex items-center gap-5'>
                  <div>Hi, admin</div>
                  <div className='text-2xl text-slate-600'>
                      <div className="text-3xl cursor-pointer" onClick={handleShowMenu}>
                        <img src={  `/api/v1/auth/user/${auth.user._id}` ? `/api/v1/auth/user/${auth.user._id}` : {logo} } alt="" className='h-10 rounded-[50%]' />
                      </div>
                  {
                  showMenu && (
                    <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                      <Link to={"dashboard"} className="whitespace-nowrap cursor-pointer">Dashboard</Link>
                      <Link to={"login"} onClick={handleLogOut} className="whitespace-nowrap cursor-pointer">Log out</Link>
                    </div>
                  )
                }
                </div>
              </div>
              )
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header
