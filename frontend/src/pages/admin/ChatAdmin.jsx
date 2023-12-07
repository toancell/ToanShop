import React from 'react'
import DashboardMenu from '../../components/DashboardMenu'
import Layout from '../../layout/Layout'
const ChatAdmin = () => {
  return (
    <Layout>
      <div className="flex items-center mx-20 my-10">
        <div className=" bg-black text-white w-60 ">
          <DashboardMenu />
        </div>
        <div className="flex-2  ">
          hi
        </div>
      </div>
    </Layout>
  )
}

export default ChatAdmin
