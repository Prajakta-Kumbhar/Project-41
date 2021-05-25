class Player 
{
    constructor() 
    {
        //this.index,name will be null and this.dist and score will be 0
        this.index = null;
        this.distance = 0;
        this.name = "";
        this.score = 0;
    }

    //get player's count
    getCount() 
    {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => 
        {
            playerCount = data.val();
        })
    }

    //update the count
    updateCount(count) 
    {
        database.ref("/").update(
        {
            "playerCount" : count
        });
    }

    update() 
    {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set(
        {   
            //name will be this.name and so on..
            "name" : this.name,
            "distance" : this.distance,
            "score" : this.score
        });
    }

    static getPlayerInfo() 
    {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => 
        {
            allPlayers = data.val();
        })

        
    }

    
}
