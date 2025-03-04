import type React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth.context'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const router = useNavigate()
  const { user, profileUser } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token') || ''
    if (token) {
      const fetchUser = async () => {
        try {
          await profileUser(token)
        } catch (error) {
          console.error(error)
          router('/auth/login')
        } finally {
          setLoading(false)
        }
      }
      fetchUser()
    } else {
      router('/auth/login')
    }
  })

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/auth/login' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
