import 'session.mock'

import { WishlistContextDefaultValues } from 'hooks/use-wishlist'
// import { act } from 'react-dom/test-utils'
import { render, screen, act, waitFor } from 'utils/test-utils'

import userEvent from '@testing-library/user-event'

import WishlistButton from './'

describe('WishlistButton', () => {
  it('should render button to add and call method if clicked', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false,
      addToWishlist: jest.fn()
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    const button = screen.getByLabelText(/add to wishlist/i)
    expect(button).toBeInTheDocument()

    act(() => {
      userEvent.click(button)
    })
    waitFor(() => {
      expect(wishlistProviderProps.addToWishlist).toHaveBeenCalledWith('1')
    })
  })

  it('should render button with text to add and call method if clicked', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false,
      addToWishlist: jest.fn()
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    const button = screen.getByText(/add to wishlist/i)
    expect(button).toBeInTheDocument()

    act(() => {
      userEvent.click(button)
    })
    waitFor(() => {
      expect(wishlistProviderProps.addToWishlist).toHaveBeenCalledWith('1')
    })
  })

  it('should render button to remove and call method if clicked', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true,
      removeFromWishlist: jest.fn()
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    const button = screen.getByLabelText(/remove from wishlist/i)
    expect(button).toBeInTheDocument()

    act(() => {
      userEvent.click(button)
    })
    waitFor(() => {
      expect(wishlistProviderProps.removeFromWishlist).toHaveBeenCalledWith('1')
    })
  })

  it('should render button with text to remove and call method if clicked', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true,
      removeFromWishlist: jest.fn()
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    const button = screen.getByText(/remove from wishlist/i)
    expect(button).toBeInTheDocument()

    act(() => {
      userEvent.click(button)
    })
    waitFor(() => {
      expect(wishlistProviderProps.removeFromWishlist).toHaveBeenCalledWith('1')
    })
  })

  it('should not render if not logged', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
    useSession.mockImplementationOnce(() => [null])
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false,
      addToWishlist: jest.fn()
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.queryByLabelText(/add to wishlist/i)).not.toBeInTheDocument()
  })
})
