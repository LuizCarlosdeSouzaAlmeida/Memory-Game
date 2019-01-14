'use strict'
/*
 *           Global variables declaration:
 */
let cards = $(".card");
const deck = $(".deck");
let openedCards = [];
let matchedCards = [];
let counter = 0;
let time = 0;
let starsCounter = 3;
let timer = setInterval(function () {
  time += 1;
  $(".timer").text("\t" + time +" Seconds");
},1000);

/*
 *           Move counter, timer and star rating functions:
 */
function addMove () {
  counter += 1;
  $(".moves").text(counter);
  if(counter == 15 || counter == 20)
    removeStar();
}

function ressetCoutner () {
  counter = 0;
  $(".moves").text(counter);
}

function ressetTimer () {
  time = 0;
  timer;
}

function removeStar () {
  let stars = $(".fa-star");
  starsCounter = stars.length-1;
  $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
}

function initStars () {
  $(".fa-star-o").toggleClass("fa-star fa-star-o");
}

/*
 *             Game logic functions:
 */
function newGame() {
  let shuffledcards=shuffle(cards);
  for (let card of shuffledcards){
    deck.append(card);
    card.classList.remove("show", "open", "match");
  }
  ressetTimer();
  ressetCoutner();
  initStars();
}

// Starts the game when the page is loaded:
window.onload = newGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let displayCard = function (){
  this.classList.add("open");
  this.classList.add("show");
  openedCards = $(".open.show");
  comparation();
}

function comparation (){
  if(openedCards.length == 2){
    addMove();
    if(openedCards[0].type == openedCards[1].type)
      matched();
    else
      unmatched();
    openedCards.length = 0;
  }
}

function matched (){
  for(let card of openedCards){
    card.classList.remove("open","show")
    card.classList.add("match");
    $(".match").off("click",displayCard);
  }
  matchedCards = $(".match");
  openedCards = [];
  if(matchedCards.length == 16)
    congretilations();
}

function unmatched (){
  for(let card of openedCards){
    card.classList.add("unmatch");
    setTimeout(function () {
      card.classList.remove("show","open","unmatch");
    },500);
  }
}

function restartGame (){
  $(".match").on("click",displayCard);
  newGame();
}

// End game popup:
function congretilations (){
  alert("Score:\n\n" + time + " Seconds\n\n" + counter + " Moves\n\n"
  + starsCounter + " Stars\n\n" + "Press ok to play again.");
  restartGame();
}

// Adding event listeners on cards and restart:
$(".restart").click(restartGame);
cards.on("click",displayCard);
