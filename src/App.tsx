import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth'
import { Home, Login, SignUp, ProfilePage } from './pages'
import { ProtectedRoutes, ReverseProtectedRoute } from './components'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/profile'
          element={
            // <ProtectedRoutes>
            <ProfilePage />
            // </ProtectedRoutes>
          }
        />
        <Route
          path='/login'
          element={
            <ReverseProtectedRoute>
              <Login />
            </ReverseProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <ReverseProtectedRoute>
              <SignUp />
            </ReverseProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
