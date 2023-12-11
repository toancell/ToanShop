import React, { useEffect } from 'react'
import Layout    from '../../layout/Layout'
import axios from 'axios'
import { useState } from 'react'
import ShowProduct from '../../components/ShowProduct'
import {Radio } from "antd"
const Product = () => {
  const {Group} = Radio;
  const [valueCategory, setValueCategory]= useState()
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])
  const [selected, setSelected] = useState("")
  const getCategory = async () =>{
    try{
      const {data} = await axios.get("/api/v1/category/get-category")
      if(data?.success){
        setCategory(data.category)
  
      }
      
      
    }catch(err){
      console.log(err)
    }

  }
  
  const getAllProducts = async () =>{
    try{
      const {data} = await axios.get("/api/v1/product/get-product")
      if(data?.success){
        setProduct(data.product)
      }
    }catch(err){
      console.log(err)
    }
  }
  const handleChange= (e) =>{
    
    setValueCategory(e.target.value)

    setSelected(e.target.value)
    console.log(selected)
  }
  const filterProduct= async() =>{
    try{
      const {data} = await axios.post("/api/v1/product/product-filters",{selected})
      setProduct(data?.products)
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getCategory();
    getAllProducts();
  },[]);
  useEffect(()=>{
    if(selected ==="default"){getAllProducts()}
    else{filterProduct()}

  },[selected]);
  return (
    <Layout>
      <p className='text-center text-5xl font-bold mt-5'>All Products</p>
      <div className="flex justify-between gap-3 mt-9 mx-10 px-8">
        <div className="w-2/3 flex flex-wrap ">
          <h4>Filter by category</h4>
          <Group onChange={handleChange} value={valueCategory}>
            {
            category.map((item) => (
                <Radio value={item.name} name='category' key={item._id}> {item.name}</Radio>
            ))
          }
          </Group>
          
          
        </div>
        <div className="">
          <select name="" id="" value={selected} className="bg-black text-white px-2 rounded-sm" onChange={handleChange}>
            <option value="default">Default</option>
            <option value="high-to-low">High to low</option>
            <option value="low-to-high">Low to high</option>
            <option value="a-to-z">A-Z</option>
            <option value="z-to-a">Z-A</option>
          </select>
        </div>
      </div>
      <ShowProduct value={product}/>
    </Layout>
  )
}

export default Product
