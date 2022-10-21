

//letter key: class names used are:
//  'gaf':guessed and failed
//  'gay':guessed and yellow
//  'gag':guessed and green
var isGameActive = true;
var guesses = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];
var currentGuess = 0;
var currentLetter = 0;
var wordLength = 5;

var isInvalid = false;

var solution = ["A", "B", "C", "D", "E"];
var solutionRef = document.getElementById("solution");

var guessRowRefs = document.getElementsByClassName("guessRow");
var letterRefs = [];
for(var i = 0; i < guessRowRefs.length; i++){
  letterRefs.push(guessRowRefs[i].getElementsByClassName("letter"));
}

var wordList = [];

$.get("/wordle_copy/assets/words.txt",function(returnedData) {
  wordList = returnedData.split("\n");
  solution = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase().split("");
});

function updateGuesses(){
  for(var i = 0; i < guessRowRefs.length; i++){
    for(var j = 0; j < wordLength; j++){
      letterRefs[i][j].textContent = guesses[i][j];
      if(i == currentGuess){
        letterRefs[i][j].style.backgroundColor = "#333";
        if(j == currentLetter){
          letterRefs[i][j].style.backgroundColor = "#666";
        } else if( j <= currentLetter){
          letterRefs[i][j].style.backgroundColor = "#444";
        }
        if(isInvalid){
          letterRefs[i][j].style.color = "#F00";
        } else {
          letterRefs[i][j].style.color = "#000";
        }
      }
    }
  }
}

function addLetter(letter){
  var keyClass = document.getElementById("" + letter).classList;
  if(isGameActive && currentLetter < wordLength){
    guesses[currentGuess][currentLetter++] = letter;
  }
  updateGuesses();
}

function removeLetter(){
  if(isGameActive && currentLetter > 0){
    guesses[currentGuess][--currentLetter] = "";
  }
  isInvalid = false;
  updateGuesses();
}

function guessWord(){
  if(isGameActive && currentLetter >= wordLength){
    var guess = getWordInRow(currentGuess);
    if(wordList.includes(guess.join("").toLowerCase())){
      var result = verify(guess, [...solution]);
      var isAllCorrect = true;
      for(var j = 0; j < wordLength; j++){
        isAllCorrect = isAllCorrect && (result[j]=="#0F0");
        letterRefs[currentGuess][j].style.backgroundColor = result[j];
        letterRefs[currentGuess][j].style.borderColor = result[j];
      }
      if(isAllCorrect){
        isGameActive = false;
        currentGuess = 6;
        isGameWon = true;
        solutionRef.style.visibility = "visible";
        solutionRef.textContent = "YOU WON!";
      } else {
        currentGuess++;
        currentLetter = 0;
      }
      for(var i = 0; i < guess.length; i++){
        updateKey(guess[i], result[i]);
      }
    } else {
      isInvalid = true;
    }
  }
  updateGuesses();
}

function getWordInRow(n){
  var result = [];
  for(var j = 0; j < wordLength; j++){
    result.push(letterRefs[n][j].textContent);
  }
  return result;
}

function verify(guess, answer){
  var result = ["#999", "#999", "#999", "#999", "#999"];
  var correctLetters = [];
  for(var i = 0; i < wordLength; i++){
    if(guess[i] == answer[i]){
      result[i] = "#0F0";
      answer[i] = "";
    }
  }
  for(var i = 0; i < wordLength; i++){
    var n = answer.indexOf(guess[i]);
    if(n != -1 && result[i] == "#999"){
      result[i] = "#FF0";
      answer[n] = "";
    }
  }
  return result;
}

function updateKey(keyId, value){
  var keyRef = document.getElementById(keyId);
  if(value == "#0F0"){
    keyRef.classList.add("gag");
    keyRef.classList.remove("gay");
    keyRef.classList.remove("gaf");
  } else {
    if(value == "#FF0"){
      if(!keyRef.classList.contains("gag")){
        keyRef.classList.add("gay");
        keyRef.classList.remove("gaf");
        keyRef.classList.remove("gag");
      }
    } else {
      if(!keyRef.classList.contains("gay") && !keyRef.classList.contains("gag")){
        keyRef.classList.add("gaf");
        keyRef.classList.remove("gay");
        keyRef.classList.remove("gag");
      }
    }
  }
}

function clearKey(keyId){
  var keyRef = document.getElementById(keyId);
  keyRef.classList.remove("gaf");
  keyRef.classList.remove("gay");
  keyRef.classList.remove("gag");
}


updateGuesses();

var keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

function clearAll(){
  guesses = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];
  for(var i = 0; i < keys.length; i++){
    clearKey(keys[i]);
  }
  isGameActive = true;
  isGameWon = false;
  solutionRef.style.visibility = "hidden";
  currentGuess = 0;
  currentLetter = 0;
  for(var i = 0; i < guessRowRefs.length; i++){
    for(var j = 0; j < wordLength; j++){
      letterRefs[i][j].style.backgroundColor = "#333";
      letterRefs[i][j].style.borderColor = "#777";
    }
  }
  updateGuesses();
}

function resetWord(){
  solution = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase().split("");
  clearAll();
}

function showSolution(){
  solutionRef.textContent = solution.join(" ");
  solutionRef.style.visibility = "visible";
  updateGuesses();
}
