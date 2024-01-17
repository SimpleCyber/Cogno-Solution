const firebaseConfig = {
  apiKey: "AIzaSyCJwPz8g3mSrtoOllv5t1XUjfCOtOfEFkE",
  authDomain: "cogno-solution.firebaseapp.com",
  databaseURL: "https://cogno-solution-default-rtdb.firebaseio.com",
  projectId: "cogno-solution",
  storageBucket: "cogno-solution.appspot.com",
  messagingSenderId: "132297251528",
  appId: "1:132297251528:web:6b4d11b1ffc5db790fe3fd",
  measurementId: "G-GE4E9MSXRH",
};

//! Initialization
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();




firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    document.getElementById("createAcc").style.display = "none"
    document.getElementById("createAcc2").style.display = "none"
    console.log('User is logged in:', user);
  } else {
    // No user is signed in
    document.getElementById("createAcc").style.display = "block"
    document.getElementById("createAcc2").style.display = "block";
    console.log('No user is logged in');
  }
});



(function ($) {
  "use strict";

  // Initiate the wowjs
  new WOW().init();

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 24,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });
})(jQuery);

function openDashBoard() {
  if (localStorage.getItem("userProfession") == "doctor") {
    window.location = "doctorDashBoard.html";
  } else if (localStorage.getItem("userProfession") == "patient") {
    window.location = "./patientDashBoard.html";
  }
  else {
    alert("⚠️ User is Not Logged In")
  }
}

if (localStorage.getItem("userProfession") == "doctor") {

  document.getElementById("activities1").style.display = "none";
  document.getElementById("prevRep1").style.display = "block";
  document.getElementById("handTest").style.display = "none";
  document.getElementById("act0").style.display = "none";
  document.getElementById("doctorVc").style.display = "none";


} else if (localStorage.getItem("userProfession") == "patient") {

  document.getElementById("activities1").style.display = "block";
  document.getElementById("prevRep1").style.display = "block";
  document.getElementById("handTest").style.display = "block";
  document.getElementById("doctorVc").style.display = "block";
  document.getElementById("act0").style.display = "block";
}
else {

  document.getElementById("activities1").style.display = "none";
  document.getElementById("prevRep1").style.display = "none";
  document.getElementById("handTest").style.display = "none";
  document.getElementById("act0").style.display = "none";
}

let gameScore = {
  colorGameScore: localStorage.getItem("game1Score"),
  memoryGameScore: localStorage.getItem("game2Score"),
  shapeGameScore: localStorage.getItem("game3Score"),
};

console.log(gameScore);

if (localStorage.getItem("userProfession") == "patient") {
  appendGameScoresToCurrentUser();
}

function appendGameScoresToCurrentUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const uid = user.uid;
      const gameScore = {
        colorGameScore: localStorage.getItem("game1Score"),
        memoryGameScore: localStorage.getItem("game2Score"),
        shapeGameScore: localStorage.getItem("game3Score"),
      };

      // Get a reference to the database
      var database = firebase.database();

      // Get a reference to the user's node in the database
      var userGameScoresRef = database.ref(
        "/users/patient/" + uid + "/gameScores"
      );

      // Update the user's game scores
      userGameScoresRef
        .update(gameScore)
        .then(() => {
          console.log("Game scores appended successfully!");
        })
        .catch((error) => {
          console.error("Failed to append game scores: ", error);
        });
    } else {
      console.log("User is not signed in.");
    }
  });
}

if (localStorage.getItem("userProfession") == "patient") {
  // Assuming Firebase has already been initialized elsewhere in your code
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in, retrieve the user data from the database
      var uid = user.uid;
      var userRef = firebase.database().ref("/users/patient/" + uid);

      // Now get the data from the userRef
      userRef.once("value", function (snapshot) {
        // The snapshot contains the data. You can display it or log it to the console
        var userData = snapshot.val();
        // console.log(userData);

        localStorage.setItem("ImpCurrData", JSON.stringify(userData));
        // Add more fields as necessary
      });
    } else {
      // No user is signed in
      console.log("No user is currently signed in.");
    }
  });
}

if (localStorage.getItem("userProfession") == "doctor") {

  // Assuming Firebase has already been initialized elsewhere in your code
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in, retrieve the user data from the database

      var uid = user.uid;
      var userRef = firebase.database().ref("/users/doctor/" + uid);

      // Now get the data from the userRef
      userRef.once("value", function (snapshot) {
        // The snapshot contains the data. You can display it or log it to the console
        var userData = snapshot.val();
        // console.log(userData);

        localStorage.setItem("ImpCurrData", JSON.stringify(userData));
        // Add more fields as necessary
      });
    } else {
      // No user is signed in
      console.log("No user is currently signed in.");
    }
  });
}
function openChatBot() {
  window.location = "chatbot.html";
}

if (localStorage.getItem("userProfession") == "doctor") {
  // Reference to the /users/patient path
  const patientRef = firebase.database().ref('/users/patient');

  // Retrieve data
  patientRef.once('value')
    .then(snapshot => {
      // Convert the snapshot to JSON
      const jsonData = snapshot.val();

      localStorage.setItem("allPatientData", JSON.stringify(jsonData));

      // Log the JSON data
      // console.log(JSON.stringify(jsonData, null, 3));
    })
    .catch(error => {
      console.error('Error retrieving data:', error);
    });
}

// Assuming you have already initialized Firebase with your configuration
// firebase.initializeApp(config);

// Check if the browser supports the SpeechSynthesis API

function speak() {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance();

    // Set the text you want the computer to speak
    utterance.text = 'Cogno Solutions is a platform focused on making learning fun and engaging for children with cognitive disabilities.\n' +
      'It offers a variety of educational games designed to enhance cognitive skills such as memory, problem-solving, and attention span.\n' +
      'These games are tailored to each child\'s unique needs and increase in difficulty to track and support their progress.\n' +
      'Additionally, Cogno Solutions provides a secure, cloud-based storage system for managing and accessing important documents, including medical records and therapy notes, ensuring confidentiality and integrity of the information.';

    //   let voices = window.speechSynthesis.getVoices();
    // utterance.voice = voices[1]; // Example: Select the third voice in the list

    // Adjust pitch and rate (optional)

    utterance.pitch = 0.75;
    utterance.rate = 0.8;
    // Speak the text
    synth.speak(utterance);
  } else {
    console.error('SpeechSynthesis API not supported in this browser');
  }


}
