import React from 'react'

const Footer = () => {
  return (
      <footer className='bg-blue-200 px-4 md:px-16 lg:px-28'>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='mt-3'>
                <h2 className='text-lg font-bold mb-4'>About This Web</h2>
                <p className='text-orange-800'>Its just my learning and fun project, learning about Golang and React</p>
            </div>
            <div className='mt-3'>
                <h2>Quick Links</h2>
                <ul>
                    <li><a href="" className='hover:underlined text-gray-800'>home</a></li>
                    <li><a href="" className='hover:underlined text-gray-800'>Service</a></li>
                    <li><a href="" className='hover:underlined text-gray-800'>Contact</a></li>
                </ul>
            </div>
            <div className='mt-3'>
                <h2 className='font-bold text-lg'>Follow Us</h2>
            </div>
        </div>
            <div className='border-t p-4 border-gray-800 text-center mt-2'>
                <p>2026 Code By Alik Al Maliki</p>
            </div>

      </footer>
  )
}

export default Footer