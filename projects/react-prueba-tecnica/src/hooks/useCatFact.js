import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'
import { CAT_ENDPOINT_RANDOM_FACT } from '../utils/constants'

export default function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }
  useEffect(() => {
    refreshFact()
  }, [])

  return { fact, refreshFact }
}
