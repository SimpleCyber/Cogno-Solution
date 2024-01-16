
const cardIcons = ['fa-diamond',
					'fa-paper-plane-o',
					'fa-anchor',
					'fa-bolt',
					'fa-cube',
					'fa-anchor',
					'fa-leaf',
					'fa-bicycle',
					'fa-diamond',
					'fa-bomb',
					'fa-leaf',
					'fa-bomb',
					'fa-bolt',
					'fa-bicycle',
					'fa-paper-plane-o',
					'fa-cube'];


const deck = document.querySelector('.deck');

let flippedCards = [];

/*
 * function that starts game up!
 */
function startGame(){
	shuffle(cardIcons); //this function shuffles the card icons

	//for loop to add individual cards to the game deck per iteration
	for (let i = 0; i < cardIcons.length; i++) {
		const card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class='fa ${cardIcons[i]}'></i>`;
		deck.append(card);

		//makes cards interactive
		attachClick(card);
	}

}

//variable used to check whether game has started or not, used to start timer.
let firstFlip = true;


/*
 * CARDS EVENTLISTENERS
 */
function attachClick(card){
	card.addEventListener('click', function(){
		if(firstFlip){
			startTimer();
			firstFlip = false;
		}

		//enters this condition when the second card is flipped
		if(flippedCards.length === 1){
			flippedCards.push(this);
			card.classList.add('open','show','disable');
			compareCards(flippedCards[0],flippedCards[1]);
			incrementMove();
			//console.log('second click');
		}else{
			card.classList.add('open','show','disable');
			flippedCards.push(card);
			//console.log('first click');
		}

	});
}

/*
 * MOVE COUNT
 */

let moveCount = 0;
const moves = document.querySelector('.moves');
moves.innerText = moveCount;

function incrementMove(){
	moveCount++;
	moves.innerText = moveCount;
	rate();
}


/*
 * STAR RATING based on move count
 */

const stars = document.querySelector('.stars');

function rate(){
	if(moveCount === 10){
		console.log('remove star');
		//debugger;
		//removes star, first node is space, second node is the star icon
		stars.removeChild(stars.childNodes[0]);
		stars.removeChild(stars.childNodes[0]);
	}
	if(moveCount === 25){
		stars.removeChild(stars.childNodes[0]);
		stars.removeChild(stars.childNodes[0]);
	}
	if(moveCount === 40){
		stars.removeChild(stars.childNodes[0]);
		stars.removeChild(stars.childNodes[0]);
	}
}


/*
 * CARD COMPARISONS
 */

const matchedCards = [];

function compareCards(card1,card2){
	if(card1.innerHTML === card2.innerHTML){//if cards match, enter this condition

		//used an animation class here from https://github.com/daneden/animate.css i.e 'rubberBand'
		card1.classList.add('match','animated','rubberBand');
		card2.classList.add('match','animated','rubberBand');
		matchedCards.push(card1,card2);

		checkWin();
		flippedCards = []; //flushes flippedCards array
	}else{
		setTimeout(function() {
			card1.classList.remove('open','show','disable');
			card2.classList.remove('open','show','disable');
		}, 800);
		flippedCards = [];
	}
}

//when the length of matched cards array equals that of the original card icons
function checkWin(){
	if(matchedCards.length === cardIcons.length){
		stopTimer();
		toggleModal();
	}
}


/*
 * TIMER
 */

let totalSeconds = 0;
const timer = document.querySelector('.timer');
timer.innerText = '00:00:00';

function startTimer(){
	tictoc = setInterval(function(){
		++totalSeconds;
		let h = Math.floor(totalSeconds / 3600);
		let m = Math.floor((totalSeconds - h * 3600)/60);
		let s = totalSeconds - (h * 3600 + m * 60);
		if(s<10){
			s = `0${s}`;
		}
		if(m<10){
			m = `0${m}`;
		}
		if(h<10){
			h = `0${h}`;
		}
		timer.innerText = `${h}:${m}:${s}`;
	},1000);
}

function stopTimer(){
	winTime.innerText = timer.innerText;
	winStars.innerText = stars.childElementCount;
	clearInterval(tictoc);
}


/*
 * MODAL POP-UP
 */

const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const playButton = document.querySelector('#replay');
const winStars = document.querySelector('#winStars');
const winTime = document.querySelector('#winTime');

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
playButton.addEventListener('click', reset);


/*
 * RESET GAME
 */
const resetBtn = document.querySelector('.restart');

resetBtn.addEventListener('click', reset);

function reset(){
		location.reload(true);
}


/*
 * SHUFFLE FUNCTION
 */

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


/********************************************************************************************
 ******************************		<< GAME STARTS HERE >> 	*********************************
 ********************************************************************************************/

startGame();

