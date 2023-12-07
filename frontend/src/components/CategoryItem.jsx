import React from 'react'

const CategoryItem = () => {
  return (
    <div className="flex flex-row gap-3 w-full">
        <div className=" h-[100vh] w-1/3 bg-center bg-[url('https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/ant_index_banner_1.jpg?1698225267798')] ">
            <button className="bg-black hover:bg-orange-500 px-6 py-2  text-white font-semibold rounded-sm">Shop Now</button>

        </div>
        <div className=" h-[100vh] w-1/3 bg-center bg-[url('https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/ant_index_banner_2.jpg?1698225267798')] ">
            <button className="bg-black hover:bg-orange-500 px-6 py-2  text-white font-semibold rounded-sm">Shop Now</button>

        </div>
        <div className=" h-[100vh] w-1/3 bg-center bg-[url('https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/ant_index_banner_3.jpg?1698225267798')] ">
            <button className="bg-black hover:bg-orange-500 px-6 py-2  text-white font-semibold rounded-sm">Shop Now</button>

        </div>
    </div>
  )
}

export default CategoryItem
