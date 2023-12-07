import React from 'react'

const Banner = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col justify-center  py-12  xl:px-28 px-4 bg-[url('https://theme.hstatic.net/1000306633/1000891824/14/slideshow_3.jpg?v=645')]" >
        <div className="ml-10 bg-white w-1/3 p-6 bg-opacity-80">
            <h1 className="text-6xl font-bold mb-5">Collections</h1>
            <p className='text-xl mb-7'>You can explore and shop many different collections from various barands here.</p>
            <button className="bg-black hover:bg-orange-500 px-6 py-2  text-white font-semibold rounded-sm">Shop Now</button>
        </div>
    </div>
  )
}

export default Banner
