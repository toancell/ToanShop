import React from 'react'
import DashboardMenu from '../../components/DashboardMenu'
import Layout from '../../layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { ImagetoBase64 } from '../../utility/ImagetoBase64'


const CreateProduct = () => {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  
  

  
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        console.log("thanh cong")
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  
  return (
    <Layout>
      <div className="flex gap-20 mx-20 my-5 h-[80vh] justify-center items-center">
        <div className="  text-white w-60 h-auto">
          <DashboardMenu />
        </div>
        <div className="w-2/3 flex items-center flex-col ">
          <h1 className='text-xl'>Creat Product</h1>
          <div className='w-full flex flex-col'>
            <form action="" className='border-2 p-2 flex flex-col gap-1 '>
              <label htmlFor="name">Name : </label>
              <input type="text" name='name' className=' bg-slate-200' onChange={(e) =>{setName(e.target.value)}} />
              <label htmlFor="price">Price : </label>
              <input type="number" name='price' className=' bg-slate-200' onChange={(e) =>{setPrice(e.target.value)}}/>
              <label htmlFor="quantity">Quantity : </label>
              <input type="number" name='quantity' className=' bg-slate-200' onChange={(e) =>{setQuantity(e.target.value)}}/>
              <label htmlFor="category">Category: </label>
              <input type="text" name='category' className=' bg-slate-200' onChange={(e) =>{setCategory(e.target.value)}}/>
              
              <label htmlFor="description">Description : </label>
              <textarea  rows="8" cols="50" name='description' className='bg-slate-200' onChange={(e) =>{setDescription(e.target.value)}}/>
              <label htmlFor="image">Image</label>
              <input type="file"  accept="image/*" onChange={(e) => {setPhoto(e.target.files[0])}}/> 
            </form>
            <button className="p-3 max-w-[-150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer font-medium text-center py-1 rounded-full mt-4 items-center" onClick={handleCreate}>Create Product</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct;
