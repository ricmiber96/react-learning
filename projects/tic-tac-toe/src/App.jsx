import './App.css'
import Board from './components/Board'


// const Square = ({children, isSelected, updateBoard, index}) => {
//   const className = `square ${isSelected ? 'is-selected' : ''}`

//   const handleClick = () => {
//     updateBoard(index)
//   }

//   return (
//     <div onClick={handleClick} className={className}>
//       {children}
//     </div>
//   )
// }



function App() {

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <Board  />
    </main>

  )
}

export default App
