
import { React, useState, useEffect } from 'react'
import useCatFact from './hooks/useCatFact'
import useCatImage from './hooks/useCatImage'

export default function App () {
  const { fact, refreshFact } = useCatFact()
  const { imgUrl } = useCatImage({ fact })

  const handleClick = () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Cat App 😻</h1>
      <button onClick={handleClick}>Get New Fact</button>
      {fact &&
        <p>{`❝ ${fact} ❞`}</p>}
      {imgUrl &&
        <img src={imgUrl} alt='Image extracted using the first three words' />}
    </main>
  )
}
