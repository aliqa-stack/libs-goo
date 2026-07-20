import React from 'react'

const Headers = () => {
  return (
    <section className='bg-gradient-to-br from-blue-500 to-indigo-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse md:flex-row items-center'>
        <div className='w-full md:w-1/2 text-center md:text-left space-y-6 '>
        <div className='bg-[#FFA500] border border-4 border-black py-6 px-3 rounded-lg shadow-[5px_8px_0px_0px_rgba(0,0,0,1)]'>
          <div className='bg-indigo-600 border border-2 border-black px-6 py-3 rounded-md'>
             <h1 className='text-4xl sm:text-5xl font-bold leading-tight'>library
          <span className='text-white'>books</span>
        </h1>

          </div>

        </div>
        <p className='text-lg sm:text-xl text-white/90'>
         Web for placing your favorite books ETC 
        </p>
        <div className='flex justify-center md:justify-start gap-4'>
          <a href="" className='px-6 py-3 bg-orange-400 rounded-lg font-semibold shadow-[5px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-500 transition'>Start Adding</a>
          <a href="" className='px-6 py-3 border border-white text-white rounded-lg shadow-[5px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-gray-900 transition'>Placeholder</a>
        </div>

        </div>

      </div>
      
    </section>
  )
}

export default Headers