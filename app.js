const gameBoard = document.querySelector("#gameboard")
const playerGo = document.querySelector("#playergo")
const warningInfo = document.querySelector("#warninginfo")
const width = 8

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
    square.firstChild?.setAttribute('draggable', true)
  
    square.setAttribute('id', i)
  
    const row = Math.floor(i / 8 + 1)
  
    if (row % 2 == 0) {
      square.classList.add(i % 2 == 0 ? "black-square" : "white-square")
    }
    else {
      square.classList.add(i % 2 == 0? "white-square" : "black-square")
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

allSquares.forEach( square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e) {
  startPositionId = e.target.parentNode?.getAttribute("id")
  draggedElement = e.target
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()

  console.log(draggedElement.firstChild)

  const correctGo = draggedElement.firstChild.classList.contains(current_turn)
  const taken = e.target.classList.contains('piece')
  const valid = checkIfValid(e.target)
  const opponentGo = current_turn === 'white' ? 'black' : 'white'
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

  console.log(valid)
  console.log('CorrectGo:', correctGo)

  if (correctGo) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement)
      e.target.remove()
      checkForWin()
      changePlayer()
      return
    }

    if (taken && !takenByOpponent) {
      warningInfo.textContent = "you cannot go here"
      setTimeout(() => warningInfo.textContent = "", 2000)
      return
    }

    if (valid) {
      e.target.append(draggedElement)
      checkForWin()
      changePlayer()
      return
    }
  }
}

reverseIds()

function changePlayer() {
  if (current_turn === "black") {
    current_turn = "white"
    playerGo.textContent = current_turn
    reverseIds()
  }
  else {
    revertIds()
    current_turn = "black"
    playerGo.textContent = current_turn
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => 
    square.setAttribute('id', (width * width - 1) - i))
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => 
    square.setAttribute('id', i))
}

function checkForWin() {
  const kings = Array.from(document.querySelectorAll('#king'))
  if (!kings.some(king => king.firstChild.classList.contains('white'))) {
    warningInfo.innerHTML = "Black player wins!"
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
  }

  if (!kings.some(king => king.firstChild.classList.contains('black'))) {
    warningInfo.innerHTML = "White player wins!"
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
  }
}


