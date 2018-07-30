var Letter = function () {

    this.guess = "";
    this.guessedLetters = [];
    this.updateChar = function (char) {
        if (this.guess.toLowerCase() === char.toLowerCase()) {
            return char;
        } else {
            return "_";
        }
    }
}

module.exports = Letter;