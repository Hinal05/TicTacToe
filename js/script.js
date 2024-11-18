const board = document.getElementById('board');
const resultText = document.getElementById('resultText');
const resultModal = document.getElementById('resultModal');
const modalOverlay = document.getElementById('modalOverlay');
let currentPlayer = 'X';
let moves = 0;
const playerNames = {
    X: document.getElementById('p1-name').textContent,
    O: document.getElementById('p2-name').textContent
};

// Winning combinations
const winningCombinations = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]
];

const checkWinner = (squares) =>
    winningCombinations.find(([a, b, c]) =>
        squares[a].textContent &&
        squares[a].textContent === squares[b].textContent &&
        squares[a].textContent === squares[c].textContent
    )?.[0] ?? null;

const showResult = (message) => {
    resultText.textContent = message;
    resultModal.style.display = 'block';
    modalOverlay.style.display = 'block';
};

const handleClick = (event) => {
    const square = event.target;
    const squares = Array.from(document.getElementsByClassName('square'));

    // Mark the square
    if (!square.classList.contains('taken')) {
        square.textContent = currentPlayer;
        square.classList.add('taken');
        moves++;

        // Check for a winner
        const winner = checkWinner(squares);
        if (winner) {
            showResult(`${playerNames[squares[winner].textContent]} wins! 🎉`);
            disableBoard();
            return;
        }

        // Check for a draw
        if (moves === 9) {
            showResult("It's a draw! 🤝");
            disableBoard();
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const disableBoard = () => {
    Array.from(document.getElementsByClassName('square')).forEach(square => {
        square.classList.add('taken');
    });
};

const restartGame = () => {
    const resetSquare = (square) => {
        square.textContent = '';
        square.classList.remove('taken');
    };

    Array.from(document.getElementsByClassName('square')).forEach(resetSquare);
    currentPlayer = 'X';
    moves = 0;
    resultModal.style.display = 'none';
    modalOverlay.style.display = 'none';
};

// Add event listeners to all squares
Array.from(document.getElementsByClassName('square')).forEach(square => {
    square.addEventListener('click', handleClick);
});
