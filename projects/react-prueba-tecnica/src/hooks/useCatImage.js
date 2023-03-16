import { useEffect, useState } from 'react'
import { CAT_PREFIX_IMAGE_URL } from '../utils/constants'

export default function useCatImage ({ fact }) {
  const [imgUrl, setImgUrl] = useState()

  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ').slice(0, 3).join('')
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImgUrl(url)
      })
  }, [fact])

  return { imgUrl: `${CAT_PREFIX_IMAGE_URL}${imgUrl}` }
}
