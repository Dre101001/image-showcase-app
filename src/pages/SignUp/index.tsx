import './SignUp.scss'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../config/supabaseClient'

const titleVariants = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
}

const formVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
    },
  },
}

const SignUp = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      })
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
      navigate('/')
    }
  }

  return (
    <div className='signup page'>
      {!loading ? (
        <>
          <motion.h2 variants={titleVariants} initial='hidden' animate='visible'>
            Sign Up
          </motion.h2>
          <motion.div variants={formVariants} initial='hidden' animate='visible' className='formCon'>
            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input type='text' required value={username} onChange={(e) => setUsername(e.target.value)} />
                <span>Username</span>
              </div>
              <div className='inputBox'>
                <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Email</span>
              </div>
              <div className='inputBox'>
                <input type='text' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <span>Password</span>
              </div>
              <button>Sign Up</button>
            </form>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              Have an account?{' '}
              <Link to='/login'>
                <span>Login</span>
              </Link>
            </motion.p>
          </motion.div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default SignUp
