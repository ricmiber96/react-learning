import { useState, React, useId } from 'react'
import { useFilters } from '../../hooks/useFilters'
import './Filters.css'

export default function Filters () {
  const { filters, setFilters } = useFilters()
  // hook useID para genera ids unicos para los elementos que tenemos en el DOM
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (ev) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: ev.target.value
    }))
  }

  const handleChangeCategory = (ev) => {
    setFilters(prevState => ({
      ...prevState,
      category: ev.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Min. Price </label>
        <input
          type='range' id={minPriceFilterId} name='price' min='0' max='1000'
          onChange={handleChangeMinPrice}
        />
        <span> $ {filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category </label>
        <select id='category' name={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>
    </section>
  )
}
