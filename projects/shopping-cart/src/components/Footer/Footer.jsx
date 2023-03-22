import { React, useState } from 'react'
import { IS_DEVELOPMENT } from '../../config/config'
import { useCart } from '../../hooks/useCart'
import { useFilters } from '../../hooks/useFilters'
import './Footer.css'

export default function Footer () {
  const { filters } = useFilters()
  const { cart } = useCart()

  return (
    <footer className='footer'>
      <h4>Prueba técnica de React ⚛️ － <span>@midudev</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
      {/* {
        IS_DEVELOPMENT &&
          <>
            <h6>Activate filters: {JSON.stringify(filters)}</h6>
            <h6>Cart: {JSON.stringify(cart)}</h6>
          </>
        } */}
    </footer>
  )
}
