import './Modals.scss'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
  modalState: boolean
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}

const logoutModalVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -50,
  },
}

const InfoModal = ({ modalState, closeModal, title }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal(false)
    }, 3000)
  }, [modalState])

  return (
    <motion.div className='info-modal' variants={logoutModalVariants} initial='hidden' animate='visible' exit='exit'>
      <h3>{title}</h3>
      <div className='actions'>
        <span onClick={() => closeModal(false)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </span>
      </div>
    </motion.div>
  )
}

export default InfoModal
