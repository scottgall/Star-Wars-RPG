$(document).ready(function(){

    var charChosen = false;
    var enemyChosen = false;
    var charName;
    var charIndex;
    var charDisplay;
    var defenderName;
    var defender;
    var defenderDisplay;
    var charHP;
    var defenderHP;
    var charAttack;
    var newCharAttack;
    var defenderAttack;
    var name = ["Jek Porkins", "Jar Jar Binks", "Max Rebo", "Nien Nunb"];
    var hp = [120, 100, 150, 180];
    var attack = [7, 10, 4, 16];
    var wins = 1;
    var gameWon = false;
    var gameLost = false;

    var defender;

    $(".char").on('click', function () {
        
        if (!charChosen) {
            // place clicked character in #yourchar div
            $(this).appendTo("#yourChar");
            // place all others in #emenies div
            $(".char").not(this).appendTo("#enemies").css({"background-color": "#ff3c1a", "color": "lightgray", "border-color": "lightgray", "margin": "0px 5px"}).addClass("enemy");        
            // switch charChosen to true
            charChosen = true;
            // set charname for notification purpose
            charName = name[$(this).val()];
            // set charIndex to it's value in html
            charIndex = parseInt([$(this).val()]);
            // set charHP
            charHP = hp[$(this).val()];
            // set charAttack
            charAttack = attack[$(this).val()];
            // display charHP
            charDisplay = $(this).children("a");

            $("#notification").html("<i class='swg swg-saberjedi'></i> Choose an enemy to fight <i class='swg swg-sabersith'></i>");

            
            console.log("your character - " + charName)
            console.log("your HP - " + charHP)
            console.log("your attack - " + charAttack)
        }

        $(".enemy").on('click', function () {
            if (!enemyChosen && !gameLost) {
            // place clicked enemy in #defender div
            $(this).appendTo("#defender").css({"background-color": "#383838", "color": "lightgray", "border-color": "#ffff66"});
            // switch enemyChosen to true
            enemyChosen = true;
            // set defenter name for notification purposes
            defenderName = name[$(this).val()];
            // set defenterHP
            defenderHP = hp[$(this).val()];
            // set defenderAttack value
            defenderAttack = attack[$(this).val()];
            // display defenderHP
            defenderDisplay = $(this).children("a");
            // set defender
            defender = $(this);

            $("#notification").html("ATTACK AWAY!");


            console.log("defender  - " + defenderName)
            console.log("defender HP - " + defenderHP)
            console.log("defender attack - " + defenderAttack)
            
            $("#notification").empty();
            }
        })
    })
    
    $("#attack").on('click', function() {
        if (enemyChosen) {
            console.log("attack")
            // reduce charHP by defenderAttack
            charHP -= defenderAttack;
            console.log(charName + " new HP - " + charHP)
            // reduce defenderHP by charAttack
            defenderHP -= charAttack;
            console.log(defenderName + " new HP - " + defenderHP)
            // increase charAttack
            charAttack += attack[charIndex];
            console.log(charName + " new attack - " + charAttack)
            // display new charHP
            charDisplay.text(charHP);
            // display new defenderHP
            defenderDisplay.text(defenderHP);
            // post-attack scenarios
            if (charHP > 0 && defenderHP > 0) {
                // post-attack notification for fight still in-play
                $("#notification").html("You attacked " + defenderName + " for " + charAttack + " damage.<br>"  +  defenderName + " attacked you back for " + defenderAttack + " damage.");
              // check for loss  
            } else if (charHP < 0) {
                // notification for loss
                $("#notification").html("<i class='swg swg-stormtrooper'></i> The force is not with you...GAME OVER! <i class='swg swg-darthvader'></i>");
                $("#defender").html("<img src='assets/images/loss.gif' style='height: 138px'>");
                // disable attack button
                enemyChosen = false;
                gameLost = true;
                // appear restart button
                $("#restart").html("<button id='restartButton'>RESTART</button>");
              // check for win  
            } else if (defenderHP < 0) {
                // increment wins
                wins++;
                console.log("wins - " + (wins - 1))
                // remove defeated defender
                defender.remove();
                // disable attack button
                enemyChosen = false;
                // check to see if all enemies defeated
                if (wins === name.length) {
                    // win notification
                    $("#notification").html("<i class='swg swg-c3po'></i> YOU WON! <i class='swg swg-leia'></i>");
                    $("#defender").html("<img src='assets/images/win.gif' style='height: 138px'>");
                    console.log("WIN")
                    gameWon = true;
                    // appear restart button
                    $("#restart").html("<button id='restartButton'>RESTART</button>")
                  // post-win, enemies still in play  
                } else {
                    // win notification, enemies still in play
                    $("#notification").html("You defeated " + defenderName + ",<br> choose another enemy to fight.") 
                }
            }
          // notification when you click attack at  
        } else if (!gameWon && charChosen && enemyChosen) {
            $("#notification").html("No enemy here!") 
        }
        $("#restartButton").on('click', function () {
            location.reload();
        }) 
    })
 
});
