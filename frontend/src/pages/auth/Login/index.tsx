import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAuth } from '../../../context/Auth.context'

const Login = () => {
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  type LoginType = {
    email: string
    password: string
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be valid')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const initalValues: LoginType = {
    email: '',
    password: '',
  }

  const onSubmitHandler = async (
    e: LoginType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const data = await loginUser(e.email, e.password)

      if (data.token) {
        localStorage.setItem('token', data.token)
        toast.success('Login Successful')
        navigate('/')
      } else {
        throw new Error(data.error || 'Login failed: No token returned')
      }
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
    <div className='container fade-in'>
      <div className='row justify-content-center'>
        <div className='col-sm-12 col-md-8 col-lg-6 col-xl-5 border rounded-3 shadow p-0'>
          <Formik
            validationSchema={validationSchema}
            initialValues={initalValues}
            onSubmit={onSubmitHandler}
          >
            <Form className='auth-form px-4 py-5 my-5'>
              <div className='text-center mb-4'>
                <h1 className='page-title'>Welcome Back</h1>
                <p className='text-muted'>
                  Sign in to continue to your account
                </p>
              </div>

              <div className='mb-4'>
                <label htmlFor='email' className='form-label'>
                  Email <span className='text-danger'>*</span>
                </label>
                <Field
                  name='email'
                  id='email'
                  type='email'
                  className='form-control form-control-lg'
                  placeholder='john@example.com'
                />
                <ErrorMessage
                  name='email'
                  component={'div'}
                  className='text-danger mt-1 small'
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='password' className='form-label'>
                  Password <span className='text-danger'>*</span>
                </label>
                <Field
                  name='password'
                  id='password'
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='••••••'
                />
                <ErrorMessage
                  name='password'
                  component={'div'}
                  className='text-danger mt-1 small'
                />
              </div>

              <div className='d-grid mb-4'>
                <button type='submit' className='btn btn-primary btn-lg'>
                  Login
                </button>
              </div>

              <div className='text-center'>
                <p className='text-muted'>
                  Don't have an account?{' '}
                  <Link to={'/auth/register'} className='text-primary'>
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
