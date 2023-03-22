import { createContext, useReducer, useState } from 'react'
import { cartInitialState, cartReducer } from '../reducers/cart'

// Creamos el contexto
export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCart, removeFromCart, clearCart }
}

// Creamos el provider
export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{ cart: state.items, totalPay: state.totalPay, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
