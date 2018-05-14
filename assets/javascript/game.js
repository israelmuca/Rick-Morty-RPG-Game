/*

- Hide characters from showing
- Show all characters in "choose character section"
- Listen to button click, to know which character was choosen
- Put chosen character in your character area
- Put not chosen characters in enemies available to attack area

- Listen to clicks in enemies available to attack area
- Put chosen character in defender area

- Listen for an attack
- ¿Defender has HP?
    - YES
        - user'sChoice attack is deducted from defender's HP
        - defender's counter is deducted from user'sChoice HP
        - ¿user'sChoice has HP?
            - YES
                - user'sChoice attack is increased (++)
            - NO
                - Gameover

    - NO
        - Remove Defender from defender section
        - Listen to clicks in enemies available to attack area


TO DO:
- Get a proper UI
- Add the stats to the padding of the buttons
*/

//Global variables
//Set variables for the user's choices
var userCharacter;
var userCharacterButton;
var defenderCharacter;
var defenderCharacterButton;
var defenderStats;
var userStats;
var statsAssigned = false;

//Make sure the document is loaded, then...
$(document).ready(function() {
    //Catch all the DOM elements!
    var htmlChooseCharacterSection = $("#choose-character-section");
    var htmlChooseCharacterButtonHolder = $("#choose-character-button-holder");
    var htmlBattleSection = $("#battle-section");
    htmlBattleSection.hide();
    var htmlYourCharacterSection = $("#your-character-section");
    var htmlYourEnemiesSection = $("#your-enemies-section");
    var htmlFightSection = $("#fight-section");
    htmlFightSection.hide();
    var htmlDefenderSection = $("#defender-section");
    htmlDefenderSection.hide();
    var htmlDefender = $("#defender");
    var lostSection = $("#lost-section");
    var wonSection = $("#won-section");
    var htmlCharactersContainer = $("#characters-container");
    var htmlRick = $("#rick");
    var htmlMorty = $("#morty");
    var htmlGrom = $("#grom");
    var htmlMeeseks = $("#meeseeks");

    htmlChooseCharacterButtonHolder.append(htmlCharactersContainer);
    lostSection.hide();
    wonSection.hide();

    //Listens to the user choosing it's character, then calls the defender select function
    htmlChooseCharacterButtonHolder.click(function(event){
        htmlChooseCharacterSection.hide();
        htmlBattleSection.show();
        userCharacter = event.target.id; //Gets the character's name
        userCharacterButton = event.target; //Gets the character's container (button)

        htmlYourCharacterSection.append(userCharacterButton); //Moves the user's choice to "Your Character" section
        //Change the CSS of the user's choice
        htmlYourEnemiesSection.append(htmlCharactersContainer); //Moves the rest of the choices to the "Your Enemies" section
        //Change the CSS of the enemies

        //function to capture the click event and send it to the selectDEfender function as a parameter
        //Has to be called from an anonymous function to be able to send the click event properly
        htmlYourEnemiesSection.click(function(event){selectDefender(event);});
    });

    //Function called to select defender
    function selectDefender(pDefenderCharacterButton){
        htmlDefenderSection.show();
        htmlFightSection.show();
        if (htmlDefender.contents().length == 0) { //Makes sure only one character is "defender" at a time
            defenderCharacter = pDefenderCharacterButton.target.id; //Gets the enemy's name
            defenderCharacterButton = pDefenderCharacterButton.target; //Get's the enemy's container (button)
            htmlDefender.append(defenderCharacterButton); //Moves the chosen enemy to "Defender" section
            //Change the CSS of the current defender
            assignStats(); //Once both the user and defender have been chosen assignStats
        }
    }

    //Function called once characters have been chosen
    function assignStats() {
        defenderStats = defenderCharacterButton.dataset;
        userStats = userCharacterButton.dataset;
        statsAssigned = true;
    }

    function gameOverLost() {
        if(htmlYourEnemiesSection.contents().children().length > 0) {
            htmlFightSection.hide();
            lostSection.show();
        } else {
            $("#enemies-to-attack").hide();
            htmlFightSection.hide();
            lostSection.show();
        }
    }

    function gameOverWin() {
        $("#enemies-to-attack").hide();
        htmlFightSection.hide();
        wonSection.show();
    }

    //Listen to the attack click
    $("#attack").click(function(){
        //Make sure that stats have been assigned
        if(statsAssigned) {
            var defenderHP = parseInt(defenderStats.hp);
            var defenderCounterAttack = parseInt(defenderStats.counterAttack);
            var userHP = parseInt(userStats.hp);
            var userAttack = parseInt(userStats.attack);
            if(defenderHP > 0){
                if(userHP > 0) {
                    //Do the math for the attack
                    defenderHP -= userAttack;
                    userHP -= defenderCounterAttack;
                    userAttack = (userAttack*.25) + userAttack;
                    //Save the new values to the HTML dataset
                    defenderStats.hp = defenderHP;
                    userStats.hp = userHP;
                    userStats.attack = userAttack;
                } else {
                    gameOverLost();
                }
            } else {
                if(htmlYourEnemiesSection.contents().children().length == 0) { //if there's no more enemies, you won!
                    gameOverWin();
                } else {
                    //Once defender rans out of HP, remove it
                    defenderCharacter = "";
                    defenderCharacterButton = "";
                    htmlDefender.empty();
                    statsAssigned = false;
                }
            }
        } else {
            alert("First choose your players!")
        }
    });

    //Reloads webpage when the user wants to play again
    $(".restart").click(function(){
        location.reload();
    });
});