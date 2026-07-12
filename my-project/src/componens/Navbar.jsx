import React from 'react'

const Navbar = () => {
  return (
    <header className='flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-5xl rounded-full mx-auto w-full bg-blue-400 '>
       <a href="" className='text-2xl text-white font-bold'>Library</a> 
        <nav className='max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden  items-center justify-center max-md:h-full max-md:w-0 flex-col gap-8 md:flex-row flex text-sm font-normal'>
            <a href="">Others</a>

            <a href="">Books</a>

            <a href="">Abouts</a>

        </nav>
    </header>
  )
}

export default Navbar;