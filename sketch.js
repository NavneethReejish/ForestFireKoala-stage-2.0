//declaring variables
var INFO = 5;
var INFO2 = 4;
var INFO3 = 3
var PLAY = 2;
var END = 1;
var WIN = 0;
var gameState = INFO;

var koala, koala_collided, koala_running, koala_jumping;
var PlayButton, playImg;
var NextButton, NextButton2, nextImg;
// var PrevButton, prevImg;

var ground, bg1, bg2, bg1Image, bg2Image;

var obstacle, obstaclesGroup, obstacleAnime;

var score = 0;

var gameOver, restart;


function preload() {

    //loading Images
    koala_running = loadAnimation("images/koala_walk01.png", "images/koala_walk02.png", "images/koala_walk03.png");

    koala_collided = loadImage("images/koala_idle@2x.png");
    koala_jumping = loadImage("images/koala_jump@2x.png");

    playImg = loadImage("images/Play.png");
    nextImg = loadImage("images/next_IMG.png");
    // prevImg = loadImage("images/previous_image.png");


    bg1Image = loadImage("images/bg1.jpg");
    bg2Image = loadImage("images/bg2.jpg");
    obstacleAnime = loadAnimation("images/Obstacles/Fire1.png", "images/Obstacles/Fire2.png", "images/Obstacles/Fire3.png", "images/Obstacles/Fire4.png");
    ;


}

function setup() {
    createCanvas(600, 400);

    bg1 = createSprite(200, 200, 400, 400);
    bg1.addImage(bg1Image);
    bg1.x = bg1.width / 2;
    //remove comments on below line - Velocity - Once the game development is finished.
    bg1.velocityX = -(6 /*+ 3*score/100*/);
    //bg1.visible = false;

    /* bg2 = createSprite(200,200,400,400);
     bg2.addImage(bg2Image)
     bg2.x = bg2.width/2;
     bg2.velocityX = -(6 + 3*score/100);
     bg2.visible = false;*/


    ground = createSprite(200, 380, 600, 20);
    ground.visible = false;

    koala = createSprite(50, 180, 20, 50);
    koala.addAnimation("running", koala_running);
    koala.scale = 0.4;
    koala.visible = true;

    NextButton = createSprite(450, 340, 100, 50);
    NextButton.addImage(nextImg);
    NextButton.scale = 0.7;

    NextButton2 = createSprite(200, 340, 100, 50);
    NextButton2.addImage(nextImg);
    NextButton2.scale = 0.7;
    NextButton2.visible = false

    // PrevButton = createSprite(250,340,100,50);
    // PrevButton.addImage(prevImg);
    // PrevButton.scale = 0.7;
    // PrevButton.visible = false;

    PlayButton = createSprite(250, 250, 100, 50)
    PlayButton.addImage(playImg);
    PlayButton.scale = 0.7
    PlayButton.visible = false;

    obstaclesGroup = new Group();


    score = 0;

}

function draw() {
    background(83, 198, 25);
    text("Score: " + score, 500, 50);
    console.log(gameState);

    if (gameState === INFO) {
        //background(53,204,53);
        bg1.visible = false;
        koala.visible = true;
        NextButton.visible = true;
        // PrevButton.visible = false;
        PlayButton.visible = false;



        textSize(20);
        fill(0, 0, 0)
        text("This is Koala.", 200, 200);

        if (gameState === INFO && NextButton.visible === true && mousePressedOver(NextButton)) {
            gameState = INFO2;
        }



    } else if (gameState === INFO2) {
        background(244, 141, 0);
        koala.visible = false;
        bg1.visible = false;
        NextButton.visible = false;
        NextButton2.visible = true;
        // PrevButton.visible = true;
        PlayButton.visible = false;

        textSize(16.3);
        fill(0, 0, 0);
        text("The deadly, world-famous Australian bushfires occur in Australia's fire season.", 10, 70);
        text("Australia's fire season, is a particular period in the summer, with hot, dry weather.", 10, 110);
        text("Because of this weather, it becomes easy for blazes to start and", 10, 150)
        text("spread through dry brush.", 10, 190);
        text("Every Year, hundreds of koalas die due to these fires.", 10, 230)

        // textSize(15);
        // fill(0, 0, 0);
        // text("Press Space key to go to the next page", 50, 350)
        if (gameState === INFO2 && NextButton2.visible === true && mousePressedOver(NextButton2)) {
            gameState = INFO3;
        }

        // if(gameState === INFO2 && PrevButton.visible === true && mousePressedOver(PrevButton)){
        //     gameState = INFO;
        // }

    } else if (gameState === INFO3) {
        koala.visible = false;
        bg1.visible = false;
        // PrevButton.visible = true;
        NextButton2.visible = false;
        PlayButton.visible = true;
        textSize(19);
        fill(0, 0, 0);
        text("Help Koala escape from the raging bushfire and bring him to safety.", 25, 110);
        text("Avoid the obstacles by using the space bar to jump over them.", 25, 150);
        text("Come on, let's help this koala!", 25, 190);

        // if(gameState === INFO3 && PrevButton.visible === true && mousePressedOver(PrevButton)){
        //     gameState = INFO2;
        // }

        if (gameState === INFO3 && PlayButton.visible === true && mousePressedOver(PlayButton) ) {
            gameState = PLAY
        }







    } else if (gameState === PLAY) {
        //algorithm for score
        score = score + Math.round(getFrameRate() / 60);

        // to produce illusion of moving objects.
        ground.velocityX = -(6 + 3 * score / 100);

        // to make the koala jump when the space bar is pressed.
        if (keyDown("space") && koala.y >= 159) {
            koala.velocityY = -12;
        }

        //gravity effect
        koala.velocityY = koala.velocityY + 0.8;

        // to make infinite background
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }

        koala.collide(ground);
        spawnObstacles();

        // to make the player lose when the koala comes into contact with an obstacle.
        if (obstaclesGroup.isTouching(koala)) {
            gameState = END
        }


        // to make the player win when his score reaches 1 million.
        if (koala.score >= 100) {
            gameState = WIN
        }

    } else if (gameState === END) {

        //to stop all objects from moving
        ground.velocityX = 0;
        koala.velocityY = 0
        obstaclesGroup.setVelocityEach(0);

        // to show a collided image of the koala, when he hits the obstacle.
        koala.changeAnimation("collided", koala_collided);

        // infinite lifetime of objects, so that they are not destroyed.
        obstaclesGroup.setLifetimeGroup(-1);




    } else if (gameState === WIN) {

    }

    drawSprites();
}

function spawnObstacles() {
    // to spawn obstacles every 60 frames
    if (frameCount % 60 === 0) {
        obstacle = createSprite(500, 180, 20, 50);
        obstacle.velocityX = -(6 + 3 * score / 100);

        obstacle.addAnimation(obstacleAnime)

        //add scale and lifetime to the obstacle
        obstacle.scale = 0.6;
        obstacle.lifetime = 300;

        // add obstacles to ObstacleGroup
        obstaclesGroup.add(obstacle);

    }
}

