import React from 'react'
import Layout from '../../layout/Layout'
import MagazinePost from '../../components/MagazinePost'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
const Magazine = () => {
  const [magazine,setMagazine] = useState([])
  const getMagazine = async () => {
    
    try{
        const {data} = await axios.get("/api/v1/magazine/get-magazine-post")
        if(data?.success){
          setMagazine(data?.magazine)
          console.log(magazine)
        }
    }catch(err){
        console.log(err)
    }
}
useEffect(() => {
    getMagazine()
},[magazine])
  return (
    <Layout>
        <div className="px-8 md:px-[200px]">
           
            <MagazinePost  data={magazine} />

          
        </div>
        
    </Layout>
    
  )
}

export default Magazine
