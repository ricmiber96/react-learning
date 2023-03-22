import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons'
import { useCart } from '../../hooks/useCart'

export default function Products ({ products }) {
  const { addToCart, removeFromCart, checkProductInCart } = useCart()

  return (
    <>
      <main className='products'>
        <ul>
          {products.slice(0, 10).map((product) => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <strong>{product.title}</strong> - ${product.price}
                </div>
                <div>
                  <button style={{ backgroundColor: isProductInCart ? 'red' : '#1f1' }} onClick={() => { isProductInCart ? removeFromCart(product) : addToCart(product) }}>
                    {
                      isProductInCart
                        ? <RemoveFromCartIcon />
                        : <AddToCartIcon />
                    }
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
