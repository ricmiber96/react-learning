

import confetti from 'canvas-confetti'
import {React, useEffect, useState} from 'react'
import { checkEndGame, checkWinnerFrom } from '../utils/board'
import { TURNS } from '../utils/constants'
import { resetGameStorage, saveGameToStorage } from '../utils/gameStorage'
import ButtonReset from './ButtonReset'
import Square from './Square'
import WinnerModal from './WinnerModal'
 

export default function Board (){
 
    const [board, setBoard] = useState(()=> {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?  turnFromStorage : TURNS.X
    })
    //null no hay ganador, false es que hay un empate
    const [winner, setWinner] = useState(null)

    
    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        resetGameStorage()
    }

    const updateBoard = (index) => {
      if(board[index] || winner) return
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      const newWinner = checkWinnerFrom(newBoard)
      if(newWinner){
        confetti()
        setWinner(newWinner)
      } else if(checkEndGame(newBoard)) {
        setWinner(false)
      }
    }

    useEffect(()=>{
      //Save game
      saveGameToStorage({
        board: newBoard,
        turn: newTurn
      })
    },[turn, board])

    return (
        <>
            <ButtonReset resetGame={resetGame}/>
            <div className='game'>
            {
                board.map((square,i)=>{
                return (
                    <Square key={i} index={i} updateBoard={updateBoard} board={board}>
                    {square}
                    </Square>
                )
            })}
            </div>
            <section className='turn'>
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS. O}</Square>
            </section>
            <section>
            <WinnerModal resetGame={resetGame} winner={winner}/>
            </section>
      </>
    )
}