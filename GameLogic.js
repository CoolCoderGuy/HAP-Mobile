
 // Declare paddle, paddle2, and ball variables in the global scope
var paddle, paddle2, ball;

function start() {
    sjs.open();

    // Set up background image 
    var background = new sjs.Image("background.png");
    background.setSize(sjs.getWidth(), sjs.getHeight());

    // Set up ball 
    ball = new sjs.Image("PLANE.png");   
    ball.type = "ball";
    ball.setSize(55,55);
    ball.center();
    ball.friction = 0;
    ball.bounce();
    ball.pushUp(2);
    ball.pushLeft(3);

    // Set up paddle 
    paddle = new sjs.Image("TOWERS.png");
    paddle.type = "paddle";
    paddle.setSize(100, 30);
    paddle.centerH();

    // Set up AI paddle 
    paddle2 = new sjs.Image("TOWERS.png");
    paddle2.type = "paddle";
    paddle2.setSize(100,30);
    paddle2.left().bottom();

 // User score setup
    var score = 0;
    var score_txt = new sjs.Text("Score: 0", 30, "red"); 
    var mobileHighScore = localStorage.getItem('mobileHighScore') || 0; // Initialize high score from localStorage, defaulting to 0 if no high score is stored

 // Initial onhit setup
    sjs.onHit("ball","paddle", function(ball,paddle){   
        score = score + 1; 
        score_txt.setText("HHHits: "+score);     

// Define a variable to control the smoothness of movement
var smoothness = 0.5; // Adjust as needed, lower values make smoother movement

     // Setup for the AI paddle movement
function movePaddle2(ball) {
    // Calculate the target X position for the middle of paddle2 to intercept the ball horizontally
    var targetX = ball.x - (paddle2.width / 2) + (ball.width / 2); 
    
    // Check if the ball object has a speedX property
    if (ball.hasOwnProperty('speedX')) {
        // Calculate the velocity of the ball
        var ballVelocityX = ball.speedX;
    } else {
        // If the speedX property doesn't exist, assume a default velocity
        var ballVelocityX = 0; // Or any other default value you choose
    }
    
    var deltaX = targetX - paddle2.x;
    // Adjust the paddle's movement based on the smoothness factor and the ball's velocity
    paddle2.x += deltaX * smoothness + ballVelocityX * smoothness;
}

setInterval(function(){
    movePaddle2(ball);
}, 0);
     
    // Defining weighted sound effects
    var soundWeights = {
        'Game Sound/BONG.mp3': 5,
        'Game Sound/METAL.mp3': 5,
        'Game Sound/BONK.mp3': 5,
        'Game Sound/TOOT.mp3': 3,
        'Game Sound/HUH.mp3': 3,
        'Game Sound/PLUH.mp3': 3,
        'Game Sound/KNOCKED.mp3': 3,
        'Game Sound/MOGUS.mp3': 2,
        'Game Sound/ECHO.mp3': 0.5,
        'Game Sound/ANDROID.mp3': 3,
        'Game Sound/BIGBONG.mp3': 2,
        'Game Sound/BOING.mp3': 3,
        'Game Sound/BONE.mp3': 4,
        'Game Sound/BREAK.mp3': 3,
        'Game Sound/DEFAULT.mp3': 2,
        'Game Sound/EHMAZING.mp3': 4,
        'Game Sound/GOOFY.mp3': 4,
        'Game Sound/HEHEHEHA.mp3': 3,
        'Game Sound/PIPE.mp3': 5,
        'Game Sound/LINGING.mov': 2,  
        'Game Sound/2099.mp3': 2,
        'Game Sound/BWOMP.mp3': 5,
        'Game Sound/JOE.mp3': 3,
        'Game Sound/PROWLER.mp3': 3, 
        'Game Sound/HAPPY.mp3': 0.1,
        'Game Sound/RIZZ.mp3': 0.3 
     
    };
 
    var weightedSoundFiles = [];
    Object.keys(soundWeights).forEach(function(soundFile) {
        for (var i = 0; i < soundWeights[soundFile]; i++) {
            weightedSoundFiles.push(soundFile);
        }
    });

     // Randomize sound effects
    var randomIndex = Math.floor(Math.random() * weightedSoundFiles.length);
    var randomSoundFile = weightedSoundFiles[randomIndex];

    var randomSound = new Audio(randomSoundFile);
    randomSound.play();

        // If statements to make the game harder as it progresses
       if(score == 5){
            ball.pushUp(1);
            ball.pushLeft(1);   
        }

        if(score == 10){
            ball.setSize(50,50);     
        }

        if(score == 20){
            ball.pushUp(-1);
            ball.pushLeft(-1);   
        }

        if(score == 25){
            ball.setSize(40,40);   
        } 

        if(score == 35){
            paddle.setSize(75,30);  
        }

        if(score == 38){
            paddle2.setSize(100,50); 
        }

        if(score == 40){
            ball.setSize(25,25); 
        }

        if(score == 45){
            ball.setSize(15,15); 
        }

 if(score == 50){
            ball.pushLeft(-1);
            ball.pushUp(-1);
 }
     
 if(score == 65){
            ball.pushUp(-1);
            ball.pushLeft(-1);   
        }

if(score == 75){
            paddle.setSize(75.10);
        }
     
if(score == 100){
            paddle.setSize(50,50); 
        }
    
     //Saving the highscore
        if(score > mobileHighScore) {
            mobileHighScore = score; // Replace high score with current score if current score is higher
            localStorage.setItem('mobileHighScore', mobileHighScore); // Save updated high score to localStorage
        }

        // Extra Collision 
        
        sjs.bounceOff(ball,paddle);
    });

 // Gameover setup
    sjs.onHit("ball",["top_screen","bottom_screen"], function(){ 
        if(score > mobileHighScore) {
            mobileHighScore = score; // Replace high score with current score if current score is higher
            localStorage.setItem('mobileHighScore', mobileHighScore); // Save updated high score to localStorage
        }
        window.location = "gameover.html";
    }); 

    // The few keyboard controls left in the mobile version
    sjs.keyDown(DOWN_KEY, function(){ 
        ball.friction -= -0.001;
    }); 

    sjs.keyDown(W_KEY, function(){ 
        var newball = new sjs.Image("MOGUS.png"); 
        newball.type = "newball";
        newball.setSize(25,25);   
        newball.center(); 
        newball.friction = 0;
        newball.bounce();
        newball.pushRight(5);
        newball.pushUp(7);    
    }); 

    sjs.keyDown(C_KEY, function(){ 
        var newball = new sjs.Image("CHARLIE.png"); 
        newball.type = "newball";
        newball.setSize(75,75);   
        newball.center(); 
        newball.friction = 0;
        newball.bounce();
        newball.pushRight(5);
        newball.pushUp(7);    
    }); 

    sjs.keyDown(V_KEY, function(){ 
        var newball = new sjs.Image("VERBALASE.png"); 
        newball.type = "newball";
        newball.setSize(75,75);   
        newball.center(); 
        newball.friction = 0;
        newball.bounce();
        newball.pushRight(5);
        newball.pushUp(7);    
    }); 
  
    // Reset score to 0 every time the game starts
    score = 0;
}

