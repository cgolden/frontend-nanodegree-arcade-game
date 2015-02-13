// Variable definitions
var rightEdge = 440;
var leftEdge = 0;
var topEdge = 0;
var bottomEdge = 445;
var speedMax = 200;
var speedMin = 5;
var playerStartX = 202;
var playerStartY = 332;
var playerMovement = 30;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    /* Help with speed:
     * http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
     */
    this.speed = Math.floor( Math.random() * ( 1 + speedMax - speedMin ) ) + speedMin;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (this.speed * dt);
    
    if (this.x > rightEdge) {
            //if at edge, reset position
            this.x = leftEdge;
    }

    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
        this.x = playerStartX;
        this.y = playerStartY;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode) {
    switch (keycode) {
        case 'up':
         this.y -= playerMovement;
         if (this.y < topEdge) {
            //if at edge, re position
            player.update();
         }
         break;

        case 'down':
         this.y += playerMovement;
         if (this.y > bottomEdge) {
            //if at edge, reset position
            player.update();
         }
         break;

        case 'left':
         this.x -= playerMovement;
         if (this.x < leftEdge) {
            //if at edge, reset position
            player.update();
         }
         break;

        case 'right':
         this.x += playerMovement;
         if (this.x > rightEdge) {
            //if at edge, reset position
            player.update();
         }
         break;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(75, 230);
var enemy2 = new Enemy(200, 150);
var enemy3 = new Enemy(10, 60);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(playerStartX, playerStartY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
