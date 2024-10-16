let randomNumber;
let guesses = [];
let remGus = 0;
let maxGuesses;
let rangeMax;
let isGameActive = false;

let winAudio = new Audio("winning.mp3")
let loseAudio = new Audio("loosing.mp3")

// set difficulty level
function setDiffulty(level) {
    const submit = document.getElementsByClassName("submit")[0]; 
    const message = document.getElementsByClassName("message")[0]; 
    const guessinput = document.getElementById("guessfield");

    if (level === "easy") {
        rangeMax = 10;
        maxGuesses = 6;
        message.textContent = "Easy Mode: Guess a number between 1 and 10.";
    } else if (level === "medium") {
        rangeMax = 15;
        maxGuesses = 4;
        message.textContent = "Medium Mode: Guess a number between 1 and 15.";
    } else if (level === "hard") {
        rangeMax = 20;
        maxGuesses = 3;
        message.textContent = "Hard Mode: Guess a number between 1 and 20.";
    }

    guessinput.min = 1;
    guessinput.max = rangeMax;
    randomNumber = Math.floor(Math.random() * rangeMax) + 1;
    guesses = [];
    remGus = 0;
    isGameActive = true;

    submit.disabled = false;
    guessinput.disabled = false;
    guessinput.value = "";
    document.getElementsByClassName("prevnum")[0].textContent = " ";
    document.getElementsByClassName("remGus")[0].textContent = " ";


}

function validNum(e) {
    const guessinput = document.getElementById("guessfield");

    if (e.key < '0' || e.key > "9") {
        e.preventDefault();
    }
    const currentValue = parseInt(guessinput.value + e.key);

    if (currentValue > rangeMax) {
        e.preventDefault();
    }
}

function checkGuess() {
    if (!isGameActive) { return; }

    const message = document.getElementsByClassName("message")[0]; 
    const guessinput = document.getElementById("guessfield");
    const previousNumber = document.getElementsByClassName("prevnum")[0]; 
    const remaningGuess = document.getElementsByClassName("remGus")[0]; 

    const userGuess = parseInt(guessinput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > rangeMax) {
        message.textContent = `Please enter a number between 1 and ${rangeMax}`;
        return;
    }
    
    guesses.push(userGuess);
    remGus++;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the correct number: ${userGuess}`;
        isGameActive = false;
        winAudio.play()
        guessinput.disabled = true;
        document.getElementsByClassName("submit")[0].disabled = true;
    } else if (remGus >= maxGuesses) {
        message.textContent = `Out of guesses! The correct answer was ${randomNumber}. Try again!`;
        isGameActive = false;
        loseAudio.play()
        guessinput.disabled = true;
        document.getElementsByClassName("submit")[0].disabled = true;
    } else if (userGuess > randomNumber) {
        message.textContent = "Your guess is too high.";
    } else {
        message.textContent = "Your guess is too low.";
    }

    // previousNumber.textContent = `Guessed numbers: ${guesses.join(',')}`;
    remaningGuess.textContent = `Remaining guesses: ${maxGuesses - remGus}`;

    // guessinput.value = '';
}

document.getElementById("guessfield").addEventListener('keypress', validNum);
document.getElementsByClassName("submit")[0].addEventListener('click', checkGuess);
