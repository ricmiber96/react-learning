export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || {
  items: [],
  totalPay: 0
}

const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  const { type, payload } = action
  console.log('Payload', payload)

  const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
  }

  const products = state.items

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const isProductInCart = products.some(item => item.id === payload.id)
      if (isProductInCart) {
        const productIndexInCart = products.findIndex(item => item.id === payload.id)
        const newState = structuredClone(state)
        console.log(newState)
        newState.items[productIndexInCart].quantity += 1
        newState.totalPay = newState.totalPay + newState.items[productIndexInCart].price
        updateLocalStorage(newState)
        return newState
      } else {
        // Si no lo añadimos como un producto nuevo
        const newItem = { ...payload, quantity: 1 }
        const newState = {
          ...state,
          items: [
            ...state.items, newItem
          ],
          totalPay: state.totalPay + payload.price
        }
        updateLocalStorage(newState)
        return newState
      }
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = payload
      const itemToRemove = state.items.find(item => item.id === id)
      const updateItems = state.items.filter(item => item.id !== id)

      const newState = {
        ...state,
        items: updateItems,
        totalPay: state.totalPay - itemToRemove.price * itemToRemove.quantity
      }
      updateLocalStorage(newState)
      return newState
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage([])
      return cartInitialState
    }
  }
}
