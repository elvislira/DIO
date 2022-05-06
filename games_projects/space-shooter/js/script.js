const playerShip = document.querySelector('.shooter');
const playArea = document.querySelector('.game-area');

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
