import { motion } from 'framer-motion'

type ErrorModalProps = {
  toggleView: React.Dispatch<React.SetStateAction<boolean>>
}

const errorModalVariants = {
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

const ErrorModal = ({ toggleView }: ErrorModalProps) => {
  return (
    <motion.div className='error-modal overlay' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className='modal' variants={errorModalVariants} initial='hidden' animate='visible' exit='exit'>
        <h3>Wrong Email or Password!</h3>
        <div className='actions'>
          <button onClick={() => toggleView(false)}>Ok</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ErrorModal
