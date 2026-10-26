"use client"

import RegisterForm from '@/components/RegisterForm'
import Welcome from '@/components/Welcome'
import React from 'react'

const Register = () => {
  const [step,setStep] = React.useState<number>(1)
  return (
    <div>{
      step === 1 ? <Welcome nextStep={() => setStep(2)}/> :<RegisterForm prevStep={() => setStep(1)}/>
      }
    </div>
  )
}

export default Register
