var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

function duck() {
    this.sprite;
    this.duckKilled = false;
    this.prevDirection = 1;
    this.TookOff = false
}
// Ducks initialization
var duck1 = new duck();
var duck2 = new duck();

function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.spritesheet('duck1', 'assets/duck.png', 110, 110, 6);
    game.load.spritesheet('duck2', 'assets/duck.png', 110, 110, 6);
}
// Globals
var currentVelocity = 150;
var score = 0;
var scoreboard;
// Sound effects
var gunshot = new Audio('assets/gunshot.mp3');
var ducksFlying = new Audio('assets/ducks-flying.mp3');
ducksFlying.loop = true;
ducksFlying.play();

function create() {
    // Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // Adding sprites and background
    duck1.sprite = game.add.sprite(300, 450, 'duck1');
    duck2.sprite = game.add.sprite(600, 450, 'duck2');
    this.game.stage.backgroundColor = '#00BFFF';
    var bg = game.add.sprite(0, 0, 'background');
    bg.height = game.height;
    bg.width = game.width;
    
    // Setting up flying animation for duck 1
    duck1.sprite.animations.add('flying', [0, 1, 2], 15, true);
    duck1.sprite.animations.add('die', [3], 15, true);
    duck1.sprite.animations.add('falling-right', [4], 15, true);
    duck1.sprite.animations.add('falling-left', [5], 15, true);
    // Setting up flying animation for duck 2
    duck2.sprite.animations.add('flying', [0, 1, 2], 15, true);
    duck2.sprite.animations.add('die', [3], 15, true);
    duck2.sprite.animations.add('falling-right', [4], 15, true);
    duck2.sprite.animations.add('falling-left', [5], 15, true);

    // Enable physics on the duck
    game.physics.arcade.enable(duck1.sprite);
    game.physics.arcade.enable(duck2.sprite);
    //  Creating controls.
    cursors = game.input.keyboard.createCursorKeys();
    duck1.sprite.body.collideWorldBounds = true;
    duck1.sprite.body.bounce.setTo(1.0, 1.0);

    duck2.sprite.body.collideWorldBounds = true;
    duck2.sprite.body.bounce.setTo(1.0, 1.0);

    game.world.setBounds(0, 0, 800, 525);
    // Sprite detection
    duck1.sprite.inputEnabled = true;
    duck1.sprite.events.onInputDown.add(duck1Shot, this);
    duck2.sprite.inputEnabled = true;
    duck2.sprite.events.onInputDown.add(duck2Shot, this);
    // Scoreboard
    var phaser = document.getElementById('phaser')
    scoreboard = document.createElement('span');
    scoreboard.innerHTML = '0';
    scoreboard.id = 'scoreboard';
    phaser.appendChild(scoreboard);
}

function update() {
    checkDuckTookOff(duck1);
    checkDuckTookOff(duck2);

    checkPrevDirection(duck1);
    checkPrevDirection(duck2);

    checkDuckKilled(duck1);
    checkDuckKilled(duck2);
}

function checkDuckTookOff(duck) {
    if (!duck.duckTookOff) {
        var velocityX = currentVelocity;
        if (Math.random() > 0.5) velocityX *= -1;
        var velocityY = Math.floor((Math.random() * currentVelocity) + currentVelocity / 1.5);
        duck.sprite.body.velocity.x = velocityX;
        duck.sprite.body.velocity.y = -velocityY;
        duck.sprite.animations.play('flying');
        duck.duckTookOff = true;
    }
}


function checkPrevDirection(duck) {
    if (duck.prevDirection < 0 && duck.sprite.body.velocity.x > 0) {
        if (Math.random() > 0.5) duck.sprite.body.velocity.y = -duck.sprite.body.velocity.y;
        duck.sprite.anchor.setTo(0.5, 0.5);
        duck.sprite.scale.x *= -1;
        duck.prevDirection = 1;
    } else if (duck.prevDirection > 0 && duck.sprite.body.velocity.x < 0) {
        if (Math.random() > 0.5) duck.sprite.body.velocity.y = -duck.sprite.body.velocity.y;
        duck.sprite.anchor.setTo(0.5, 0.5);
        duck.sprite.scale.x *= -1;
        duck.prevDirection = -1;
    }
}


function checkDuckKilled(duck) {
    if (duck.duckKilled) {
        if (duck.sprite.y + 110 >= game.world.height) {
            duck.sprite.body.velocity.y = 0;
            if (currentVelocity < 750) currentVelocity += 5;
            duck.sprite.x = Math.floor(Math.random() * game.world.width);
            duck.sprite.y = 600;
            duck.duckTookOff = false;
            duck.duckKilled = false;
        }
    }
}

function duck1Shot(event, sprite)
{
    if (!duck1.duckKilled) {
        duck1.sprite.animations.play('die', false);
        duck1.sprite.body.velocity.x = 0;
        duck1.sprite.body.velocity.y = 0;
        duck1.duckKilled = true;
        addScore();
        setTimeout(function() {
            if (duck1.prevDirection > 0) {
                duck1.sprite.animations.play('falling-left');
            } else {
                duck1.sprite.animations.play('falling-right');
            }
            duck1.sprite.body.velocity.y = 300;
        }, 750)
    }
}

function duck2Shot(event, sprite)
{
    if (!duck2.duckKilled) {
        duck2.sprite.animations.play('die', false);
        duck2.sprite.body.velocity.x = 0;
        duck2.sprite.body.velocity.y = 0;
        duck2.duckKilled = true;
        addScore();
        setTimeout(function() {
            if (duck2.prevDirection > 0) {
                duck2.sprite.animations.play('falling-left');
            } else {
                duck2.sprite.animations.play('falling-right');
            }
            duck2.sprite.body.velocity.y = 300;
        }, 750)
    }
}

function shotgun() {
    gunshot.play();
}

function addScore() {
    score += 10;
    scoreboard.innerHTML = score;
}