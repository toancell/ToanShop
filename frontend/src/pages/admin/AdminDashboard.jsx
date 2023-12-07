import React from 'react'
import DashboardMenu from '../../components/DashboardMenu'
import Layout from '../../layout/Layout'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
  const [auth] = useAuth()
  
  return (
    
    <Layout>
      <div className="flex gap-20 items-center mx-20 my-10">
        <div className=" bg-black  text-white w-60 ">
          <DashboardMenu />
        </div>
        <div className="flex-2 border-2 w-full h-full p-3 ">
          <div className="text-black">Hello, {auth?.user?.name}</div>
          <div className="text-black"> Your email: {auth?.user?.email}</div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
