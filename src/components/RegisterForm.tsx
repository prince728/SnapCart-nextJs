import { ArrowLeft, Leaf, User, Mail, Lock, EyeIcon, EyeOff, LogIn, Loader2 } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import googleIcon from '@/assets/google-icon.png'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


type PropType = {
    prevStep: () => void
}

const RegisterForm = ({ prevStep }: PropType) => {
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const router = useRouter()


    const [error, setError] = React.useState<string>('')

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const response = await axios.post('/api/auth/register', { name, email, password })
            router.push("/login")
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Server said:', err.response?.data)
                setError(err.response?.data?.message ?? 'Registration failed. Please try again.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
            <button
                type="button"
                onClick={prevStep}
                className='absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer'
            >
                <ArrowLeft className='w-5 h-5' />
                <span className='font-medium'>Back</span>
            </button>

            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-3xl font-extrabold text-green-800 mb-2'
            >
                Create Account
            </motion.h1>
            <p className='text-gray-600 text-center mb-6 flex flex-xol items-center justify-center'>
                Join Snapcart Today<Leaf className='inline-block w-4 h-4 ml-1 text-green-600' />
            </p>
            <motion.form
                onSubmit={handleRegister}
                method="POST"
                className='w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >

                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {
                        showPassword ?
                            <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} />
                            :
                            <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />
                    }

                </div>

                {
                    (() => {
                        const isFormValid = name !== '' && email !== '' && password !== ''
                        return <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isFormValid || loading}
                        >{
                                loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Register"
                            }
                        </button>
                    })()
                }


                <div className='flex items-center gap-2 text-gray-400 text-sm mt-2'>
                    <span className='flex-1 h-px bg-gray-200'></span>
                    OR
                    <span className='flex-1 h-px bg-gray-200'></span>

                </div>

                <button
                    onClick={() => signIn('google',{callbackUrl: '/'})}
                    type="button"
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-4"
                >
                    <Image src={googleIcon} alt="Google" width={20} height={20} />
                    Continue with Google
                </button>

            </motion.form>

            <p className='text-gray-600 text-sm mt-4 flex items-center justify-center gap-2' onClick={() => router.push('/login')}>
                Already have an account?
                <LogIn />
                <span className='text-green-700 hover:text-green-800 font-medium cursor-pointer' onClick={() => router.push('/login')}>
                    Login
                </span>
            </p>



        </div >



    )
}

export default RegisterForm