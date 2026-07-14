import React from 'react'

const Booksection = () => {
  return (


    <div className='bg-gradient-to-br from-blue-400 to-indigo-600 '>
        <div className='w-32 h-32 flex items-center '>
        <div className='py-6 px-3 bg-[#FFA500]'>
          <h1 className='text-2xl font-bold'>Gallery</h1>

        </div>
        
        </div>
          
        <div className="grid grid-cols-4 grid-rows-4 gap-5 rounded-2xl my-8  p-5 shadow-inner">
            <div className="row-span-4 h-64 rounded-xl bg-white p-4 shadow-sm block max-w-sm border border-default rounded-base">
                  <a href="" className='relstive h-10 flex items-center justify-center'><span>
                    PlaceHolder</span>
                    </a>
                  <div className='p-6 text-center'>
                    <span className='flex flex-1 flex-col items-center border border-brand-subtle text-xs font-medium px-0.5 py-0.5 rounded-md'>
                      Author
                    </span>
                    <a href="">
                      <h3 className='mt-3 mb-6 text-2xl font-semibold'>Book</h3>
                    </a>                 

                </div>
            </div>
            
          {/* cards */}

            <div className="row-span-4 rounded-xl bg-white p-4 shadow-sm">
                  <a href="" className='relstive h-10 flex items-center justify-center'>
                    <span>
                    PlaceHolder</span>
                    </a>
                  <div className='p-6 text-center'>
                    <span className='flex flex-1 flex-col items-center border border-brand-subtle text-xs font-medium px-0.5 py-0.5 rounded-md'>
                      Author
                    </span>
                    <a href="">
                      <h3 className='mt-3 mb-6 text-2xl font-semibold'>Book</h3>
                    </a>   
                    </div>              


            </div>
            <div className="row-span-4 rounded-xl bg-white p-4 shadow-sm">3</div>
            <div className="row-span-4 rounded-xl bg-white p-4 shadow-sm">4</div>
        </div>
            


{/* SOON WILL be changed */}


    </div>
  )
}


export default Booksection;
