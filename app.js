const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'


const startPieces = [
  rook, knight, bishop, queen, king, knight, bishop, rook,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rook, knight, bishop, queen, king, knight, bishop, rook
]

function createBoard() {
  startPieces.forEach((startPieces, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPieces
    square.setAttribute('square-id', i)
    square.firstChild?.setAttribute('draggable', true)
    // square.classList.add('beige')

    const row = Math.floor( (63 - i) / 8 ) + 1
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0? "beige" : "brown")
    } else {
      square.classList.add(i % 2 === 0? "brown" : "beige")
    }

    if (i <= 15) {
      square.firstChild.firstChild.classList.add('black')
    }

    if (i >= 48) {
      square.firstChild.firstChild.classList.add('white')
    }
    gameBoard.append(square)
  })
}


createBoard()

const allSquares = document.querySelectorAll("#gameboard .square")
console.log(allSquares)

allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop',  dragDrop)
})

let startPositionId 
let draggedElement

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute('square-id')
  draggedElement = e.target
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()

  console.log('playerGo', playerGo)
  
  console.log('e.target', e.target)
  
  const correctGo = draggedElement.firstChild.classList.contains(playerGo)
  const taken = e.target.classList.contains('piece')
  const valid = checkIfValid(e.target)
  const opponentGo = playerGo === 'white' ? 'black' : 'white'
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

  if (correctGo) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement)
      e.target.remove()
      changePlayer()
      return
    }
    if (taken) {
      infoDisplay.textContent = "you cannot go here!"
      setTimeout(() => infoDisplay.textContent = "", 2000)
      return
    }
    if (valid) {
      e.target.append(draggedElement)
      changePlayer()
      return
    }
  
  }


}

