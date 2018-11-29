/** UTILS **/
function getRandom(array){
    var random = Math.floor(Math.random()*array.length);
    return array[random];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function clearText(text, words){
    /* Clear "word" (not working) */
    newtext = "";
    for(x=0; x<words.length; x++){
        console.log("searching for "+words[x]);
        newtext = text.split(words[x]);
        newtext = newtext.join("this word");
    }
    /* Clear [] */
    newtext = text.split("[");
    newtext = newtext.join("<span class='bold'>");
    newtext = newtext.split("]");
    newtext = newtext.join("</span>");

    return newtext;
}

//Doc : https://github.com/zdict/zdict/wiki/Urban-dictionary-API-documentation

function newWord(){
    words = [];
    definitions = [];
    $.getJSON("http://api.urbandictionary.com/v0/random", function(data){
        //console.log(data.list[0]);
        rand = getRandom(data.list);
        definitions[0] = rand.definition;
        words[0] = rand.word;
    })
    $.getJSON("http://api.urbandictionary.com/v0/random", function(data){
        //console.log(data.list[0]);
        rand = getRandom(data.list);
        definitions[1] = rand.definition;
        words[1] = rand.word;
    })
    $.getJSON("http://api.urbandictionary.com/v0/random", function(data){
        //console.log(data.list[0]);
        rand = getRandom(data.list);
        definitions[2] = rand.definition;
        words[2] = rand.word;
    })
}

function printWord(){
    definitions_temp = shuffle(definitions);
    $("#word").text(words[0]);
    for(i=0;i<definitions.length;i++){
        console.log(definitions_temp[i]);
        definition = clearText(definitions_temp[i], words);
        $(".answer:nth-child("+(i+1)+")").html(definition);
    }
}

function start(){
    newWord();
    printWord();
}

$(document).ready(function(){

    newWord();
    printWord();
})