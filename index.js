// THE SETUP
// enumerate each button
const buttons = {
    GREEN: "green", 
    RED: "red",
    YELLOW: "yellow",
    BLUE: "blue",
};

function getEnum(number) {
    let toReturn;

    switch(number) {
        case 0:
            toReturn = buttons.GREEN;
            break;

        case 1:
            toReturn = buttons.RED;
            break;
            
        case 2:
            toReturn = buttons.YELLOW;
            break;

        case 3:
            toReturn = buttons.BLUE;
            break;
    }

    return toReturn;
}

function generateButton() {
    return getEnum(Math.floor(Math.random() * 4));
}

function playWrongAudio() {
    let sound = new Audio('sounds/wrong.mp3');
    sound.play();
}

function playCorrectAudio(pressedButton) {
    let sound = new Audio('sounds' + '/' + pressedButton + '.mp3');
    sound.play();
}

function pressButton(pressedButton) {
    // add the pressed class
    $("#" + pressedButton).addClass("pressed");

    // remove the pressed class after timeout
    setTimeout(() => {
        $("#" + pressedButton).removeClass("pressed");
    }, 100);

}

function fadeButton(generatedButton) {
    $('#' + generatedButton).fadeOut(100).fadeIn(100);
}

function playLastButton(generatedButton) {
    setTimeout(() => {
        fadeButton(generatedButton);
        playCorrectAudio(generatedButton);
        $('#level-title').text('Level ' + arrayOfButtons.length);
    }, 1000);
}

function setUpNewButton(arrayOfButtons) {
    arrayOfButtons.push(generateButton());
    playLastButton(arrayOfButtons[arrayOfButtons.length - 1]);
}

// THE GAME
// set up the necessary variables 
var index = 0;
var arrayOfButtons = [];
var gameStarted = false;

// apply 
$(".btn").on("click", (event) => {
    let pressedButton = event.target.id;

    pressButton(pressedButton);

    // if the arrayOfButtons is empty, return
    if (arrayOfButtons.length === 0) {
        playWrongAudio();
    }

    // if pressed button == next item in arrayOfButtons, then continue, else game over
    if (pressedButton === arrayOfButtons[index]) {

        // play correct audio
        playCorrectAudio(pressedButton);

        // if index is max, add a new number and set index to zero
        if(index + 1 === arrayOfButtons.length) {
            index = 0;
            setUpNewButton(arrayOfButtons);
            return;
        }

        // move to the next item
        index++;
        return;

    }

    // game over
    $('#level-title').text('Game Over! Press A key to RESTART!');
    playWrongAudio();
    $('body').addClass('body-red');
    setTimeout(() => {
        $('body').removeClass('body-red');
    }, 50);
    arrayOfButtons = [];
    index = 0;
    gameStarted = false;
});

// start a new game 
$(document).on('keydown', () => {
    if (gameStarted) {
        return;
    }

    arrayOfButtons = [];
    setUpNewButton(arrayOfButtons);
    $('#level-title').text('Level ' + arrayOfButtons.length);
    gameStarted = true;

});
