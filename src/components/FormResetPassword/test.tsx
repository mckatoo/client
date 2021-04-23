import 'server.mock'

import { signIn } from 'next-auth/client'
import { render, screen, waitFor } from 'utils/test-utils'

import userEvent from '@testing-library/user-event'

import FormResetPassword from './'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({
  query
}))

jest.mock('next-auth/client', () => ({
  signIn: jest.fn()
}))

describe('<FormResetPassword />', () => {
  it('should render the form', () => {
    render(<FormResetPassword />)
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /reset password/i })
    ).toBeInTheDocument()
  })

  it('should validate errors', async () => {
    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), 'anypassword')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      'passwordany'
    )

    userEvent.click(screen.getByRole('button', { name: /reset password/i }))

    expect(
      await screen.findByText(/confirm password does not match with password/i)
    ).toBeInTheDocument()
  })

  it('should show error when code provided is wrong', async () => {
    query = { code: 'wrong_code' }

    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), 'anypassword')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      'anypassword'
    )

    userEvent.click(screen.getByRole('button', { name: /reset password/i }))

    expect(
      await screen.findByText(/incorrect code provided/i)
    ).toBeInTheDocument()
  })

  it('should reset the password and sign in the user', async () => {
    query = { code: 'right_code' }

    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), 'anypassword')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      'anypassword'
    )

    userEvent.click(screen.getByRole('button', { name: /reset password/i }))

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'valid@email.com',
        password: 'anypassword',
        callbackUrl: '/'
      })
    })
  })
})
