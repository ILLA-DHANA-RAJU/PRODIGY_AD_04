const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('status-message');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

// Handle each player's move
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (isGameActive && board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      statusMessage.textContent = `${currentPlayer} wins!`;
      isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
      statusMessage.textContent = "It's a draw!";
      isGameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusMessage.textContent = `${currentPlayer}'s turn`;
    }
  }
}

// Check if current player has won
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

// Restart game
restartBtn.addEventListener('click', restartGame);

function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  statusMessage.textContent = `${currentPlayer}'s turn`;
  
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });
}
