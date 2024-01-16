const firebaseConfig = {
    apiKey: "AIzaSyCJwPz8g3mSrtoOllv5t1XUjfCOtOfEFkE",
    authDomain: "cogno-solution.firebaseapp.com",
    databaseURL: "https://cogno-solution-default-rtdb.firebaseio.com",
    projectId: "cogno-solution",
    storageBucket: "cogno-solution.appspot.com",
    messagingSenderId: "132297251528",
    appId: "1:132297251528:web:6b4d11b1ffc5db790fe3fd",
    measurementId: "G-GE4E9MSXRH"
  };


//! Initialization
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const resultElement = document.getElementById("result");
const chartsContainer = document.getElementById("charts-container");


    let points = 0;

    function eqScore() {
        points++;
        document.getElementById('points').innerHTML = points;
        if(Number(localStorage.getItem("test1Score")) < points ){
            localStorage.setItem("test1Score", points);
        }
    }
    function iqScore() {
        points++;
        document.getElementById('points').innerHTML = points;
        if(Number(localStorage.getItem("test2Score")) < points ){
            localStorage.setItem("test2Score", points);
        }
    }
    function sqScore() {
        points++;
        document.getElementById('points').innerHTML = points;
        if(Number(localStorage.getItem("test3Score")) < points ){
            localStorage.setItem("test3Score", points);
        }
    }


    function displayTotalScore() {
    const gameOverScore = document.getElementById('game-over-score');
    if (gameOverScore) {
        // gameOverScore.textContent = 'Total Score: ' + points;
        saveResult(points);
        displayCharts();
    }
}
     
function saveResult(points) {
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    const currentDate = new Date();
    const resultRecord = {
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
        points:points,
    };
    results.push(resultRecord);
    localStorage.setItem("quizResults", JSON.stringify(results));
}

function displayCharts() {
    chartsContainer.innerHTML = "";

    // Display pie chart for the current test
    const currentPieCanvas = createChartCanvas("pie-chart");
    chartsContainer.appendChild(currentPieCanvas);
    displayPieChart(currentPieCanvas, points);

    // Display bar graph for the progress of the last 5 tests
    const barCanvas = createChartCanvas("bar-graph");
    chartsContainer.appendChild(barCanvas);
    displayBarGraph(barCanvas);
}

function createChartCanvas(className) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("chart", className);
    return canvas;
}

function displayPieChart(canvas, currentScore) {
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Correct", "Incorrect"],
            datasets: [{
                data: [currentScore, 5 - currentScore],
                backgroundColor: ["green", "red"]
            }]
        }
    });
}



function displayBarGraph(canvas) {
    const ctx = canvas.getContext("2d");
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    const progressData = results.slice(-5); // Last 5 results

    const progressLabels = progressData.map(entry => entry.date + " " + entry.time);
    const progressScores = progressData.map(entry => entry.points);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: progressLabels,
            datasets: [{
                label: "Progress",
                data: progressScores,
                backgroundColor: "blue"
            }]
        }
    });
}
