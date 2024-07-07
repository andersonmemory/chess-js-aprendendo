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
    square.innerHTML = piece
    gameBoard.append(square)
  })
  }

createBoard()