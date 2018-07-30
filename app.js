var Word = require("./word.js");
var inquirer = require("inquirer");
var opn = require('opn');

var word = new Word();
var guessLeft = 5;

var game = function () {
    console.log("\n\n **********************************************");
    console.log(" ***** Welcome to Hangman on CLI. by Sean *****");
    console.log(" **********************************************\n");
    console.log("    Guess the artist of the songs: ");
    console.log("    Ready? Let's start the game!!!\n");
    /** show me the power */
    // console.log("( Answer: ",word.randSong, "by", word.randArtist, ")\n");
    guessTheAnswer();
}

var guessTheAnswer = function () {
    console.log(word.randSong, "by", word.updateWord(), "( remaining guess:", guessLeft, " )\n");
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Do you know the singer?:",
            choices: ["Yes, Too EZ.", "No clue."]
          }
    ]).then(function (response) {
        if (response.option === "Yes, Too EZ.") {
            checkTheAnswer();
        } else {
            // test
            if (guessLeft === 1) {
                console.log("\n    Give it a shot, you have only one chance anyways.\n\n");
                checkTheAnswer();
            } else {
                console.log("    It's OK, you have more guess(es) left.\n");
                console.log(word.randSong, "by", word.updateWord(), "( remaining guess:", guessLeft, " )\n");
                dontKnowTheAnswer();
            }
        }
    });
}

var checkTheAnswer = function() {
    inquirer.prompt([
        { name: "myAnswer", message: "The answer is: " }
    ]).then(function (response) {
        //done
        if (response.myAnswer.toLowerCase() === word.randArtist.toLowerCase()) {
            console.log("\n\n    YOU GOT IT!!!\n\n");
            checkMyPortfolio();
        } else {
            console.log("\n    Wrong..\n");
            guessLeft--;
            if (guessLeft === 0) {
                console.log("    You spent all your chances..\n\n");
                checkMyPortfolio();
            } else {
                guessTheAnswer();
            }
        }
    });
}

var dontKnowTheAnswer = function () {
    if (guessLeft > 0) {
        inquirer.prompt([
            { name: "guess", message: "Guess the Artist\nType in one letter: " }
        ]).then(function (response) {

            if (response.guess.length !== 1) {
                console.log("    You can guess only one letter at a time :(\n");
                dontKnowTheAnswer();
            } else if (word.letter.guessedLetters.includes(response.guess)) {
                console.log("    you already guessed:",response.guess,"\n");
                dontKnowTheAnswer();                
            } else {
                word.letter.guess = response.guess;
                word.letter.guessedLetters.push(response.guess);
                guessLeft--;
                guessTheAnswer();
            }
        });
    } else {
        checkMyPortfolio();
    }
}

var checkMyPortfolio = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "doThis",
            message: "Did you enjoy the game? \n  Play Again or Check out my other portfolio:\n",
            choices: ["Play Again", "Check out Sean's Portfolio!", "Not interested.."]
          }
    ]).then(function (response) {
        switch (response.doThis) {
            case "Play Again":
                guessLeft = 5;
                word = new Word();
                game();
                break;
            case "Check out Sean's Portfolio!":
                opn('https://www.seankim.life');
                break;
            case "Not interested..":
                console.log("\n    Thank you for playing!\n\n")
                break;
        }
    });
}

game();