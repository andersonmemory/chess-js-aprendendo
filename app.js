const gameBoard = document.querySelector("#gameboard")
const playerInfo = document.querySelector("#playerinfo")
const infoDisplay = document.querySelector("#infodisplay")

playerInfo.textContent = "white"


const board = [
  rook, knight, bishop, king, queen, bishop, knight, rook,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rook, knight, bishop, king, queen, bishop, knight, rook

]

function createBoard() {
  board.forEach((piece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = piece
    square.setAttribute('square-id', i)
    gameBoard.append(square)

    square.firstChild?.setAttribute('draggable', true)

    if (i <= 15) {
      square.firstChild.classList.add('black-piece')
    }

    if (i >= 48) {
      square.firstChild.classList.add('white-piece')
    }
  
    const row = Math.floor((63 - i) / 8 + 1)
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "white-square" : "black-square")
    } else {
      square.classList.add(i % 2 === 0 ? "black-square" : "white-square")
    }
    
  })
}

createBoard()

const allSquares = document.querySelectorAll(".square")


allSquares.forEach(square => {
  square.addEventListener('dragstart', DragStart)
  square.addEventListener('dragover', DragOver)
  square.addEventListener('drop', DragDrop)
})

let startTargetId
let startTargetInfo

function DragStart(e) {
  startTargetId = e.target.parentNode
  startTargetInfo = e.target
}

function DragOver(e) {
  e.preventDefault()
}

let endTargetId
let endtargetInfo

function DragDrop(e) {
  e.stopPropagation()

  if (e.target.classList.contains('piece')) {
    e.target.append(startTargetInfo)
    e.target.firstChild.remove()
  } else {
    e.target.append(startTargetInfo)
  }

  changePlayer()
}

function changePlayer() {

}
