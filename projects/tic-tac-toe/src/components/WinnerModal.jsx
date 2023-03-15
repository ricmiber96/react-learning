
import { React } from 'react'
import Square from './Square'
 
 
export default function WinnerModal ({winner, resetGame}){
    if (winner === null) return null 
    const winnerText = winner === false ? 'Empate' : 'Gano'
    return (
        <section className='winner'>
          <div className='text'>
            <h2>{winnerText}</h2>
            <header className='win'>
              {winner !== false ? 
               <Square>{winner}</Square> :
               <Square>*</Square>
            }
            </header>
            <footer>
              <button onClick={resetGame}>Reset GAME</button>
            </footer>
          </div>
        </section>
    )
}