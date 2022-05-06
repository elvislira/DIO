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

    if (topPosition >= 440) {
        return;
    } else {
        let position = topPosition;
        position += 50;
        playerShip.style.top = `${position}px`;
    }
}
