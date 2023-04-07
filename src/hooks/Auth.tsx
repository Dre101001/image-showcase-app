import { Session, User } from '@supabase/supabase-js'
import { useContext, useState, useEffect, createContext } from 'react'
import supabase from '../config/supabaseClient'

type ContextType = {
  session: Session | null | undefined
  user: User | null | undefined
  signOut: () => void
}

const AuthContext = createContext<ContextType>({ session: null, user: null, signOut: () => {} })

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) throw error
      setSession(session)
      setUser(session?.user)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user)
    })

    setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
