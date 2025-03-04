import { Outlet } from 'react-router-dom'
import Header from './compoents/Header'
import ContextProvider from './context/ContextProvider'

const App = () => {
  return (
    <ContextProvider>
      <div className='min-vh-100 d-flex flex-column bg-light'>
        <Header />
        <main className='flex-grow-1 container py-4'>
          <Outlet />
        </main>
        <footer className='py-3 bg-dark text-white text-center'>
          <div className='container'>
            <p className='mb-0'>
              Task Management System &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </ContextProvider>
  )
}

export default App
