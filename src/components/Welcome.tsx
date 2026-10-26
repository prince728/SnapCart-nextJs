"use client"

import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'

type PropType = {
  nextStep: () => void
}

const Welcome = ({ nextStep }: PropType) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
      <motion.div
        initial={{
          opacity: 0,
          y: -10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}

        className='flex items-center justify-center gap-3'
      >
        <ShoppingBasket className='w-10 h-10 text-green-600' />
        <h1 className='text-4xl md:text-5xl font-extrabold text-green-700'>Snapcart</h1>
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6,
          delay: 0.3
        }}
        className='text-lg text-gray-700 mt-4 md:text-xl max-w-lg'
      >
        Your one-stop destination for effortless grocery shopping. Scan, shop, and save with ease!
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.6,
          delay: 0.5
        }}
        className='flex items-center justify-center gap-4 mt-8'
      >
        <ShoppingBasket className='w-24 h-24 md:w-32 md:h-32 text-green-600' />
        <Bike className='w-24 h-24 md:w-32 md:h-32 text-orange-600' />
      </motion.div>

      <motion.button
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6,
          delay: 0.6
        }}
        className='mt-10 inline-flex bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300'

        onClick={nextStep}
      >
        Next
        <ArrowRight className='w-5 h-5 ml-2 inline-block' />
      </motion.button>


    </div>
  )
}

export default Welcome
