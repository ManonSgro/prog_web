//console.log("heellls");
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//const divRWord = document.querySelector('#randomWord');
const divDef = document.querySelector('#definition');
const submitButton = document.querySelector('#submitButton');
const inputText = document.querySelector('#inputText');

const myModalLabel = document.querySelector('#myModalLabel');
const myModalHeading = document.querySelector('#myModalHeading');
const myModalContent = document.querySelector('#myModalContent');

submitButton.disabled = true;
                
var randomWord = "";
var randomDef = "";
var synonymes = [];
var found = false;
    
function getRand(array) {
    var rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

var firstProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[0]];
};

function getRandomWord(cat){
    
    /* Get word */
    
    fetch("https://api.datamuse.com/words?sp="+getRand(letters)+"*")
      .then(response => response.json())
      .then(data => {
        randomWord = getRand(data);
        //divRWord.innerHTML = rWord.word;
        
        /* Get synonymes */
        
        /*fetch("https://api.datamuse.com/words?ml="+randomWord.word+"&max=50")
          .then(response => response.json())
          .then(data => {
            synonymes = data;
      });*/
        
            
        /* Get definition */

        fetch("https://googledictionaryapi.eu-gb.mybluemix.net/?define="+randomWord.word+"&lang=en")
          .then(response => response.json())
          .then(data => {
            randomDef = getRand(firstProperty(data[0].meaning)).definition;
            if(getRand(firstProperty(data[0].meaning)).synonyms!=null){
                synonymes = getRand(firstProperty(data[0].meaning)).synonyms;
            }else{
                synonymes = [""];
            }
            
            //Show def
            divDef.innerHTML = randomDef;
          });

      });

    //Active submitButton
    submitButton.disabled = false;
}

function changeText(element, text){
    element.innerHTML = text;
}

function checkWord(e){
    e.preventDefault();
    console.log("click");
    var submitWord = inputText.value;
        found = false;
    synonymes.forEach(function(el) {
        console.log(el);
      if(el == submitWord){
            found = true;
        }
    });
    
    if(found || submitWord==randomWord.word){
        console.log("success");
        submitButton.disabled = true;
        changeText(divDef, "Loading...");
        changeText(myModalLabel, "Congratulation !");
        changeText(myModalHeading, "You WIN !");
        changeText(myModalContent, "<strong>You knew how to find the right word</strong><br>Was it a fluke?");
    }else{
        submitButton.disabled = true;
        changeText(divDef, "Loading...");
        changeText(myModalLabel, "Oooopps...");
        changeText(myModalHeading, "You LOSE...");
        changeText(myModalContent, "<strong>The right word was '"+randomWord.word+"'.</strong><br>Try again !");
        console.log("Try again !");
    }
    inputText.value = "";
    getRandomWord();
}

getRandomWord();
submitButton.addEventListener("click", checkWord);
