import ProtectedRoute from '../../compoents/ProtectedRoute'
import AddTask from './components/AddTask'
import AllTask from './components/AllTask'

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className='row fade-in'>
        <div className='col-lg-12'>
          <h1 className='page-title mb-4'>Dashboard</h1>
        </div>

        <div className='col-lg-4 mb-4 mb-lg-0'>
          <div className='card p-4 h-100'>
            <AddTask />
          </div>
        </div>

        <div className='col-lg-8'>
          <div className='card p-4'>
            <AllTask />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard
