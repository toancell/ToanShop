import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const ShowProduct = ({value}) => {
    
    
    
    
    return (
    <div className="flex justify-between gap-3  mx-10 px-8">
        <div className="grid grid-cols-5 gap-4 p-4">
        {value.map((item) => (
          <div key={item._id} className="flex flex-col p-4 items-center justify-center  border-transparent hover:border-blue-700 border-4 min-h-[40vh]">
            <img src={`/api/v1/product/product-photo/${item._id}`} alt="" className='h-full object-cover' />
            <p className='text-xl font-bold'>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))}
        </div>
    </div>
  )
}

export default ShowProduct