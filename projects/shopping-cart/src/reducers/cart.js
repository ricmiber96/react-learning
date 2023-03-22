export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  const { type, payload } = action

  const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
  }

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const isProductInCart = state.some(item => item.id === payload.id)
      if (isProductInCart) {
        const productIndexInCart = state.findIndex(item => item.id === payload.id)
        const newState = structuredClone(state)
        newState[productIndexInCart].quantity += 1
        updateLocalStorage(newState)
        return newState
      } else {
        // Si no lo añadimos como un producto nuevo
        const newState = [
          ...state,
          {
            ...payload,
            quantity: 1
          }
        ]
        updateLocalStorage(newState)
        return newState
      }
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = payload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage([])
      return cartInitialState
    }
  }
}
