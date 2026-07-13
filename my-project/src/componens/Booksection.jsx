import React from 'react'

const Booksection = () => {
  return (
    <div className='bg-gradient-to-br from-blue-400 to-indigo-600 '>
        <div className='py-6 px-3 bg-[#FFA500]'>
          <h1 className='text-2xl font-bold'>Gallery</h1>

        </div>
           
        <div className="grid grid-cols-4 grid-rows-4 gap-5 rounded-2xl my-8 bg-slate-100 p-5 shadow-inner">
            <div className="row-span-4 h-64 rounded-xl bg-white p-4 shadow-sm">
                <div className="">

                </div>
            </div>
            <div className="row-span-4 rounded-xl bg-white p-4 shadow-sm">2</div>
            <div className="row-span-4 rounded-xl bg-white p-4 shadow-sm">3</div>
            <div className="row-span-4 rounded-xl bg-white p-4 shadow-sm">4</div>
        </div>
            



    </div>
  )
}

export default Booksection