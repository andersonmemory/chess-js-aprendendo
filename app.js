const gameBoard = document.querySelector("#gameboard")
const playerInfo = document.querySelector("#playerinfo")
const width = 8
let playerGo = 'black'
playerInfo.textContent = 'black'


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
    square.setAttribute('id', i)
    square.innerHTML = piece;
    square.firstChild?.setAttribute('draggable', true)

    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black-piece")
    }

    if (i >= 48) {
      square.firstChild.firstChild.classList.add("white-piece")
    }

    const row = Math.floor( ((63 - i) / 8) + 1)

    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0? 'white-square' : 'black-square')
    } else {
      square.classList.add(i % 2 === 0? 'black-square' : 'white-square')
    }
    gameBoard.append(square)
  })
}

createBoard()

const allSquares = document.querySelectorAll(" .square")

allSquares.forEach( square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute('id')
  draggedElement = e.target
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()
  console.log(e.target)
  const taken = e.target.classList.contains('piece')

  // e.target.parentNode.append(draggedElement)
  // e.target.remove()
  changePlayer()
}

function changePlayer() {
  if (playerGo === "black") {
    reverseIds()
    playerGo = "white"
    playerInfo.textContent = 'white'
  } else {
    revertIds()
    playerGo = "black"
    playerInfo.textContent = 'black'
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => {
    square.setAttribute('id', (width * width - 1) - i)
  })
}

function revertIds() {
  const AllSQuares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => square.setAttribute('id', i))
}