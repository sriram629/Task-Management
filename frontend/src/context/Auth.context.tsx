import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const BACKEND_URI = process.env.BACKEND_URI

type UserType = {
  name: string
  email: string
}

interface AuthContextIf {
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ token?: string; error?: string }>
  profileUser: (token: string) => Promise<UserType>
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextIf>({
  registerUser: async () => ({ success: false, message: 'Not implemented' }),
  loginUser: async () => ({ error: 'Not implemented' }),
  profileUser: async () => ({ name: '', email: '' }),
  user: { name: '', email: '' },
  setUser: () => {},
  logoutUser: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: '', name: '' })
  const navigate = useNavigate()

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${BACKEND_URI}/auth/register`, {
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      return { success: true, message: 'Registration successful' }
    } catch (error: unknown) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      }
    }
  }

  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ token?: string; error?: string }> => {
    try {
      const response = await fetch(`${BACKEND_URI}/auth/login`, {
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      return { token: data.token }
    } catch (error: unknown) {
      return {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      }
    }
  }

  const profileUser = async (token: string): Promise<UserType> => {
    try {
      const response = await fetch(`${BACKEND_URI}/auth/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user profile')
      }

      setUser(data.user)
      return data.user
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
      return { name: '', email: '' }
    }
  }

  const logoutUser = async () => {
    try {
      localStorage.removeItem('token')
      toast.success('Logout successful')
      setUser({ email: '', name: '' })
      navigate('/auth/login')
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    }
  }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        profileUser,
        user,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
