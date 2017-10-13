//set up initial position for the character
let initialX = 200;
let initialY = 395;

//Lists of designated X and Y values
let Ys = [55, 140, 225, 310];
let Xs = [0, 100, 200, 300, 400];



// Enemies our player must avoid
let Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100; //enemies starts from outside the left side of the canvas.
    this.y = Ys[Math.floor(Math.random() * Ys.length)]; //make enemies appear randomly across the lanes.
};


Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * 300 * Math.random());//move enemies across the canvas at random speeds.
    //test if the character collide with an enemy
    if (player.x - this.x < 75 && player.x - this.x > 0 && this.y === player.y) {
        $('.modalLose').css('display', 'inline-block');//show lose modal
        player.reset();
    };
    //resets enemys when they reach the end of the canvas
    if (this.x > 505) {
        this.x = -100
        this.y = Ys[Math.floor(Math.random() * Ys.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//build player object
let Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.x = initialX;
    this.y = initialY;
};


Player.prototype.update = function() {
 
};

//reset player to initial position.
Player.prototype.reset = function() {

    this.x = 200;
    this.y = 395;
   
};  

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//function that handle player movement when certain key is pressed.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up': 
            if (this.y === 55) {
                $('.modalWin').css('display', 'inline-block');//show win modal.
                player.reset();    
            }
            else {
                this.y -= 85;
            }
            break;
        case 'down':
            if (this.y != 395) {
                this.y += 85;
            }
            break;
        case 'left':
            if (this.x != 0) {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x != 400) {
                this.x += 100;
            }
            break;
    }
};


//create new enemies and player.
const allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player= new Player();


document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//reload page when user click play again.
$('.again').click(function(){
    location.reload();
})
