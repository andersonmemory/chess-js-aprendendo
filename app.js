const gameBoard = document.querySelector("#gameBoard")
const playerDisplay = document.querySelector("#player")

const board = [
  rook, knight, bishop, queen, king, bishop, knight, rook,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard() {
  board.forEach((piece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('id:', i)

    const row = Math.floor(((63 - i) / 8) - 1)
    if (row % 2 === 0)
      {
        
        square.classList.add(i % 2 === 0? 'white-square': 'black-square') 
      }
      else {
        square.setAttribute('row:', row)
        square.classList.add(i % 2 === 0? 'black-square': 'white-square')
      }

    square.innerHTML = piece
    gameBoard.append(square)
  })
  }

createBoard()