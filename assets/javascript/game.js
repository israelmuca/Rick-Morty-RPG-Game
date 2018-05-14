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

        //function to capture the click event and send it to the selectDEfender function as a parameter
        //Has to be called from an anonymous function to be able to send the click event properly
        htmlYourEnemiesSection.click(function(event){selectDefender(event);});
    });

    //Function called once all characters have been chosen
    function startGame() {
        //use button.dataset.hp to get HP from the character being used
        //Listen to the attack click
        $("#attack").click(function(){
            //if 
        });

    }

    //Function called to select defender
    function selectDefender(pDefenderCharacterButton){
        defenderCharacter = pDefenderCharacterButton.target.id; //Gets the enemy's name
        defenderCharacterButton = pDefenderCharacterButton.target; //Get's the enemy's container (button)

        if (htmlDefender.contents().length == 0) { //Makes sure only one character is "defender" at a time
            htmlDefender.append(defenderCharacterButton); //Moves the chosen enemy to "Defender" section
            //Change the CSS of the current defender
            startGame(); //Once all choosings have been done start the game
        }

    }
} );