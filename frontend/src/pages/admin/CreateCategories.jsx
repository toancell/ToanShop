import React from 'react'
import DashboardMenu from '../../components/DashboardMenu'
import Layout from '../../layout/Layout'
import { useState,useEffect } from 'react'
import axios from 'axios'
import CategoryForm from '../../components/CategoryForm'
import {Modal} from 'antd'
const CreateCategories = () => {
    const [categories, setCategories] = useState([])
    const [name,setName] = useState("")
    const [visible,setVisible] = useState(false)
    const [updateName, setUpdateName] = useState("")
    const [selected,setSelected] = useState("")
    const handleSubmit= async (e) => {
        e.preventDefault()
        try{
          const {data}= await axios.post("/api/v1/category/create-category",{name})
          if(data?.success){
            getAllCategories()
            console.log(data)
          }else{
            console.log("hehe")
          }
        }catch(err){
          console.log(err)
        }
    }
    const handleUpdate= async (e) => {
      e.preventDefault()
      try{
        const {data}= await axios.put(`/api/v1/category/update-category/${selected._id}`,{name: updateName})
        if(data?.success){
          getAllCategories()
          setSelected(null)
            setUpdateName("")
            setVisible(false)
        }else{
          console.log("hehe")
        }
      }catch(err){
        console.log(err)
      }
    }
    const handleDelete = async (pID) => {
      
      try{
        const {data} = await axios.delete(`/api/v1/category/delete-category/${pID}`)
        if(data.success){
          getAllCategories()
        }
        else{
          console.log("hehe")
        }
      }catch(err){
        console.log(err)
      }
    }
    const getAllCategories = async () =>{
    try{
        const {data} = await axios.get("/api/v1/category/get-category");
        if(data?.success) {
            setCategories(data?.category)
            
        }

    }catch(err){
        console.log("err")
    }
}
    useEffect(()=>{
        getAllCategories();
        
    },[categories])
    
  return (
    <Layout>
      <div className="flex gap-20 h-[80vh] mx-20 my-5 justify-center  items-center">
        <div className="  text-white w-60 h-auto">
          <DashboardMenu />
        </div>
        <div className="w-2/3 flex items-center justify-center flex-col ">
          <h1 className='text-xl'>Creat Categories</h1>
          <div className='w-full my-2 '>
            <CategoryForm handleSubmit={handleSubmit}  setValue={setName}/>
          </div>
          <div className='w-full flex flex-col'>
            
            <table style={{border: '1px solid black', textAlign:" center"}}>
              <thead>
                <th scope="col">Name</th>
                <th scope='col'>Action</th>
                
              </thead>
              <tbody>
                {
                  categories?.map((category) =>(
                    <>
                      <tr>
                        <td key={category.id}>{category.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={() => {setVisible(true); setUpdateName(category.name) ; setSelected(category)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={ () =>{handleDelete(category._id)}}>Delete</button>
                        </td>
                      </tr>
                      
                    </>
                  ))
                }
              </tbody>
            </table>
            
            <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}>
              <CategoryForm handleSubmit={handleUpdate} value={updateName} setValue={setUpdateName}/>
            </Modal>
          </div>
        </div>
        
      </div>
    </Layout>
  )
}

export default CreateCategories