function checkIfValid(target) {
  const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
  const startId = Number(startPositionId)
  const piece = draggedElement.id
  console.log('targetId' , targetId)
  console.log('startId', startId)
  console.log('piece', piece)
  console.log(targetId)

  switch(piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
      if (
        starterRow.includes(startId) && startId + width * 2 === targetId || 
        startId + width === targetId || 
        startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
        startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
      ) {
        return true
      }
      break;
    case 'knight':
      if (
        startId + width * 2 - 1 === targetId ||
        startId + width * 2 + 1 === targetId ||
        startId + width - 2 === targetId || 
        startId + width + 2 === targetId || 
        startId - width * 2 - 1 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width - 2 === targetId || 
        startId - width + 2 === targetId
      ) {
        return true
      }
      break;
    case 'bishop':
      if (
        startId + width + 1 === targetId || 
        startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
        startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
        startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
        startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
        startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
        startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`) ||
        // --
        startId - width - 1 === targetId || 
        startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`) ||
        startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
        startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
        startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
        startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
        startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`) ||
        // --
        startId - width + 1 === targetId || 
        startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`) ||
        startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
        startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
        startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
        startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
        startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`) ||
        // --
        startId + width - 1 === targetId || 
        startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`) ||
        startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
        startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
        startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
        startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
        startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`)
      
      ) {
        return true
      }
      break;
    case 'rook':
      if (
        startId + width === targetId ||
        startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) ||
        startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) ||
        startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) ||
        startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) && !document.querySelector(`[square-id="${startId + width * 4}"]`) ||
        startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) && !document.querySelector(`[square-id="${startId + width * 4}"]`) && !document.querySelector(`[square-id="${startId + width * 5}"]`) ||
        startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) && !document.querySelector(`[square-id="${startId + width * 4}"]`) && !document.querySelector(`[square-id="${startId + width * 5}"]`) && !document.querySelector(`[square-id="${startId + width * 6}"]`) ||
        // --
        startId - width === targetId ||
        startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) ||
        startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) ||
        startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) ||
        startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) && !document.querySelector(`[square-id="${startId - width * 4}"]`) ||
        startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) && !document.querySelector(`[square-id="${startId - width * 4}"]`) && !document.querySelector(`[square-id="${startId - width * 5}"]`) ||
        startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) && !document.querySelector(`[square-id="${startId - width * 4}"]`) && !document.querySelector(`[square-id="${startId - width * 5}"]`) && !document.querySelector(`[square-id="${startId - width * 6}"]`) ||
        // --
        startId + 1 === targetId ||
        startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) ||
        startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) ||
        startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) ||
        startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) && !document.querySelector(`[square-id="${startId + 4}"]`) ||
        startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) && !document.querySelector(`[square-id="${startId + 4}"]`) && !document.querySelector(`[square-id="${startId + 5}"]`) ||
        startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) && !document.querySelector(`[square-id="${startId + 4}"]`) && !document.querySelector(`[square-id="${startId + 5}"]`) && !document.querySelector(`[square-id="${startId + 6}"]`) ||
        // --
        startId - 1 === targetId ||
        startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) ||
        startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) ||
        startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) ||
        startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) && !document.querySelector(`[square-id="${startId - 4}"]`) ||
        startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) && !document.querySelector(`[square-id="${startId - 4}"]`) && !document.querySelector(`[square-id="${startId - 5}"]`) ||
        startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) && !document.querySelector(`[square-id="${startId - 4}"]`) && !document.querySelector(`[square-id="${startId - 5}"]`) && !document.querySelector(`[square-id="${startId - 6}"]`)
      ) {
        return true
      }
      break;
    case 'queen':
      if (
        startId + width + 1 === targetId || 
        startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
        startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
        startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
        startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
        startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
        startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`) ||
        // --
        startId - width - 1 === targetId || 
        startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`) ||
        startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
        startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
        startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
        startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
        startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`) ||
        // --
        startId - width + 1 === targetId || 
        startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`) ||
        startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
        startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
        startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
        startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
        startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`) ||
        // --
        startId + width - 1 === targetId || 
        startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`) ||
        startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
        startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
        startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
        startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
        startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`) ||
        // --
        startId + width === targetId ||
        startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) ||
        startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) ||
        startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) ||
        startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) && !document.querySelector(`[square-id="${startId + width * 4}"]`) ||
        startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) && !document.querySelector(`[square-id="${startId + width * 4}"]`) && !document.querySelector(`[square-id="${startId + width * 5}"]`) ||
        startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`) && !document.querySelector(`[square-id="${startId + width * 2}"]`) && !document.querySelector(`[square-id="${startId + width * 3}"]`) && !document.querySelector(`[square-id="${startId + width * 4}"]`) && !document.querySelector(`[square-id="${startId + width * 5}"]`) && !document.querySelector(`[square-id="${startId + width * 6}"]`) ||
        // --
        startId - width === targetId ||
        startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) ||
        startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) ||
        startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) ||
        startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) && !document.querySelector(`[square-id="${startId - width * 4}"]`) ||
        startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) && !document.querySelector(`[square-id="${startId - width * 4}"]`) && !document.querySelector(`[square-id="${startId - width * 5}"]`) ||
        startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`) && !document.querySelector(`[square-id="${startId - width * 2}"]`) && !document.querySelector(`[square-id="${startId - width * 3}"]`) && !document.querySelector(`[square-id="${startId - width * 4}"]`) && !document.querySelector(`[square-id="${startId - width * 5}"]`) && !document.querySelector(`[square-id="${startId - width * 6}"]`) ||
        // --
        startId + 1 === targetId ||
        startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) ||
        startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) ||
        startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) ||
        startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) && !document.querySelector(`[square-id="${startId + 4}"]`) ||
        startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) && !document.querySelector(`[square-id="${startId + 4}"]`) && !document.querySelector(`[square-id="${startId + 5}"]`) ||
        startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`) && !document.querySelector(`[square-id="${startId + 2}"]`) && !document.querySelector(`[square-id="${startId + 3}"]`) && !document.querySelector(`[square-id="${startId + 4}"]`) && !document.querySelector(`[square-id="${startId + 5}"]`) && !document.querySelector(`[square-id="${startId + 6}"]`) ||
        // --
        startId - 1 === targetId ||
        startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) ||
        startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) ||
        startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) ||
        startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) && !document.querySelector(`[square-id="${startId - 4}"]`) ||
        startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) && !document.querySelector(`[square-id="${startId - 4}"]`) && !document.querySelector(`[square-id="${startId - 5}"]`) ||
        startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`) && !document.querySelector(`[square-id="${startId - 2}"]`) && !document.querySelector(`[square-id="${startId - 3}"]`) && !document.querySelector(`[square-id="${startId - 4}"]`) && !document.querySelector(`[square-id="${startId - 5}"]`) && !document.querySelector(`[square-id="${startId - 6}"]`)
      ) {
        return true
      }
      break;
    case 'king':
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width - 1 === targetId ||
        startId + width + 1 === targetId ||
        startId - width - 1 === targetId ||
        startId - width + 1 === targetId
      ) {
        return true
      }
  }
}

function changePlayer() {
  if (playerGo === "black") {
    revertIds()
    playerGo = "white"
    playerDisplay.textContent = 'white'

  } else {
    reverseIds()
    playerGo = "black";
    playerDisplay.textContent = 'black'
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square") 
  allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}

function checkForWin() {
  const kings = Array.from(document.querySelectorAll('#king'))
  console.log(kings)
  if (!kings.some(king => king.firstChild.classList.contains('white')))  {
    infoDisplay.innetHTML = "Black player wins!"
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
  }
  if (!kings.some(king => king.firstChild.classList.contains('black')))  {
    infoDisplay.innetHTML = "White player wins!"
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
  }
}