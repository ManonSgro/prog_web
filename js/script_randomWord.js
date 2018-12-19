const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const divDef = document.querySelector('#definition');
const submitButton = document.querySelector('#submitButton');
const myForm = document.querySelector('#myForm');
const feedback = document.querySelector('.invalid-feedback');
const inputText = document.querySelector('#inputText');

const myModalImage = document.querySelector("#myModalImage");
const myModalLabel = document.querySelector('#myModalLabel');
const myModalHeading = document.querySelector('#myModalHeading');
const myModalContent = document.querySelector('#myModalContent');

submitButton.disabled = true;
                
var randomWord = "";
var randomDef = "";
var synonymes = [""];
var found = false;
    
function getRand(array) {
    var rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

function firstProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[0]];
};

function getRandomWord(){
    
    /* Get word */
    
    fetch("https://api.datamuse.com/words?sp="+getRand(letters)+"*")
      .then(response => response.json())
      .then(data => {
        randomWord = getRand(data);
        
            
        /* Get definition */

        fetch("https://googledictionaryapi.eu-gb.mybluemix.net/?define="+randomWord.word+"&lang=en")
          .then(response => response.json())
          .then(data => {
            randomDef = firstProperty(data[0].meaning)[0].definition;
            
           /* Get synonymes */
            if(firstProperty(data[0].meaning)[0].synonyms!=undefined){
                synonymes = firstProperty(data[0].meaning)[0].synonyms;
            }else{
                synonymes = [""];
            }
            
            //Show def
            divDef.innerHTML = randomDef;
            
            //Active submitButton
            submitButton.disabled = false;
          });

      });

}

function changeText(element, text){
    element.innerHTML = text;
}

function changeImage(element, url){
    element.src = url;
}

function changeModal(situation){
    switch(situation){
        case "error":
            changeImage(myModalImage,"images/error.jpg");
            changeText(myModalLabel, "Error !");
            changeText(myModalHeading, "Please");
            changeText(myModalContent, "enter the word corresponding the definition...");
            break;
        case "win":
            changeImage(myModalImage,"images/win.jpg");
            changeText(myModalLabel, "Congratulation !");
            changeText(myModalHeading, "You WIN !");
            changeText(myModalContent, "<strong>You knew how to find the right word</strong><br>Was it a fluke?");
            break;
        case "lose":
            changeImage(myModalImage,"images/lose.jpg");
            changeText(myModalLabel, "Oooopps...");
            changeText(myModalHeading, "You LOSE...");
            changeText(myModalContent, "<strong>The right word was '"+randomWord.word+"'.</strong><br>Try again !");
            break;
    }
    
}

function checkWord(e){
    e.preventDefault();
    
    var submitWord = inputText.value;
    
    if(submitWord=="" || randomDef==""){
        //Error
        changeModal("error");
    }else{  
        
        //Search for synonymes
        found = false;
        synonymes.forEach(function(el) {
          if(el == submitWord){
                found = true;
            }
        });
        
        //Check if word is valid
        if(found || submitWord==randomWord.word){
            changeModal("win");
        }else{
            changeModal("lose");
        }
        
        //Get new word
        changeText(divDef, "Loading...");
        inputText.value = "";
        randomDef = "";
        getRandomWord();
    }
    
}

//First call
getRandomWord();
submitButton.addEventListener('click', checkWord);