//set up for the start button
    document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.addEventListener("click", start);
    document.getElementById("target").appendChild(startButton);
});

 // Functions for the onscreen buttons
function paddleLeft() {

 paddle.pushLeft (7); 

}

function paddleRight() {

 paddle.pushRight (7); 

}

function MOGUS() {
   
  var newball = new sjs.Image("MOGUS.png"); 
newball.type = "newball";
newball.setSize(25,25);  
newball.center(); 
newball.friction = 0;
newball.bounce();
newball.pushRight(5);
newball.pushUp(7);

}

function addFriction() {

  ball.friction -= 0.001;
  
}

// Event listeners for the on screen buttons
document.addEventListener("DOMContentLoaded", function() {
    var moveLeftBtn = document.getElementById("moveLeftBtn");
    var moveRightBtn = document.getElementById("moveRightBtn");
    var mogusBtn = document.getElementById("mogusBtn");
    var addFrictionBtn = document.getElementById("addFrictionBtn");

 // Event listners for when the on screen buttons are clicked or pressed
    moveLeftBtn.addEventListener("click", paddleLeft);
    moveRightBtn.addEventListener("click", paddleRight);
    mogusBtn.addEventListener("click", MOGUS);
    addFrictionBtn.addEventListener("click", addFriction);
});
