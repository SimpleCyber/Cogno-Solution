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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

let doctorData = JSON.parse(localStorage.getItem("ImpCurrData"))

let usersData = JSON.parse(localStorage.getItem("allPatientData"))

let currPatient = 0;
let totalPatient = Object.keys(usersData).length;

// for(let i = 0; i<Object.keys(usersData).length; i++){

// }

function dataPatient() {
  document.getElementById("patientNo").innerHTML = "Patient " + (Number(currPatient) + 1);

  document.getElementById("patientName").innerHTML = "Patient Name : " + usersData[Object.keys(usersData)[currPatient]].username;

  document.getElementById("patientAge").innerHTML = "Patient Age : " + usersData[Object.keys(usersData)[currPatient]].age;

  document.getElementById("patientGender").innerHTML = "Patient Gender : " + usersData[Object.keys(usersData)[currPatient]].gender;

  document.getElementById("patientWeight").innerHTML = "Patient Weight : " + usersData[Object.keys(usersData)[currPatient]].weight + "kg";

  document.getElementById("game1Score").innerHTML = "Color Game : " + usersData[Object.keys(usersData)[currPatient]].gameScores.colorGameScore + "/100";

  document.getElementById("game2Score").innerHTML = "Memory Game : " + usersData[Object.keys(usersData)[currPatient]].gameScores.memoryGameScore + "/100";

  document.getElementById("game3Score").innerHTML = "Shape Game : " + usersData[Object.keys(usersData)[currPatient]].gameScores.shapeGameScore + "/100";

  document.getElementById("patientEmail").setAttribute("href", "mailto:" + usersData[Object.keys(usersData)[currPatient]].email)
  document.getElementById("patientContact").setAttribute("href", "tel:" + usersData[Object.keys(usersData)[currPatient]].email)

}
dataPatient();
userName.innerHTML = doctorData.username
userName.innerHTML = doctorData.username
userEmail.innerHTML = doctorData.email
genderUser.innerHTML = doctorData.gender
phoneNo.innerHTML = doctorData.moblileno
userAge.innerHTML = doctorData.age;
userAdd.innerHTML = doctorData.address;


function nextPatient() {
  if (currPatient < totalPatient-1) {
    currPatient++;
    dataPatient();
  }
  else{
    currPatient = 0;
    dataPatient();
  }
}
function prevPatient() {
  if (currPatient > 0) {
    currPatient--;
    dataPatient();
  }
  else{
    currPatient =totalPatient-1;
    dataPatient();
  }
}

function logoutDoctor(){
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
