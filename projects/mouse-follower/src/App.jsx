import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(()=>{
    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log({clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }

    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }

    //Limpiar la suscripcion al evento anterior
    //Se ejecuta cuando el componente se desmonta o cuando cambian las dependencias del Hook
    return () => {
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  },[enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
       <button onClick={()=> setEnabled(!enabled)}>{enabled ? 'Desactivar Seguimiento' : 'Activar Seguimiento'}</button>
    </>
  )
}


function App() {

  const [mounted, setMounted] = useState(true)

  return (
    <main>
      <h1>Mouse Follower 🐭</h1>
      {mounted && <FollowMouse/>}<br/>
      <button onClick={()=> setMounted(!mounted)}> Toogle button to View FollowMouse Component</button>
    </main>
  )
}

export default App
