import { MdOutlineDone } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { type Task, useTask } from '../../../context/Task.context'

const AllTask = () => {
  const { tasks, deleteTaskById, editTaskById } = useTask()

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='page-title mb-0'>All Tasks</h2>
        <span className='badge bg-primary rounded-pill fs-6'>
          {tasks.length}
        </span>
      </div>

      {tasks && tasks.length > 0 ? (
        <div className='row g-3'>
          {tasks.map((task: Task, i) => (
            <div key={i} className='col-md-6 col-lg-6 col-xl-4'>
              <div
                className={`card task-card h-100 p-3 ${
                  task.isComplete ? 'completed' : ''
                }`}
              >
                <div className='card-body p-0'>
                  <h3
                    className={`h5 mb-3 ${
                      task.isComplete
                        ? 'text-decoration-line-through text-muted'
                        : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className={`mb-4 ${task.isComplete ? 'text-muted' : ''}`}>
                    {task.description}
                  </p>
                </div>
                <div className='card-footer bg-transparent border-0 p-0 pt-2 d-flex justify-content-between align-items-center'>
                  <span
                    className={`badge ${
                      task.isComplete ? 'bg-success' : 'bg-warning'
                    }`}
                  >
                    {task.isComplete ? 'Completed' : 'Pending'}
                  </span>
                  <div className='d-flex task-actions gap-2'>
                    <button
                      onClick={() => deleteTaskById(task._id)}
                      title='Delete'
                      className='btn btn-outline-danger btn-icon'
                    >
                      <RxCross2 />
                    </button>
                    {!task.isComplete && (
                      <button
                        onClick={() => editTaskById(task._id)}
                        title='Mark as Complete'
                        className='btn btn-outline-success btn-icon'
                      >
                        <MdOutlineDone />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-5'>
          <div className='mb-3'>
            <svg
              width='64'
              height='64'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-muted'
            >
              <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
              <polyline points='14 2 14 8 20 8'></polyline>
              <line x1='16' y1='13' x2='8' y2='13'></line>
              <line x1='16' y1='17' x2='8' y2='17'></line>
              <polyline points='10 9 9 9 8 9'></polyline>
            </svg>
          </div>
          <h3 className='h4 mb-2'>No Tasks Available</h3>
          <p className='text-muted'>Add your first task to get started</p>
        </div>
      )}
    </>
  )
}

export default AllTask
