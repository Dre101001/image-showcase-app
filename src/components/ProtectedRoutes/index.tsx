import { useAuth } from '../../hooks/Auth'
import { Navigate } from 'react-router-dom'

type ProtectedProps = {
  children: React.ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}

export default ProtectedRoutes
