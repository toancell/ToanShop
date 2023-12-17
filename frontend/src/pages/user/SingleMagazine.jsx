import React, { useEffect } from 'react'
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const SingleMagazine = () => {
    const params = useParams()
    const [magazine, setMagazine] = useState({})
    useEffect(()=>{
        if(params?.slug) getSingleMagazine()
    },[params?.slug])
    const getSingleMagazine = async () => {
        try{
            const {data} = await axios.get(`/api/v1/magazine/${params.slug}`)
            
            if(data?.success){
                setMagazine(data.magazine)
                console.log(magazine)
            }
        }catch(err) {
            console.log(err)
        }
    }
    
    
  return (
    <Layout>
        <div className="px-8 md:px-[200px] mt-8 w-2/3 mx-auto">
            <h1 className="text-2xl font-bold ">{magazine.title}</h1>
            <div className="flex justify-end mt-3 space-x-2">
                <p >{new Date(magazine.createdAt).toString().slice(0,15)}</p>
                <p>{new Date(magazine.updatedAt).toString().slice(16,24)}</p>


            </div>
            <hr className='my-8'/>
            <img src={`/api/v1/magazine/photo/${magazine._id}`} alt="" className="mx-auto " />
            <p className='mt-8'>{magazine.description}</p>
            


        </div>
    </Layout>
  )
}

export default SingleMagazine
