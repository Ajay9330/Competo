import React from 'react'

function Loader() {
  return (
    <div className='fixed z-50 overflow-hidden top-0 flex justify-center items-center  h-full w-full bg-black bg-opacity-90'> <p className=' animate-bounce text-white text-4xl'>Loading...</p></div>
  )
}

export default Loader