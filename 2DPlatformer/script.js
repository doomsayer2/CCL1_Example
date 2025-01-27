// Import modules
import { GameObject } from './modules/GameObject.js';
import { Player } from './modules/Player.js';
import { Platform } from './modules/Platform.js';

// Select the canvas, button, and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Load the player sprite
const playerSprite = new Image();
playerSprite.src = './Green-Cap-Character-16x18.png';

// Initialize variables for the game
let player = null;
let platforms = null;
let gameRunning = false;
let animationFrameId = null;

// Set up the game objects
function setupGame() {
    player = new Player(100, 100, playerSprite, ctx);
    platforms = [
        new Platform(100, 500, 200, 20, 'black', ctx),
        new Platform(400, 400, 200, 20, 'black', ctx),
        new Platform(200, 300, 200, 20, 'black', ctx),
        new Platform(500, 200, 200, 20, 'black', ctx),
        new Platform(300, 100, 200, 20, 'gold', ctx),
    ];
}

// Display a message on the canvas
function displayMessage(message) {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    gameRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw message
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(message, canvas.width/2, canvas.height/2);
    
    startButton.style.display = 'block';
}

// Game loop functions
function updateGameObjects() {
    if (!gameRunning) return;
    
    player.update(platforms);

    // Game Over: Check if the player fell below the canvas
    if (player.y > canvas.height) {
        displayMessage('Game Over! You fell!');
        return;
    }

    // Win Condition: Check if the player is standing on the golden platform
    const goldenPlatform = platforms[platforms.length - 1];
    if (
        player.x < goldenPlatform.x + goldenPlatform.width &&
        player.x + player.width > goldenPlatform.x &&
        Math.abs(player.y + player.height - goldenPlatform.y) <= 2 &&
        player.dy === 0
    ) {
        displayMessage('You Win! You reached the golden platform!');
        return;
    }
}

function renderGameObjects() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platforms.forEach(platform => platform.draw());
    player.draw();
}

function gameLoop() {
    if (!gameRunning) return;
    
    updateGameObjects();
    renderGameObjects();
    
    if (gameRunning) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// Start the game
function startGame() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    setupGame();
    gameRunning = true;
    startButton.style.display = 'none';
    gameLoop();
}

// Handle player input
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;

    if (event.code === 'Space' && player.dy === 0) {
        player.dy = -15;
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Adjust player movement based on key states
setInterval(() => {
    if (!gameRunning) return;
    player.dx = keys['ArrowLeft'] ? -5 : keys['ArrowRight'] ? 5 : 0;
}, 16);

// Attach event listener to the start button
startButton.addEventListener('click', startGame);