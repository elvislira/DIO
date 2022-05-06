const playerShip = document.querySelector('.shooter');
const playArea = document.querySelector('.game-area');
const aliensImg = [
    'img/monster-1.png',
    'img/monster-2.png',
    'img/monster-3.png',
];

const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');

let alienInterval;

function flyShip(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (event.key === ' ') {
        event.preventDefault();
        fireLaser();
    }
}

function moveUp() {
    let topPosition = parseInt(getComputedStyle(playerShip).getPropertyValue('top'));

    if (topPosition < 20) {
        return;
    } else {
        let position = topPosition;
        position -= 50;
        playerShip.style.top = `${position}px`;
    }
}

function moveDown() {
    let topPosition = parseInt(getComputedStyle(playerShip).getPropertyValue('top'));

    if (topPosition >= 530) {
        return;
    } else {
        let position = topPosition;
        position += 50;
        playerShip.style.top = `${position}px`;
    }
}

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');

    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition-10}px`;

    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {
            if (checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        });

        if (xPosition === 420) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

function createAliens() {
    let newAlien = document.createElement('img');
    let nAlien = Math.floor(Math.random() * aliensImg.length);
    let alienSprite = aliensImg[nAlien];
    let alienY = Math.floor(Math.random() * 330) + 30;

    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${alienY}px`;
    playArea.appendChild(newAlien);

    moveAlien(newAlien);
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));

        if (xPosition <= 50) {
            if (Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30); 
}

function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;

    if (laserLeft != 420 && laserLeft + 40 >= alienLeft) {
        if (laserTop != alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        } 
    } else {
        return false;
    }
}

startButton.addEventListener('click', (event) => {
    playGame();
});

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';

    window.addEventListener('keydown', flyShip);

    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);

    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => {
        alien.remove();
    });

    let lasers = document.querySelectorAll('.laser');
    aliens.forEach((laser) => {
        laser.remove();
    });

    setTimeout(() => {
        alert('Game Over!');
        playerShip.style.top = '250px';
        startButton.style.display = 'block';
        instructionsText.style.display = 'block';
    });
}
