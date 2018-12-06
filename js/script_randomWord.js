var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
function getRand(tab) {
    var rand = tab[Math.floor(Math.random() * tab.length)];
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
    var randomWord = null;
    var randomDefinition = null;
    const divRWord = document.querySelector('#randomWord');
    const divDef = document.querySelector('#definition');

    fetch("https://api.datamuse.com/words?sp="+getRand(letters)+"*")
      .then(response => response.json())
      .then(data => {
        const rWord = getRand(data);
        divRWord.innerHTML = rWord.word;

        fetch("https://googledictionaryapi.eu-gb.mybluemix.net/?define="+rWord.word+"&lang=en")
          .then(response => response.json())
          .then(data => {
            aDefinition = firstProperty(data.meaning);
            divDef.innerHTML = getRand(aDefinition).definition;
          });
      });
}

getRandomWord();
