import React from 'react'

function Loader() {
  return (
    <div className='absolute top-0 flex justify-center items-center  h-screen w-screen bg-black bg-opacity-50'> <p className=' animate-bounce'>Loading...</p></div>
  )
}

export default Loader