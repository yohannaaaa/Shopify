'use client';
import React from 'react'
import HeroImage from './HeroImage'
import CardWithText from '../../CardWithText'


const Hero = () => {
  function handleSubmit(index:number){
       console.log(index)
  }
  return (
    <div className='grid grid-cols-5 gap-4 overflow-x-hidden mb-5'>
     {HeroImage.map((image, index)=>(
      <div onClick={() => handleSubmit(index)}>
        <CardWithText {...image} key={index}/>
        </div>
     ))
     }
    </div>
  )
}

export default Hero
