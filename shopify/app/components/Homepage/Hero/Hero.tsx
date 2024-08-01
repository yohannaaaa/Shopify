'use client';
import React from 'react'
import HeroImage from './HeroImage'
import CardWithText from '../../CardWithText'
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter()
  function handleSubmit(index:number){
router.push(`/products/${index + 1}`)
  }
  return (
    <div className='grid grid-cols-5 gap-4 overflow-x-hidden mb-5'>
     {HeroImage.map((image, index)=>(
      <div onClick={() => handleSubmit(index)} key={index}>
        <CardWithText {...image} key={index}/>
        </div>
     ))
     }
    </div>
  )
}

export default Hero
