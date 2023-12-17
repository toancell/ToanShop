import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
const ShowProduct = ({value}) => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    
    
    return (
    <div className="flex justify-between gap-3  mx-10 px-8">
        <div className="grid grid-cols-5 gap-4 p-4">
        {value.map((item) => (
          <div key={item._id} className="flex flex-col p-4 items-center justify-center  border-transparent hover:border-blue-700 border-4 min-h-[40vh] gap-2">
            <img src={`/api/v1/product/product-photo/${item._id}`} alt="" className='h-full object-cover' />
            <p className='text-xl font-bold'>{item.name}</p>
            <p>{item.price}</p>
            <div className='flex gap-2'>
              <button onClick={()=>{navigate(`/product/${item.slug}`)}} className='p-2 bg-slate-100 '>Detail</button>
              <button onClick={() => {
                        if(cart?.indexOf(item) !== -1){
                          alert("san pham da co trong gio hang")
                        }else{
                          setCart([...cart, item]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, item])
                        );
                        }
                        
                      }} className='p-2 bg-slate-100'>Add to cart</button>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default ShowProduct 