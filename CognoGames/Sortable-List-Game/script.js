const draggable_list = document.getElementById('draggable-list'); //ul
const check = document.getElementById('check'); //Check button

//Source: https://www.youtube.com/@DataIsBeautifulOfficial/videos
const topics = [
  {
    list: ['1', '67', '99', '100', '102'],
    header: 'Sort The Given Numbers in Ascending Order',
    img: 'url("img/hacker.jpg")',
  },
  {
    list: ['A', 'D', 'J', 'K', 'R'],
    header: 'Arrange the Following Alphabets in Order',
    img: 'url("img/games.jpg")',
  },
  {
    list: [
      'Triangle',
      'Square',
      'Pentagon',
      'Hexagon',
      'Heptagon',
    ],
    header: 'Arrange The Given Shapes in Ascending order on the Basis of No. of Sides',
    img: 'url("img/money.jpg")',
  },
  {
    list: ['2004', '2010', '2015', '2017', '2023'],
    header: 'Arrange the following Years in Upcoming Order',
    img: 'url("img/web.jpg")',
  },
];

// Store list items
let listItems = [];
let chosenQuiz = Math.floor(Math.random() * topics.length);
let dragStartIndex;
let tries = 0;

createList();

//Insert List Items into DOM
function createList() {
  //Capturing the header
  const header = document.getElementById('title');

  //Changing the header and body background depending on the quiz
  header.innerHTML = topics[chosenQuiz].header;
  // document.body.style.backgroundImage = topics[chosenQuiz].img; //Decided to stick with original design

  /*Clears any previous content within the HTML element with the ID "draggable-list." 
  This is done to prepare for the creation of a new list. */
  draggable_list.innerHTML = '';
  listItems = []; //stores the new list items

  // console.log(topics[chosenQuiz], topics, chosenQuiz); //Check

  [...topics[chosenQuiz].list]
    //Create a new array object with a value and a random number. The random number is used to shuffle the array.
    .map((a) => ({ value: a, sort: Math.random() }))
    //Randomize the order of the array
    .sort((a, b) => a.sort - b.sort)
    //used to extract the value from the array
    .map((a) => a.value)
    .forEach((item, index) => {
      //iterates through the shuffled items and creates a list item (<li>) for each item.
      const listItem = document.createElement('li'); //Creating li

      //store original index. track the order of the list items. Use for drag and drop functionality
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <div class="container-li">
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="item-name">${item}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      </div>
      `;
      listItems.push(listItem); //Pushing the li item to the listItems array
      draggable_list.appendChild(listItem); //Appending the li item to the ul
    });

  addEventListeners();
}

//Capture the starting index
function dragStart() {
  console.log('Event: ', 'dragstart'); //check
  dragStartIndex = +this.closest('li').getAttribute('data-index'); //Getting the number index of the li
  // console.log(dragStartIndex); //Check
}

//check layer we are in
//https://www.geeksforgeeks.org/how-to-dragleave-fired-when-hovering-a-child-element-in-html-5/
var counter = 0;

function dragLeave() {
  console.log('Event: ', 'dragleave'); //check
  //we leave the deeper layer
  counter--;
  console.log(counter);
  //if we are in the outermost layer
  if (counter == 0) {
    this.classList.remove('over'); //Removes CSS background color
  }
}
function dragOver(e) {
  console.log('Event: ', 'dragover'); //check
  e.preventDefault();
}

function dragEnter(e) {
  console.log('Event: ', 'dragenter'); //check
  console.log(counter);
  //we enter deeper layer
  counter++;

  this.classList.add('over');
  e.preventDefault();
}

//When an item is dropped, the dragDrop function is called to swap the positions of the dragged item and the target item
function dragDrop() {
  //console.log("Event: ", "drop"); //check
  const dragEndIndex = +this.getAttribute('data-index'); //this refers to the current list item element
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
  counter = 0;
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable'); //Draggable class we created inside createList()
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart); //Capture the starting index
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragleave', dragLeave);
  });
}

//swap the positions of two items in the listItems array
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].querySelector('.container-li').appendChild(itemTwo);
  listItems[toIndex].querySelector('.container-li').appendChild(itemOne);
}

function nextQuiz() {
  // Remove the current quiz from the array
  topics.splice(chosenQuiz, 1);
  if (topics.length > 0) {
    // console.log("next quiz"); //Check
    // If there are more quizzes, select a random index for the next quiz
    chosenQuiz = Math.floor(Math.random() * topics.length);
    tries = 0;
    createList();
  } else {
    // If there are no more quizzes, display a message
    alert('You have solved all the quizzes! Congrats! Now closing the tab...');
    setTimeout(() => {
      window.close(); // Close the current tab (window)
    }, 100);
  }
}

// Check the order of list items
function checkOrder() {
  let correct = 0;
  listItems.forEach((listItem, index) => {
    const itemName = listItem.querySelector('.draggable').innerText.trim();

    if (itemName !== topics[chosenQuiz].list[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
      correct++;
    }
  });

  tries++;

  if (correct === 5) {
    setTimeout(() => {
      alert(`You got it right in ${tries} tries!`);
      nextQuiz();
    }, 100);
  }
}

check.addEventListener('click', checkOrder);
