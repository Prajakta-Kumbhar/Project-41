class Game
{
    constructor()
    {

    }

    //to get the game state
    getState()
     {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) 
        {
            gameState = data.val();
        })
    }

    //to update the game state
    update(state) 
    {
       database.ref("/").update(
        {
            "gameState" : state
        })
    }

    async start() 
    {
        if (gameState === 0)
        {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            //maybe if player count existes, playercount will increase
            if (playerCountRef.exists()) 
            {
               playerCount = playerCountRef.val();
               player.getCount();
            }

            form = new Form()
            form.display();
        }
      //player1 will be created and image will be added  
      player1 = createSprite(450,500);
      player1.addImage("player1",player_img);
    
      //player2 will be created and image will be added  
      player2 = createSprite(600,500);
      player2.addImage("player2", player_img);
      //players is a array
      players=[player1,player2];

    }
    
    play()
    {
       //form will be hided
       form.hide()
       
       //player will get info
       Player.getPlayerInfo();
       //the imagefunction
       image(back_img, 0, 0, 1000, 800);
       
       //initial values of x,y,index
       var x = 200;
       var y = 400;
       var index =0;
       drawSprites();


       for(var plr in allPlayers)
       {
                      
           
            players[index].y = y
            x = 500 - allPlayers[plr].distance
            players[index].x = x
             
            console.log("index")
            if(index + 1 === player.index)
            {
                //add code to display the player's name on the respective basket.
                textSize(20)
                fill("black")
                text(allPlayers[plr].name, x- 25, y +25)
                         
            }   

         
            fill("white")
            textSize(30)
           text("Player 1 :" + allPlayers.player1.score,50,50)
            text("Player 2 :" + allPlayers.player2.score,50,80)

            index = index+1;                     
        }
         
         
                
         //if right arrow is pressed and the player is there(in the game)
         if (keyIsDown(RIGHT_ARROW) && player.index != null) 
         {
            //player's distance will be decreased by 20,and player will update
            player.distance -= 10
            player.update();
            console.log("Working")
         }
                
         //if left arrow is pressed and the player is there(in the game)
         if (keyIsDown(LEFT_ARROW) && player.index != null) 
         {
             //player's dist will be increased by 10,and player will update
             player.distance += 10
             player.update();
         }
            
         //after every 20 frames...     
         if (frameCount % 20 === 0)
         {
            //fruits will be randoly create btwn 100,1000,its y velocity will be 6
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            
            //randomly 1 will be chosen from 1,5
            var rand = Math.round(random(1,5));
            switch(rand)
            {
              //if chosed 1 then add fruit1 image and so on
              case 1: fruits.addImage("fruit1",fruit1_img);
              break;
              case 2: fruits.addImage("fruit1", fruit2_img);
              break;
              case 3: fruits.addImage("fruit1", fruit3_img);
              break;
              case 4: fruits.addImage("fruit1", fruit4_img);
              break;
              case 5: fruits.addImage("fruit1", fruit5_img);
              break;
            }
            //add fruits grp
            fruitGroup.add(fruits);
                     
         }
            //is there's a player in the game..
            if (player.index !== null) 
            {
                //if i is less than the total no. of fruits then....
                for (var i = 0; i < fruitGroup.length; i++) 
                {
                    //and if the fruit is touching players..
                    if (fruitGroup.get(i).isTouching(players)) 
                    {
                        //that fruit will be destroyed and the score will be increased by 1
                        fruitGroup.get(i).destroy();
                        player.score = player.score + 1;
                        player.update()
                    }
                }

            }
    }
    
    end()
    {
       //GameEnded will appear in console
       console.log("Game Ended");
    }
}
