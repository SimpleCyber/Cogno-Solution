
let patientData = JSON.parse(localStorage.getItem("ImpCurrData"));


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
  

userName.innerHTML = patientData.username
userName.innerHTML = patientData.username
userEmail.innerHTML = patientData.email
genderUser.innerHTML = patientData.gender
phoneNo.innerHTML = patientData.moblileno
userAge.innerHTML = patientData.age;
userAdd.innerHTML = patientData.address;

function logoutPatient(){
    firebase.auth().signOut()
  .then(() => {
    // Sign-out successful
    alert("Logout successful!");
    localStorage.removeItem("allPatientData");
    
    localStorage.removeItem("userProfession");
    localStorage.removeItem("ImpCurrData");

    // You can redirect the user to another page or perform other actions after logout
    
  })

  .then(() => {
    // Sign-out successful
    
    window.location = "index.html"
    // You can redirect the user to another page or perform other actions after logout
    
  })
  .catch((error) => {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error (${errorCode}): ${errorMessage}`);
  });
}


// Update progress bars
document.getElementById("game1").style.width = `${patientData.gameScores.colorGameScore}%`;
document.getElementById("game2").style.width = `${patientData.gameScores.memoryGameScore}%`;
document.getElementById("game3").style.width = `${patientData.gameScores.shapeGameScore}%`;

// Update aria-valuenow attributes
document.getElementById("game1").setAttribute('aria-valuenow', patientData.gameScores.colorGameScore);
document.getElementById("game2").setAttribute('aria-valuenow', patientData.gameScores.memoryGameScore);
document.getElementById("game3").setAttribute('aria-valuenow', patientData.gameScores.shapeGameScore);
