//creating variables
var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;

var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;


function preload()
{
  //to upload images
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");
  //is a new grp
  fruitGroup = new Group();
}

function setup() 
{
  createCanvas(1000, 600);
  database = firebase.database();
  //is a new Game and gatState and start functions are called
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() 
{
  background(back_img);
  
   //is player count is 2 then update the state to 1
   if (playerCount === 2) 
   {
     game.update(1);
   }

   //if game state is 1 then clear and play functions are calleed
   if (gameState === 1) 
   {
     clear(); 
     game.play();
   }

   //if game state is 2 gae will be ended
   if (gameState === 2) {
    
     game.end();
   }
}