import { useContext } from 'react'
import { CartContext } from '../context/cart'

export function useCart () {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext)
  if (cart === undefined) {
    throw new Error('useCart must be used with a Provider')
  }

  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }

  return { cart, addToCart, removeFromCart, clearCart, checkProductInCart }
}
