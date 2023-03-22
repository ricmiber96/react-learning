import { React, useId, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { CartIcon, ClearCartIcon } from '../Icons/Icons'
import './Cart.css'

export default function Cart () {
  const cartCheckBoxId = useId()
  const { cart, totalPay, addToCart, clearCart } = useCart()

  const CartItem = ({ thumbnail, price, title, quantity, addToCart }) => {
    return (
      <li>
        <img src={thumbnail} alt={title} />
        <div>
          <strong>{title}</strong> - ${price}
        </div>
        <footer>
          <small>Quantity: {quantity}</small>
          <button onClick={addToCart}>Add</button>
        </footer>
      </li>
    )
  }
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckBoxId}>
        <CartIcon />
      </label>
      <input id={cartCheckBoxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          {cart.map((product, index) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)} {...product}
            />
          ))}
        </ul>
        <h4>Total Pay: ${totalPay}</h4>
        <button onClick={() => clearCart()}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
