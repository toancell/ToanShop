import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-row justify-center align-center">
            <div className="w-full flex align-center">
                <input type="text" value={value} className="form-control  bg-slate-200 px-2 py-1 rounded  focus-within:outline-blue-300 w-2/3" placeholder="Enter new category"  onChange={(e) => setValue(e.target.value)} />
            </div>
            <button type="submit" className="p-3 max-w-[-150px]  bg-red-500 hover:bg-red-600 cursor-pointer font-medium text-center py-1 rounded-full items-center">Submit</button>
        </form>
    </>
  )
}

export default CategoryForm
