/*

- Hide characters from showing
- Show all characters in "choose character section"
- Listen to button click, to know which character was choosen
- Put chosen character in your character area
- Put not chosen characters in enemies available to attack area
- Listen to clicks in enemies available to attack area
- Put chosen character in defender area

*/

//Global variables
//Set variables for the user's choices
var userCharacter;
var userCharacterButton;
var defenderCharacter;
var defenderCharacterButton;

//Make sure the document is loaded, then...
$(document).ready(function() {
    //Catch all the DOM elements!
    var htmlChooseCharacterSection = $("#choose-character-section");
    var htmlChooseCharacterButtonHolder = $("#choose-character-button-holder");
    var htmlBattleSection = $("#battle-section");
    var htmlYourCharacterSection = $("#your-character-section");
    var htmlYourEnemiesSection = $("#your-enemies-section");
    var htmlFightSection = $("#fight-section");
    var htmlDefenderSection = $("#defender-section");
    var htmlDefender = $("#defender");
    var htmlCharactersContainer = $("#characters-container");
    var htmlRick = $("#rick");
    var htmlMorty = $("#morty");
    var htmlGrom = $("#grom");
    var htmlMeeseks = $("#meeseeks");

    htmlChooseCharacterButtonHolder.append(htmlCharactersContainer);

    //Listens to the user choosing it's character
    htmlChooseCharacterButtonHolder.click(function(event){
        userCharacter = event.target.id; //Gets the character's name
        userCharacterButton = event.target; //Gets the character's container (button)

        htmlYourCharacterSection.append(userCharacterButton); //Moves the user's choice to "Your Character" section
        //Change the CSS of the user's choice
        htmlYourEnemiesSection.append(htmlCharactersContainer); //Moves the rest of the choices to the "Your Enemies" section
        //Change the CSS of the enemies

        htmlYourEnemiesSection.click(function(event){
            defenderCharacter = event.target.id; //Gets the enemy's name
            defenderCharacterButton = event.target; //Get's the enemy's container (button)

            htmlDefender.append(defenderCharacterButton); //Moves the chosen enemy to "Defender" section
            //Change the CSS of the current defender
            startGame(); //Once all choosings have been done start the game
        });
    });

    function startGame() {

    }
} );