// Import words from countries.js
import { words } from "./countries.js";

// DOM elements
const wordElement = document.getElementById('wordDisplay');
const wrongLettersElement = document.getElementById('wrongLetters');
const playButton = document.getElementById('playButton');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('finalMessage');
const hangmanCanvas = document.getElementById('hangmanCanvas');
const context = hangmanCanvas.getContext('2d');

// Variables
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];

// Function to display the word with correctly guessed letters
function displayWord() {
    const displayWordArray = selectedWord.split('').map(letter =>
        `<span class="letter">${correctLetters.includes(letter) ? letter : '_ '}</span>`
    ).join('');

    wordElement.innerHTML = displayWordArray;

    // Check if all letters in selectedWord have been guessed correctly
    const guessedWord = displayWordArray.replace(/<\/?span[^>]*>/g, ''); // Remove <span> tags
    if (guessedWord === selectedWord) {
        endGame(true); // Player has won
    }
}

// Function to update the wrong letters display and check if the player has lost
function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;

    if (wrongLetters.length === 10) {
        drawHangman();
        endGame(false); // Player has lost
    } else {
        drawHangman();
    }
}

// Function to display a notification message
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Function to draw the hangman based on the number of wrong guesses
function drawHangman() {
    context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    context.lineWidth = 2;
    context.strokeStyle = '#000';

    // Base
    if (wrongLetters.length > 0) {
        context.beginPath();
        context.moveTo(10, 190);
        context.lineTo(190, 190);
        context.stroke();
    }
    // Left pillar
    if (wrongLetters.length > 1) {
        context.beginPath();
        context.moveTo(30, 190);
        context.lineTo(30, 20);
        context.stroke();
    }
    // Top beam
    if (wrongLetters.length > 2) {
        context.beginPath();
        context.moveTo(30, 20);
        context.lineTo(120, 20);
        context.stroke();
    }
    // Rope
    if (wrongLetters.length > 3) {
        context.beginPath();
        context.moveTo(120, 20);
        context.lineTo(120, 50);
        context.stroke();
    }
    // Head
    if (wrongLetters.length > 4) {
        context.beginPath();
        context.arc(120, 70, 20, 0, Math.PI * 2, true);
        context.stroke();
    }
    // Body
    if (wrongLetters.length > 5) {
        context.beginPath();
        context.moveTo(120, 90);
        context.lineTo(120, 140);
        context.stroke();
    }
    // Left arm
    if (wrongLetters.length > 6) {
        context.beginPath();
        context.moveTo(120, 100);
        context.lineTo(100, 120);
        context.stroke();
    }
    // Right arm
    if (wrongLetters.length > 7) {
        context.beginPath();
        context.moveTo(120, 100);
        context.lineTo(140, 120);
        context.stroke();
    }
    // Left leg
    if (wrongLetters.length > 8) {
        context.beginPath();
        context.moveTo(120, 140);
        context.lineTo(100, 170);
        context.stroke();
    }
    // Right leg
    if (wrongLetters.length > 9) {
        context.beginPath();
        context.moveTo(120, 140);
        context.lineTo(140, 170);
        context.stroke();
    }
}

// Function to handle key press events (guesses)
window.addEventListener('keydown', e => {
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

// Function to end the game
function endGame(isWin) {
    if (isWin) {
        finalMessage.innerText = 'Congratulations! You won!';
    } else {
        finalMessage.innerText = `Unfortunately, you lost. The word was: ${selectedWord}`;
    }
    popup.style.display = 'flex';
}

// Function to start a new game
playButton.addEventListener('click', () => {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
});

// Initial display of the word and hangman
displayWord();
drawHangman();