function checkIfValid(target) {
  const targetId = Number(target.getAttribute('id')) || Number(target.parentNode.getAttribute('id'))
  const startId = Number(startPositionId)
  const piece = draggedElement.id

  switch(piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
      if (
        starterRow.includes(startId) && startId + width * 2 === targetId ||
        startId + width * 2 === targetId ||
        startId + width - 1 === targetId && document.querySelector(`[id="${startId + width - 1}"`).firstChild ||
        startId + width + 1 === targetId && document.querySelector(`[id="${startId + width - 1}"`).firstChild
      ) {
        return true
      }
      break;
    case 'knight':
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width - 2 === targetId ||
        startId - width + 2 === targetId
      ) {
        return true
      }
      break;
    case 'bishop':
      if (
        startId + width + 1 === targetId || 
        startId + width * 2 + 2  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild  ||
        startId + width * 3 + 3  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild ||
        startId + width * 4 + 4  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild ||
        startId + width * 5 + 5  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 + 4}"]`).firstChild ||
        startId + width * 6 + 6  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 + 5}"]`).firstChild ||
        startId + width * 7 + 7  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6 + 6}"]`).firstChild ||
        // 
        startId - width - 1 === targetId || 
        startId - width - 2 - 2  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild  ||
        startId - width - 3 - 3  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild ||
        startId - width - 4 - 4  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild ||
        startId - width - 5 - 5  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 - 4}"]`).firstChild ||
        startId - width - 6 - 6  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 - 5}"]`).firstChild ||
        startId - width - 7 - 7  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6 - 6}"]`).firstChild ||
        // 
        startId - width + 1 === targetId || 
        startId - width - 2 + 2  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild  ||
        startId - width - 3 + 3  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild ||
        startId - width - 4 + 4  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild ||
        startId - width - 5 + 5  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 + 4}"]`).firstChild ||
        startId - width - 6 + 6  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 + 5}"]`).firstChild ||
        startId - width - 7 + 7  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6 + 6}"]`).firstChild ||
        // 
        startId + width - 1 === targetId || 
        startId + width - 2 - 2  === targetId && !document.querySelector(`[id="${startId + width - 1}}"`).firstChild  ||
        startId + width - 3 - 3  === targetId && !document.querySelector(`[id="${startId + width - 1}}"`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild ||
        startId + width - 4 - 4  === targetId && !document.querySelector(`[id="${startId + width - 1}}"`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild ||
        startId + width - 5 - 5  === targetId && !document.querySelector(`[id="${startId + width - 1}}"`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 - 4}"]`).firstChild ||
        startId + width - 6 - 6  === targetId && !document.querySelector(`[id="${startId + width - 1}}"`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 - 5}"]`).firstChild ||
        startId + width - 7 - 7  === targetId && !document.querySelector(`[id="${startId + width - 1}}"`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6 - 6}"]`).firstChild
        ) {
          return true
        }
        break;
    case 'rook':
      if (
          startId + width === targetId ||
          startId + width * 2 === targetId && !document.querySelector(`[id="${startId + width}"`).firstChild ||
          startId + width * 3 === targetId && !document.querySelector(`[id="${startId + width}"`).firstChild && !document.querySelector(`[id="${startId + width * 2}"`).firstChild ||
          startId + width * 4 === targetId && !document.querySelector(`[id="${startId + width}"`).firstChild && !document.querySelector(`[id="${startId + width * 2}"`).firstChild && !document.querySelector(`[id="${startId + width * 3}"`).firstChild || 
          startId + width * 5 === targetId && !document.querySelector(`[id="${startId + width}"`).firstChild && !document.querySelector(`[id="${startId + width * 2}"`).firstChild && !document.querySelector(`[id="${startId + width * 3}"`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild || 
          startId + width * 6 === targetId && !document.querySelector(`[id="${startId + width}"`).firstChild && !document.querySelector(`[id="${startId + width * 2}"`).firstChild && !document.querySelector(`[id="${startId + width * 3}"`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild || 
          startId + width * 7 === targetId && !document.querySelector(`[id="${startId + width}"`).firstChild && !document.querySelector(`[id="${startId + width * 2}"`).firstChild && !document.querySelector(`[id="${startId + width * 3}"`).firstChild && !document.querySelector(`[id="${startId + width * 4}]"`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6}"]`).firstChild || 
          // 
          startId - width === targetId ||
          startId - width * 2 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild ||
          startId - width * 3 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild ||
          startId - width * 4 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild || 
          startId - width * 5 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild || 
          startId - width * 6 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild || 
          startId - width * 7 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6}"]`).firstChild || 
          // 
          startId + 1 === targetId ||
          startId + 2 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild ||
          startId + 3 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild ||
          startId + 4 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild || 
          startId + 5 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild || 
          startId + 6 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild || 
          startId + 7 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild && !document.querySelector(`[id="${startId + 6}"]`).firstChild || 
          // 
          startId - 1 === targetId ||
          startId - 2 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild ||
          startId - 3 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild ||
          startId - 4 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild || 
          startId - 5 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild || 
          startId - 6 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild || 
          startId - 7 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild && !document.querySelector(`[id="${startId - 6}"]`).firstChild
          ) {
            return true
          }
          break;
    case 'queen':
        if (
        startId + width + 1 === targetId || 
        startId + width * 2 + 2  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild  ||
        startId + width * 3 + 3  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild ||
        startId + width * 4 + 4  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild ||
        startId + width * 5 + 5  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 + 4}"]`).firstChild ||
        startId + width * 6 + 6  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 + 5}"]`).firstChild ||
        startId + width * 7 + 7  === targetId && !document.querySelector(`[id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6 + 6}"]`).firstChild ||
        // 
        startId - width - 1 === targetId || 
        startId - width - 2 - 2  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild  ||
        startId - width - 3 - 3  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild ||
        startId - width - 4 - 4  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild ||
        startId - width - 5 - 5  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 - 4}"]`).firstChild ||
        startId - width - 6 - 6  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 - 5}"]`).firstChild ||
        startId - width - 7 - 7  === targetId && !document.querySelector(`[id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6 - 6}"]`).firstChild ||
        // 
        startId - width + 1 === targetId || 
        startId - width - 2 + 2  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild  ||
        startId - width - 3 + 3  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild ||
        startId - width - 4 + 4  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild ||
        startId - width - 5 + 5  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 + 4}"]`).firstChild ||
        startId - width - 6 + 6  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 + 5}"]`).firstChild ||
        startId - width - 7 + 7  === targetId && !document.querySelector(`[id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6 + 6}"]`).firstChild ||
        // 
        startId + width - 1 === targetId || 
        startId + width - 2 - 2  === targetId && !document.querySelector(`[id="${startId + width - 1}"]`).firstChild  ||
        startId + width - 3 - 3  === targetId && !document.querySelector(`[id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild ||
        startId + width - 4 - 4  === targetId && !document.querySelector(`[id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild ||
        startId + width - 5 - 5  === targetId && !document.querySelector(`[id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 - 4}"]`).firstChild ||
        startId + width - 6 - 6  === targetId && !document.querySelector(`[id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 - 5}"]`).firstChild ||
        startId + width - 7 - 7  === targetId && !document.querySelector(`[id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6 - 6}"]`).firstChild ||
        //
        startId + width === targetId ||
        startId + width * 2 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild ||
        startId + width * 3 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild ||
        startId + width * 4 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild || 
        startId + width * 5 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild || 
        startId + width * 6 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild || 
        startId + width * 7 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6}"]`).firstChild || 
        // 
        startId - width === targetId ||
        startId - width * 2 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild ||
        startId - width * 3 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild ||
        startId - width * 4 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild || 
        startId - width * 5 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild || 
        startId - width * 6 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild || 
        startId - width * 7 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6}"]`).firstChild || 
        // 
        startId + 1 === targetId ||
        startId + 2 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild ||
        startId + 3 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild ||
        startId + 4 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild || 
        startId + 5 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild || 
        startId + 6 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild || 
        startId + 7 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild && !document.querySelector(`[id="${startId + 6}"]`).firstChild || 
        // 
        startId - 1 === targetId ||
        startId - 2 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild ||
        startId - 3 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild ||
        startId - 4 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild || 
        startId - 5 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild || 
        startId - 6 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild || 
        startId - 7 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild && !document.querySelector(`[id="${startId - 6}"]`).firstChild
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