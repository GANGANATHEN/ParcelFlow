import Image from 'next/image'
import React from 'react'
import bg from "../../../public/image/bgg.svg"

const Testbg = () => {
  return (
    <div className='h-dvh'>
      <Image
        src={bg}
        alt='bg'
        className='w-full h-full'
      />
    </div>
  )
}

export default Testbg
