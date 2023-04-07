import { useAuth } from '../../hooks/Auth'
import { Navigate } from 'react-router-dom'

type ProtectedProps = {
  children: React.ReactNode
}

const ReverseProtectedRoute = ({ children }: ProtectedProps) => {
  const { user } = useAuth()

  return <>{user ? <Navigate to='/' /> : children}</>
}

export default ReverseProtectedRoute
