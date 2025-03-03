
const bird = document.getElementById("bird");
const gameArea = document.getElementById("gameArea");

let birdBottom = 0;
let isJumping = false;

document.addEventListener("keydown", function(event) {
    if (event.key === " " && !isJumping) {
        isJumping = true;
        jump();
    }
});

function jump() {
    let jumpHeight = 0;
    let jumpInterval = setInterval(function() {
        if (jumpHeight < 100) {
            birdBottom += 5;
            jumpHeight += 5;
            bird.style.bottom = birdBottom + "px";
        } else {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(function() {
                if (jumpHeight > 0) {
                    birdBottom -= 5;
                    jumpHeight -= 5;
                    bird.style.bottom = birdBottom + "px";
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}
// Function to create obstacles
function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    gameArea.appendChild(obstacle);
    
    // Set the obstacle's initial position
    let leftPosition = gameArea.offsetWidth;
    obstacle.style.left = `${leftPosition}px`;

    obstacles.push(obstacle);

    // Remove obstacle when it goes off-screen
    setTimeout(() => {
        obstacle.remove();
        obstacles = obstacles.filter(item => item !== obstacle);
    }, 2000); // Adjust this time to match the speed of the obstacles
}

// Function to move obstacles
function moveObstacles() {
    obstacles.forEach(obstacle => {
        let leftPosition = parseInt(obstacle.style.left);
        leftPosition -= obstacleSpeed;
        obstacle.style.left = `${leftPosition}px`;
    });
}

// Function to start the game and spawn obstacles at random intervals
function startGame() {
    obstacleInterval = setInterval(() => {
        if (gameRunning) {
            createObstacle(); // Spawn obstacle
        }
    }, 1500); // Adjust this to control how often obstacles spawn

    // Move obstacles every frame
    setInterval(moveObstacles, 20);
}

// Function to stop the game
function stopGame() {
    gameRunning = false;
    clearInterval(obstacleInterval);
}

// Collision detection function to stop the game when bird hits an obstacle
function checkCollision() {
    obstacles.forEach(obstacle => {
        let birdRect = bird.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (
            birdRect.left < obstacleRect.right &&
            birdRect.right > obstacleRect.left &&
            birdRect.top < obstacleRect.bottom &&
            birdRect.bottom > obstacleRect.top
        ) {
            stopGame(); // Stop the game if collision detected
            alert("Game Over!");
        }
    });
}

// Check for collisions every frame
setInterval(checkCollision, 20);

// Start the game when the page loads
startGame();
