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
  // const [cart, setCart] = useState([])
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  // const addToCart = product => {
  //   // Comprobar si el producto esta en el carrito
  //   const isProductInCart = cart.some(item => item.id === product.id)
  //   console.log(isProductInCart)

  //   // Si el producto esta en el carrito sumamos 1 a la cantidad que tenia
  //   if (isProductInCart) {
  //     const productIndexInCart = cart.findIndex(item => item.id === product.id)
  //     const newCart = structuredClone(cart)
  //     newCart[productIndexInCart].quantity += 1
  //     return setCart(newCart)
  //   } else {
  //     // Si no lo añadimos como un producto nuevo
  //     setCart(prevState => ([
  //       ...prevState,
  //       {
  //         ...product,
  //         quantity: 1
  //       }
  //     ]))
  //   }
  // }

  // const removeFromCart = (product) => {
  //   return setCart(prevState => prevState.filter(item => item.id !== product.id))
  // }
  // const clearCart = () => {
  //   setCart([])
  // }

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
