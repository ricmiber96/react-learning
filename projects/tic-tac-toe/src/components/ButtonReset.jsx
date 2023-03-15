
import {React, useState} from 'react'
 
 
export default function ButtonReset ({resetGame}){
 
    return (
        <button onClick={resetGame}>Reset Game</button>
    )
}