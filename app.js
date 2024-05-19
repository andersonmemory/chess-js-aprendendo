const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8

const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
]

function CreateBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div")
    square.classList.add("square")
    square.innerHTML = startPiece
    square.firstChild?.setAttribute("draggable", true)
    square.setAttribute("square-id", i)
    let row = Math.floor(63 - i + 1)
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "beige" : "brown")
    } else {
      square.classList.add(i % 2 === 0 ? "brown" : brown)
    }
  })
}

CreateBoard()
