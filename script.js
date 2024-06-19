// Words to guess
const words = ["javascript", "python", "java", "ruby", "swift", "kotlin", "html", "css", "react", "angular"];

// DOM elements
const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const playButton = document.getElementById('playButton');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('finalMessage');
const hangmanCanvas = document.getElementById('hangmanCanvas');
const context = hangmanCanvas.getContext('2d');

// Game variables
let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];

// Initialize game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctLetters = [];
    wrongLetters = [];
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
    drawHangman();
}

// Display the word
function displayWord() {
    wordDisplay.innerHTML = selectedWord.split('').map(letter =>
        `<span class="letter">${correctLetters.includes(letter) ? letter : '_ '}</span>`
    ).join('');

    const innerWord = wordDisplay.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

// Update wrong letters
function updateWrongLetters() {
    wrongLettersDisplay.innerHTML = wrongLetters.length > 0 ? '<p>Wrong</p>' : '';
    wrongLettersDisplay.innerHTML += wrongLetters.map(letter => `<span>${letter}</span>`).join('');
    drawHangman();

    if (wrongLetters.length === 6) {
        finalMessage.innerText = `Unfortunately, you lost. The word was ${selectedWord}.`;
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Draw the hangman
function drawHangman() {
    context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    context.lineWidth = 2;
    context.strokeStyle = '#000';

    // Draw parts based on the number of wrong letters
    const parts = [
        () => { context.beginPath(); context.moveTo(10, 190); context.lineTo(190, 190); context.stroke(); }, // Base
        () => { context.beginPath(); context.moveTo(30, 190); context.lineTo(30, 20); context.stroke(); }, // Left pillar
        () => { context.beginPath(); context.moveTo(30, 20); context.lineTo(120, 20); context.stroke(); }, // Top beam
        () => { context.beginPath(); context.moveTo(120, 20); context.lineTo(120, 50); context.stroke(); }, // Rope
        () => { context.beginPath(); context.arc(120, 70, 20, 0, Math.PI * 2, true); context.stroke(); }, // Head
        () => { context.beginPath(); context.moveTo(120, 90); context.lineTo(120, 140); context.stroke(); }, // Body
        () => { context.beginPath(); context.moveTo(120, 100); context.lineTo(100, 120); context.stroke(); }, // Left arm
        () => { context.beginPath(); context.moveTo(120, 100); context.lineTo(140, 120); context.stroke(); }, // Right arm
        () => { context.beginPath(); context.moveTo(120, 140); context.lineTo(100, 170); context.stroke(); }, // Left leg
        () => { context.beginPath(); context.moveTo(120, 140); context.lineTo(140, 170); context.stroke(); }  // Right leg
    ];

    for (let i = 0; i < wrongLetters.length; i++) {
        parts[i]();
    }
}

// Handle keydown events
window.addEventListener('keydown', e => {
    if (popup.style.display === 'flex') return;

    if (e.key >= 'a' && e.key <= 'z') {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
});

// Play again button
playButton.addEventListener('click', startGame);

// Start the game on page load
startGame();
