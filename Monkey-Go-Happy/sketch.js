var bananaImage, obstaclesImage, backgroundImage;
var obstaclesGroup, bananasGroup, jungle, ground;
var monkey, monkey_running, monkey_collided;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload (){
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  backgroundImage = loadImage ("download.jpg");
  obstacleImage = loadImage ("stone.png");
  bananaImage = loadImage ("banana.png");
  monkey_collided = loadImage ("Monkey_08.png");
  
}

function setup() {
  createCanvas(500, 400);
  
  jungle = createSprite(400,120,500,400);
  jungle.addImage("background", backgroundImage);
  jungle.x = jungle.width/2;
  jungle.scale = 4;
  jungle.velocityX = -3;
  
  
  monkey = createSprite(50,340,20,20);
  monkey.addAnimation ("monkey", monkey_running);
  monkey.addImage (monkey_collided);
  monkey.scale = 0.15;
  
  invground = createSprite (250, 390, 500, 40);
  invground.visible = false;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  
}


function draw() {
  //to make infinite scrolling ground
  if (jungle.x<0){
    jungle.x = jungle.width/2;
  }
 
  //gravity effect
  monkey.velocityY = monkey.velocityY + 0.8;
  //if bananas touch banana, they score more points
  if (bananasGroup.isTouching(monkey)){
    score = score +2;
  }
  
  if (obstaclesGroup.isTouching(monkey)) {
    monkey.changeImage (monkey_collided);
    monkey.scale = monkey.scale - 0.2;
  }
  
  if (gameState===PLAY) {
       //to make monkey jump when u is pressed
      if (keyDown("u") && monkey.y >= 311){
        monkey.velocityY = -20;
      }
      

      if (obstaclesGroup.isTouching(monkey)) {
          gameState = END;
      }
  } 
  
  else if (gameState===END) {
    //set Velocity of each object to zero
    jungle.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach (0);
    bananasGroup.setVelocityXEach (0);
    //to change trex animation
    monkey.changeAnimation ("collided", monkey_collided);
    
    //set lifetime of game objects so that they never get destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if (keyDown("f")){
      reset();
    }
      
  }
  //to increase size of monkey if it catches more bananans
  switch (score){
    case 10: monkey.scale = 0.17;
      break;
    case 20: monkey.scale = 0.19;
      break;
    case 30: monkey.scale = 0.21;
      break;
    case 40: monkey.scale = 0.23;
      break;
    case 50: monkey.scale = 0.25;
      break;
  }
  
  //to randomly spawn bananas in the sky
  spawnBananas ();
  //to randomly spawn obstacles which will hurt the monkey
  spawnObstacles ();
  //to make sure monkey doesn't fall off the ground
  monkey.collide(invground);
  
  drawSprites();
  
  //to display score
    stroke("white");
    textSize (20);
    fill ("white");
  text ("Score : " + score, 390, 50);
}



function spawnBananas () {
  if (frameCount % 60 === 0){
    var banana = createSprite (500, 100);
    banana.addImage(bananaImage);
    banana.scale = 0.04;
    banana.y = Math.round(random(100,200));
    
    rand1 = Math.round(random(1,2));
    if (rand1 === 1) {
      banana.x = 0;
      banana.velocityX = 6;
    }
    else{
      banana.x = 400;
      banana.velocityX = -6;
    }
    
    banana.lifetime = 140;
    bananasGroup.add(banana);
  }
}

function spawnObstacles () {
  if (frameCount % 100 === 0){
    var obstacle = createSprite (500, 360);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = - 10; 
    obstacle.scale = 0.15;

    
    obstacle.lifetime = 140;
    
    obstaclesGroup.add (obstacle);
  }
}

function reset (){
  gameState = PLAY;
  monkey.changeAnimation ("running", monkey_running);
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
}
  