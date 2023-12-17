import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { useCart } from '../../context/cart'
const Cart = () => {
    const [cart,setCart] = useCart()
    const ChangeQuantity = (product,num) =>{
        const newProduct = cart.indexOf(product)
        const newCart = [...cart]
        newCart[newProduct].quantity += num
        setCart([...newCart])
        
    }
    const deleteProduct = (pid) =>{
        try{
            let myCart = [...cart]
            let index  =myCart.findIndex((item) =>
                item._id === pid
            )
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        }catch(err){
            console.log(err)
        }
    }
    console.log(cart)
  return (
    
    <Layout>
        <div className="">
        <div className="h-[100px] flex items-center justify-center bg-slate-200">
            <h1 className="text-center  text-2xl font-bold ">Shopping Cart</h1>
        </div>
        <div className=" w-full h-[100vh] flex">
            <div className="w-2/3 flex flex-col items-center p-10">
                <table className="table-fixed text-center">
                    <thead className='border-b-2 border-black-100' >
                        <tr >
                            <th className="p-10">Product</th>
                            <th className="p-10">Price</th>
                            <th className="p-10">Quantity</th>
                            <th className="p-10">Total</th>
                            <th className="p-10"></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {cart?.map((item,key) =>(
                        <tr className='tr-8 border-b-2 border-black-100' key={item._id} >
                            <td className='p-4'>
                                {item.name}
                            </td>
                            <td className='p-4'>{item.price}</td>
                            <td className='p-4 flex gap-3 justify-between'>
                                <button className='btn border border-blue-100 px-2' onClick={()=>{ChangeQuantity(item,-1)}}  > - </button>
                                    <span>{item.quantity}</span>
                                <button className='btn border border-blue-100 px-2'  > + </button>
                            </td>
                            <td className='p-4'></td>
                            <td className='p-4' >
                                <button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-1/3 flex flex-col items-center p-10 ">
                <div className="p-5 tr-8 ">
                    <h2 className='text-center  text-2xl font-bold'>Cart total</h2>

                </div>
                <div className="">
                    <p> Subtotal: 10.20022222222222222222</p>
                </div>
                <div>
                    <h3>Shipping: </h3>

                </div>
                <div>Total</div>

            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Cart
