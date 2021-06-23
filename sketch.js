var tower,towerImage
var door,doorImage,doorGroup
var climber,climberImage,climberGroup
var ghost,ghostImage
var invBlock,invBlockgrp
var gameState="play"
var  spookysound

function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  spookysound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImage)
  ghost.scale=0.3
  
  spookysound.loop()
  
  doorGroup= new Group();
  climberGroup= new Group()
  invBlockgrp=new Group()
  
}
function draw(){
  background(0);
  
  if(gameState==="play"){
    

  if(tower.y>400){
    tower.y=300
  
  }
  if(keyDown("space")){
    ghost.velocityY=-5
    
  }
ghost.velocityY=ghost.velocityY+0.8
  
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3
    
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+3
    
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
    
  }
  spawnDoors()
    if(invBlockgrp.isTouching(ghost)){
      gameState="end"
      ghost.destroy
    }
  drawSprites();
  }
  if(gameState==="end"){
    
    stroke("white")
   fill("white")
    textSize(30)
    text("GAME OVER",230,250)
  }
  
}
function spawnDoors(){
  if (frameCount%240===0){
     door=createSprite(200,50)
    door.addImage(doorImage)
    door.x=Math.round(random(120,400))
    door.velocityY=tower.velocityY
    doorGroup.add(door);
    door.lifetime=800
    ghost.depth=door.depth
    ghost.depth+=1
    
    climber=createSprite(200,100)
    climber.addImage(climberImage)
    climber.x=door.x
    climber.velocityY=1;
    climberGroup.add(climber);
    climber.lifetime=800
    
    invBlock=createSprite(200,115)
    invBlock.width=climber.width
    invBlock.height=2
    invBlock.x=door.x
    invBlock.velocityY=1;
    invBlockgrp.add(invBlock)
    invBlock.debug=true
  }
}

