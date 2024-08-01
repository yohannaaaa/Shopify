import React from 'react'
import HeroImage from './HeroImage'
import CardWithText from '../../CardWithText'


const Hero = () => {
  return (
    <div className='grid grid-cols-5 gap-4 overflow-x-hidden'>
     {HeroImage.map((image, index)=>(
        <CardWithText {...image} key={index}
        
        />
     ))
     }
    </div>
  )
}

export default Hero
