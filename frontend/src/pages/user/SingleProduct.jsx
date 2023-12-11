import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Layout from '../../layout/Layout'
const SingleProduct = () => {
    const params = useParams()
    const [product,setProduct] = useState({})
    useEffect(() =>{
      if(params?.slug)  getProduct()
    },[params?.slug])
    const getProduct = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            data?.success ? setProduct(data?.product) : console.log("hehe")
            console.log(product)
        }catch(err){
            console.log(err)
        }
    }
    
  return (
    <Layout>
      <div className='grid grid-cols-3 gap-4 w-[70vw] mx-auto mt-10 '>
        <div className='col-span-2'>
          <img src={`/api/v1/product/product-photo/${product._id}`} alt="" className='w-[70%]'/>
          
        </div>
        <div className='col-span-1'> 
          <h1 className="text-3xl">{product.name}</h1>
          <p>{product.price}$</p>
          <form className='flex gap-3'>
            <input type="radio" name="size" /> Size M
            <input type="radio" name="size" /> Size L
            <input type="radio" name='size'/> Size XL
          </form>
          <button className='px-3 w-full py-2 text-3xl border border-sky-100 text-center'>Mua ngay </button>
          <p>{product.description}</p>
        </div>
      </div>
    </Layout>
  )
}

export default SingleProduct
