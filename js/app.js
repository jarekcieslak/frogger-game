// Global random function. Used for different prototypes
var randomize = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Enemies our player must avoid
var Enemy = function (rowNumber) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startBug(rowNumber);
    this.numberPasses = 0;
}
Enemy.prototype.startBug = function (rowNumber) {
    this.x = 0 - randomize(300, 0);
    this.y = rowNumber * rowHeight - (rowHeight / 2) + 20;
    this.dx = this.randomizeSpeed(1, 20);
}
Enemy.prototype.randomizeSpeed = function (min, max) {
    return randomize(min, max);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.dx;
    if (this.numberPasses % 4) {
        this.dx = this.randomizeSpeed(1, 20);
    }
    if (this.x >= colWidth * 6) {
        this.x = 0 - randomize(300, 0);
        this.numberPasses++;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (startX, startY) {
    this.sprite = 'images/char-boy.png';
    this.x = startX;
    this.y = startY;
}

Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.startPlayer = function() {
    this.x = playerStartX;
    this.y = playerStartY;
    
}
Player.prototype.handleInput = function (keyCode) {

    switch (keyCode) {
        case 'left':
        {
            this.x = this.x - colWidth;
            break;
        }
        case 'right':
        {
            this.x = this.x + colWidth;
            break;
        }
        case 'up':
        {

            this.y = this.y - rowHeight;
            break;
        }
        case 'down':
        {
            this.y = this.y + rowHeight;
            break;
        }
    }

}


var speed = 1;
var colWidth = 101,
    rowHeight = 83,
    firstTrackY = 76,
    playerStartX = 200,
    playerStartY = 385,
    gemFitX = 5,
    gemFitY = 15,
    lowScore = 10,
    middleScore = 20,
    highScore = 30;
    numCols = 5;
    numRows = 6;


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
player = new Player(playerStartX, playerStartY);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



