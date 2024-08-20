const gameBoard = document.querySelector("#gameboard")
const playerGo = document.querySelector("#playergo")
const warningInfo = document.querySelector("#warninginfo")

let current_turn = "white"
playerGo.textContent = current_turn

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
  board.forEach( (piece, i ) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = piece
  
    square.setAttribute('id', i)
  
    const row = Math.floor(i / 8 + 1)
  
    if (row % 2 == 0) {
      square.classList.add(i % 2 == 0 ? "black-square" : "white-square")
    }
    else {
      square.classList.add(i % 2 == 0? "white-square" : "black-square")
    }
  
    if (i <= 15) {
      square.firstChild.classList.add('black')
    }
  
    if (i >= 48) {
      square.firstChild.classList.add('white')
    }
  
    gameBoard.append(square)
  })
}

createBoard()

