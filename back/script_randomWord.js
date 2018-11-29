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
    $.getJSON("https://api.datamuse.com/words?sp="+getRand(letters)+"*", function(data){
        console.log("Datamuse :");
        randomWord = getRand(data);
        console.log(randomWord);

        $("#randomWord").html(randomWord.word);

        var call ="https://googledictionaryapi.eu-gb.mybluemix.net/?define="+randomWord.word+"&lang=en";
        console.log(call);
        $.getJSON(call, function(data){
            console.log(data);
            aDefinition = firstProperty(data.meaning);
            $("#definition").html(getRand(aDefinition).definition);
            randomDefinition = getRand(aDefinition).definition;
        })

    });
    
    return [randomWord, randomDefinition];
}

getRandomWord();

