import './Modals.scss'
import { useAuth } from '../../hooks/Auth'
import { motion } from 'framer-motion'

type Props = {
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>
}

const logoutModalVariants = {
  hidden: {
    opacity: 0,
    y: -400,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 400,
  },
}

const LogoutModal = ({ setLogoutModal }: Props) => {
  const { signOut } = useAuth()

  return (
    <motion.div
      className='overlay logout-modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className='modal' variants={logoutModalVariants} initial='hidden' animate='visible' exit='exit'>
        <h3>Are you sure you want to logout?</h3>
        <div className='actions'>
          <button onClick={() => setLogoutModal(false)}>Cancel</button>
          <button onClick={() => signOut()}>Ok</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LogoutModal
