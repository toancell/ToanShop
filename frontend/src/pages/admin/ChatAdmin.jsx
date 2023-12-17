import React, { useEffect } from 'react'
import DashboardMenu from '../../components/DashboardMenu'
import Layout from '../../layout/Layout'
import {HiOutlineUserCircle} from "react-icons/hi"
import axios from 'axios'
import { useState } from 'react'
const ChatAdmin = () => {
  const [user,setUser] = useState([])
  const getAllUsers = async () =>{
    try{
      const {data} = await axios.get("/api/v1/auth/all-user")
      if(data?.success){
        setUser(data.user)
      }
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    getAllUsers()
  },[])
  return (
    <Layout>
      <div className="w-[80vw] h-[80vh] flex mt-10 mx-auto">
        <div className="w-1/3 h-full bg-slate-500 flex items-center flex-col ">
          <h1 className="text-2xl text-center mt-2 mb-10">All user</h1>
          {
            user?.map((item)=>(
              <div className="w-[80%] h-[50px] rounded-xl flex justify-start items-center bg-slate-400 p-5 space-x-4 mb-4">
                <img src={`/api/v1/auth/user/${item._id}`} alt="" className='h-10 rounded-[50%]'/>
                <h2 key={item._id}>{item.name}</h2>
              </div>
            ))
          }
        </div>
        <div className="w-2/3 h-full bg-slate-300">
          chat
        </div>
      </div>
    </Layout>
  )
}

export default ChatAdmin
