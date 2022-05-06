const playerShip = document.querySelector('.shooter');
const playArea = document.querySelector('.game-area');
const aliensImg = [
    'img/monster-1.png',
    'img/monster-2.png',
    'img/monster-3.png',
];

window.addEventListener('keydown', flyShip)

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

    moveAlien();
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
