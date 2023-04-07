import './Login.scss'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import { ErrorModal } from '../../components'

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

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorModal, setErrorModal] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (error.status === 400) {
        setErrorModal(true)
        setLoading(false)
      }
    } else {
      setLoading(false)
      navigate('/')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='login page'>
      {!loading ? (
        <>
          <motion.h2 variants={titleVariants} initial='hidden' animate='visible'>
            Login
          </motion.h2>
          <motion.div variants={formVariants} initial='hidden' animate='visible' className='formCon'>
            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Email</span>
              </div>
              <div className='inputBox'>
                <input type='text' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <span>Password</span>
              </div>
              <button>Login</button>
            </form>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              Have an account?{' '}
              <Link to='/signup'>
                <span>Sign Up</span>
              </Link>
            </motion.p>
          </motion.div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <AnimatePresence mode='wait'>{errorModal && <ErrorModal toggleView={setErrorModal} />}</AnimatePresence>
    </div>
  )
}

export default Login
