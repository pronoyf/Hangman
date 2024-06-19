// List of words to guess
const wordList = ["javascript", "python", "java", "ruby", "swift", "kotlin", "html", "css", "react", "angular"];

// DOM elements
const wordElement = document.getElementById('wordDisplay');
const wrongLettersElement = document.getElementById('wrongLetters');
const playAgainButton = document.getElementById('playButton');
const popupElement = document.getElementById('popup-container');
const notificationElement = document.getElementById('notification-container');
const messageElement = document.getElementById('finalMessage');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let currentWord = '';
let correctGuesses = [];
let incorrectGuesses = [];

// Initialize the game
function initializeGame() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    correctGuesses = [];
    incorrectGuesses = [];
    renderWord();
    updateIncorrectGuesses();
    popupElement.style.display = 'none';
    renderHangman();
}

// Render the word with guessed letters
function renderWord() {
    wordElement.innerHTML = currentWord.split('').map(letter =>
        `<span class="letter">${correctGuesses.includes(letter) ? letter : '_ '}</span>`
    ).join('');

    const guessedWord = wordElement.innerText.replace(/\n/g, '');
    if (guessedWord === currentWord) {
        messageElement.innerText = 'Congratulations! You won!';
        popupElement.style.display = 'flex';
    }
}

// Update the display of incorrect guesses
function updateIncorrectGuesses() {
    wrongLettersElement.innerHTML = incorrectGuesses.length > 0 ? '<p>Wrong</p>' : '';
    wrongLettersElement.innerHTML += incorrectGuesses.map(letter => `<span>${letter}</span>`).join('');
    renderHangman();

    if (incorrectGuesses.length === 10) {
        messageElement.innerText = `Unfortunately, you lost. The word was ${currentWord}.`;
        popupElement.style.display = 'flex';
    }
}

// Show notification for duplicate guesses
function showNotification() {
    notificationElement.classList.add('show');
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 2000);
}

// Render the hangman based on incorrect guesses
function renderHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';

    const hangmanParts = [
        () => { ctx.beginPath(); ctx.moveTo(10, 190); ctx.lineTo(190, 190); ctx.stroke(); }, // Base
        () => { ctx.beginPath(); ctx.moveTo(30, 190); ctx.lineTo(30, 20); ctx.stroke(); }, // Left pillar
        () => { ctx.beginPath(); ctx.moveTo(30, 20); ctx.lineTo(120, 20); ctx.stroke(); }, // Top beam
        () => { ctx.beginPath(); ctx.moveTo(120, 20); ctx.lineTo(120, 50); ctx.stroke(); }, // Rope
        () => { ctx.beginPath(); ctx.arc(120, 70, 20, 0, Math.PI * 2, true); ctx.stroke(); }, // Head
        () => { ctx.beginPath(); ctx.moveTo(120, 90); ctx.lineTo(120, 140); ctx.stroke(); }, // Body
        () => { ctx.beginPath(); ctx.moveTo(120, 100); ctx.lineTo(100, 120); ctx.stroke(); }, // Left arm
        () => { ctx.beginPath(); ctx.moveTo(120, 100); ctx.lineTo(140, 120); ctx.stroke(); }, // Right arm
        () => { ctx.beginPath(); ctx.moveTo(120, 140); ctx.lineTo(100, 170); ctx.stroke(); }, // Left leg
        () => { ctx.beginPath(); ctx.moveTo(120, 140); ctx.lineTo(140, 170); ctx.stroke(); }  // Right leg
    ];

    for (let i = 0; i < incorrectGuesses.length; i++) {
        hangmanParts[i]();
    }
}

// Handle keydown events for letter guesses
window.addEventListener('keydown', event => {
    if (popupElement.style.display === 'flex') return;

    if (event.key >= 'a' && event.key <= 'z') {
        const guessedLetter = event.key;
        if (currentWord.includes(guessedLetter)) {
            if (!correctGuesses.includes(guessedLetter)) {
                correctGuesses.push(guessedLetter);
                renderWord();
            } else {
                showNotification();
            }
        } else {
            if (!incorrectGuesses.includes(guessedLetter)) {
                incorrectGuesses.push(guessedLetter);
                updateIncorrectGuesses();
            } else {
                showNotification();
            }
        }
    }
});

// Start a new game on play again button click
playAgainButton.addEventListener('click', initializeGame);

// Start the game when the page loads
initializeGame();
