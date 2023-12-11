import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../context/search'
import axios from 'axios'
import {SearchOutlined} from "@ant-design/icons"
const SearchInput = () => {
    const navigate = useNavigate()
    const  [value,setValue] = useSearch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`/api/v1/products/${value.keyword}`)
            setValue({...value,result: data})
            navigate("/search")
        }catch(err) {
            console.log(err)
        }
    }
  return (
    <div>
        <form action="" role='search' onSubmit={handleSubmit} className='relative'>
            <input type="text" value={value.keyword} onChange={(e)=>{setValue({...value, keyword: e.target.value})}} placeholder='Search' className='py-1 px-2 rounded-xl outline-none border border-solid border-blue-500 pr-9' />
            <SearchOutlined className='absolute top-1/2 right-[-5px] transform -translate-x-1/2 -translate-y-1/2 text-2xl' type='submit'/>
        </form>
    </div>
  )
}

export default SearchInput
