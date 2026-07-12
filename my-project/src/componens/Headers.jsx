import React from 'react'

const Headers = () => {
  return (
    <section className='bg-gradient-to-br from-blue-500 to-indigo-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse md:flex-row items-center'>
        <div className='w-full md:w-1/2 text-center md:text-left space-y-6'>
        <h1 className='text-4xl sm:text-5xl font-bold leading-tight'>library
          <span className='text-orange-400'>books</span>
        </h1>
        <p className='text-lg sm:text-xl text-white/90'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className='flex justify-center md:justify-start gap-4'>
          <a href="" className='px-6 py-3 bg-orange-400 rounded-lg font-semibold hover:bg-orange-500 transition'>Start Adding</a>
          <a href="" className='px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition'>Placeholder</a>
        </div>

        </div>

      </div>
      
    </section>
  )
}

export default Headers