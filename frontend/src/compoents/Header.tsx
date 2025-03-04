import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/Auth.context'

const Header = () => {
  const { user } = useAuth()

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand fw-bold' to='/'>
          <span className='text-primary'>Task</span>Manager
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                to='/'
              >
                Dashboard
              </NavLink>
            </li>

            {user ? (
              <li className='nav-item'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to='/profile'
                >
                  Profile
                </NavLink>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    to='/auth/login'
                  >
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive ? 'active bg-primary rounded px-3' : ''
                      }`
                    }
                    to='/auth/register'
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
