import { useAuth } from '../../context/Auth.context'
import ProtectedRoute from '../../compoents/ProtectedRoute'

const Profile = () => {
  const { user, logoutUser } = useAuth()

  return (
    <ProtectedRoute>
      <div className='row justify-content-center fade-in'>
        <div className='col-lg-8'>
          <div className='profile-header p-5 mb-4 my-4 rounded-3'>
            <div className='container-fluid py-4'>
              <h1 className='display-5 fw-bold mb-3'>{user && user.name}</h1>
              <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center'>
                <div className='mb-3 mb-md-0'>
                  <p className='fs-5 mb-1'>Email</p>
                  <p className='fs-4 fw-light'>{user && user.email}</p>
                </div>
                <button
                  onClick={logoutUser}
                  className='btn btn-light btn-lg px-4 py-2'
                  type='button'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className='card p-4 mb-4'>
            <h2 className='page-title'>Account Information</h2>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <div className='card h-100 p-3'>
                  <h5 className='card-title'>Account Status</h5>
                  <p className='card-text'>Active</p>
                </div>
              </div>
              <div className='col-md-6 mb-3'>
                <div className='card h-100 p-3'>
                  <h5 className='card-title'>Member Since</h5>
                  <p className='card-text'>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile
