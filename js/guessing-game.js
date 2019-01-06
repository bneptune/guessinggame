/* eslint-disable complexity */
function generateWinningNumber () {
    return Math.ceil(Math.random() * 100)
}

function shuffle (arr) {
  let remaining = arr.length, t, i 
  while (remaining) {
      i = Math.floor(Math.random() * remaining--)
      t = arr[remaining]
      arr[remaining] = arr[i]
      arr[i] = t
  }
  return arr
  
}

class Game {
    constructor () {
        this.playersGuess = null
        this.pastGuesses = []
        this.winningNumber = generateWinningNumber()
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber)
    }

    isLower() {
        if (this.playersGuess < this.winningNumber) {
            return true
        }
        return false
    }

    playersGuessSubmission(num) {
        this.playersGuess = num
        if (num < 1 || num > 100 || isNaN(num)) {
            return 'That is an invalid guess.'
        }
        return this.checkGuess(num)
    }

    checkGuess(num){
        if (Number(num) === this.winningNumber){
            return 'You Win!';
        }
        else {
            if (this.pastGuesses.includes(num)){
                return 'You have already guessed that number.';
            }
            else if (!(this.pastGuesses.includes(num))){
                this.pastGuesses.push(num);
            }
            if (this.pastGuesses.length === 5){
                return `You Lose. The winning number is ${this.winningNumber}!`;
            }
        }
        //hint messages
        if (this.difference() < 10){
            return 'You\'re burning up!';
        }
        else if (this.difference() < 25){
            return 'You\'re lukewarm.';
        }
        else if (this.difference() < 50){
            return 'You\'re a bit chilly.';
        }
        else if (this.difference() < 100){
            return 'You\'re ice cold!';
        }
    }


    provideHint () {
      let newArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
      return shuffle(newArr)
    }
}

function newGame () {
    return new Game()
}

let instance = new Game()
let submitButton = document.getElementById('submit');
let resetButton = document.getElementById('reset')
let hintButton = document.getElementById('hint')



//Populate hints

hintButton.addEventListener('click', function() {
    
    document.getElementById('alert').innerHTML = `The winning number is either ${instance.provideHint()[0]}, ${instance.provideHint()[1]}, or ${instance.provideHint()[2]}`
})

submitButton.addEventListener('click', function () {

    let inputElement = document.querySelector('input')
    let currentText = inputElement.value


    document.getElementById('alert').innerHTML = instance.playersGuessSubmission(currentText)

    //Clear if lose.

    if (document.getElementById('alert').innerHTML === `You Lose. The winning number is ${instance.winningNumber}!`) {
        newGame()
        instance.pastGuesses = []
        
        document.getElementById('guess1').innerHTML = '?'
        document.getElementById('guess2').innerHTML = '?'
        document.getElementById('guess3').innerHTML = '?'
        document.getElementById('guess4').innerHTML = '?'
        document.getElementById('guess5').innerHTML = '?'
    }

    //Populate guesses

    inputElement.value = ''

    if (!instance.pastGuesses[0]) {
        document.getElementById('guess1').innerHTML = '?'
    }
    else {
        document.getElementById('guess1').innerHTML = instance.pastGuesses[0]
    }

    if (!instance.pastGuesses[1]) {
        document.getElementById('guess2').innerHTML = '?'
    }
    else {
        document.getElementById('guess2').innerHTML = instance.pastGuesses[1]
    }

    if (!instance.pastGuesses[2]) {
        document.getElementById('guess3').innerHTML = '?'
    }
    else {
        document.getElementById('guess3').innerHTML = instance.pastGuesses[2]
    }

    if (!instance.pastGuesses[3]) {
        document.getElementById('guess4').innerHTML = '?'
    }
    else {
        document.getElementById('guess4').innerHTML = instance.pastGuesses[3]
    }

    if (!instance.pastGuesses[4]) {
        document.getElementById('guess5').innerHTML = '?'
    }
    else {
        document.getElementById('guess5').innerHTML = instance.pastGuesses[4]
    }

})

//Play again/reset

resetButton.addEventListener('click', function() {
    newGame()
    instance.pastGuesses = []
    document.getElementById('alert').innerHTML = ''
    document.getElementById('guess1').innerHTML = '?'
    document.getElementById('guess2').innerHTML = '?'
    document.getElementById('guess3').innerHTML = '?'
    document.getElementById('guess4').innerHTML = '?'
    document.getElementById('guess5').innerHTML = '?'
})




