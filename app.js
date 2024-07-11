const gameBoard = document.querySelector("#gameboard")



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
  
  board.forEach( (piece, i) => { 
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('square-id', i)
    square.innerHTML = piece;

    if (i <= 15) {
      square.firstChild.firstChild.classList.add('black')
    }
    if (i >= 48) {
      square.firstChild.firstChild.classList.add('white')
    }

    const row = Math.floor(((63 - i) / 8))

    if ( row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "white-square" : "black-square")
    }
    else {
      square.classList.add(i % 2 === 0 ? "black-square" : "white-square")
    }

    gameBoard.append(square)
  })
}

createBoard()