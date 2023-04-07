import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

type NoUserModalProps = {
  toggleView?: React.Dispatch<React.SetStateAction<boolean>>
}

const noUserModalVariants = {
  hidden: {
    opacity: 0,
    y: -400,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2,
    },
  },
  exit: {
    opacity: 0,
    y: 400,
  },
}

const NoUserModal = ({ toggleView }: NoUserModalProps) => {
  const navigate = useNavigate()

  return (
    <motion.div
      className='nouser-modal overlay'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className='modal' variants={noUserModalVariants} initial='hidden' animate='visible' exit='exit'>
        <h3>Please Login or Sign Up to view your profile!</h3>
        <div className='actions'>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NoUserModal
