import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useTask } from '../../../context/Task.context'

const AddTask = () => {
  const { addTask } = useTask()

  type AddTask = {
    title: string
    desc: string
  }

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    desc: yup.string().required('Description is required'),
  })

  const initalValues: AddTask = {
    desc: '',
    title: '',
  }

  const onSubmitHandler = async (
    e: AddTask,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await addTask(e.title, e.desc)
      toast.success('Task added successfully')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    }
    resetForm()
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initalValues}
      onSubmit={onSubmitHandler}
    >
      <Form>
        <h2 className='page-title'>Add New Task</h2>

        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title <span className='text-danger'>*</span>
          </label>
          <Field
            name='title'
            id='title'
            type='text'
            className='form-control'
            placeholder='What needs to be done?'
          />
          <ErrorMessage
            name='title'
            component={'div'}
            className='text-danger mt-1 small'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='desc' className='form-label'>
            Description <span className='text-danger'>*</span>
          </label>
          <Field
            as='textarea'
            rows='5'
            className='form-control'
            name='desc'
            id='desc'
            placeholder='Add details about this task...'
          />
          <ErrorMessage
            name='desc'
            component={'div'}
            className='text-danger mt-1 small'
          />
        </div>

        <div className='d-grid'>
          <button type='submit' className='btn btn-primary'>
            Add Task
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default AddTask
