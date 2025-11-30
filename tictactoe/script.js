const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes('') ? null : 'Draw';
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('disabled');

    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        message.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function initializeGame() {
    board.innerHTML = '';
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

restartBtn.addEventListener('click', initializeGame);

initializeGame();
