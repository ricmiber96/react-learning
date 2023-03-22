import { useContext, useState } from 'react'
import Cart from './components/Cart/Cart'
import Filters from './components/Filters/Filters'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Products from './components/Products/Products'
import { CartProvider } from './context/cart'
import { FiltersContext } from './context/filters'
import { useFilters } from './hooks/useFilters'
import { products as initialProducts } from './mocks/products.json'

function App () {
  const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filterProducts(products)} />
      <Footer />
    </CartProvider>
  )
}

export default App
