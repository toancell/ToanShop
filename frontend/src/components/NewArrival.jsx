import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const NewArrival = () => {
  const [product, setProduct]= useState([])
  const getAllProducts = async () =>{
    try{
      const {data} = await axios.get("/api/v1/product/new-arrival");
      if(data?.success){
        setProduct(data?.product)
      }
      
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getAllProducts();
  },[])

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {product.map((item) => (
        <div key={item._id} className="flex flex-col  p-4 items-center justify-center  border-transparent hover:border-blue-700 border-4 min-h-[40vh]">
          <img src={`/api/v1/product/product-photo/${item._id}`} alt="" className='h-full object-cover' />
          <p className='text-xl font-bold'>Name</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>  
  )
}

export default NewArrival
