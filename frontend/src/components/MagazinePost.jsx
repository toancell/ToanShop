import React from 'react'
import { useNavigate } from 'react-router-dom'
const MagazinePost = ({data}) => {
    const navagate = useNavigate()
  return (
    <div className="w-full flex flex-col mt-8  ">
        {data.map((item) =>(
            
                <div className="hover:cursor-pointer hover:bg-slate-100 rounded-xl py-3 px-2" onClick={() =>{navagate(`/magazine/${item.slug}`)}}>
                    <div className="flex m-8">
                        <div className="w-[35%] h-[150px] flex justify-center items-center">
                            <img src="https://i.pinimg.com/originals/14/4d/81/144d8148c706a976180e23005f983b1e.jpg" alt="" className='h-full'/>
                        </div>
                    <div className="w-[65%] flex flex-col">
                        <h1 className="text-xl font-bold  md:text-2xl">
                            {item.title}
                        </h1>
                        <div className='flex justify-end space-x-2'>
                            <p >{new Date(item.createdAt).toString().slice(0,15)}</p>
                            <p>{new Date(item.updatedAt).toString().slice(16,24)}</p>                 
                        </div>
                        <p className='word-wrap:break-word'>{item.description}</p>  
                    </div>
                </div>
            </div>
            
            
            
        
        ))}
        
    </div>  
  )
}

export default MagazinePost
