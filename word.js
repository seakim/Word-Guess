var Letter = require("./letter.js");
var songList = require("./songs.js");

var Word = function () {
    this.letter = new Letter();

    this.rand = Math.floor(Math.random() * songList.length);
    this.randArtist = songList[this.rand].split(" - ")[0];
    this.randSong = songList[this.rand].split(" - ")[1];
    this.answer = [];

    this.updateWord = function () {
        for (var i = 0; i < this.randArtist.length; i++) {
            if (this.randArtist[i] === " ") {
                this.answer[i] = " ";
            } else if (this.answer[i] === "_" || this.answer[i] === undefined) {
                this.answer[i] = this.letter.updateChar(this.randArtist[i]);
            }
        }
        return this.answer.join(" ");
    }
}

module.exports = Word;