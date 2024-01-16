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

let doctorId;

function docInc() {
  // Assuming your structure is like "docCounter/..."
  const usersRef = database.ref("docCounter");

  usersRef
    .once("value")
    .then((snapshot) => {
      const userData = snapshot.val();

      // Assuming userData is a number, you can increment it
      const incrementedValue = Number(userData) + 1;

      doctorId = incrementedValue;

      // Save the incremented value back to the database
      usersRef.set(incrementedValue);

      // Save it to localStorage if needed
      localStorage.setItem("docCounter", incrementedValue);

      console.log(localStorage.getItem("docCounter"));
    })
    .catch((error) => {
      console.log("Error retrieving user data:", error);
    });
}



function registerUser() {

    docInc();

//   var patientID = document.getElementById("drID").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  var gender = document.getElementById("gender").value;

  var email = document.getElementById("email").value;
  var moblileno = document.getElementById("moblileno").value;
  var address = document.getElementById("address").value;
  var profession = document.getElementById("profession").value;
  var Country = document.getElementById("Country").value;

  // Store user data in localStorage
  // localStorage.setItem(username, JSON.stringify({
  //     username:username,
  //     password: password,
  //     password2:password2,
  //     gender: gender,
  //     profession:profession,
  //     email: email,
  //     patientID:patientID,
  //     moblileno:moblileno,
  //     address:address,
  //     Country:Country

  //   }));

//   console.log({
//     username: username,
//     password: password,
//     password2: password2,
//     gender: gender,
//     profession: profession,
//     email: email,
//     docto: patientID,
//     moblileno: moblileno,
//     address: address,
//     Country: Country,
//   });

  //! Creating User with Email and Password
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      //! Saving User Data in Realtime Database

      //! Sending Email Verification Link to User
      user
        .sendEmailVerification()
        .then(() => {
          alert(
            "Doctor Created. Verification email sent to " +
              email +
              ". Please check your inbox and click on the verification link."
          );

          //! Displaying User Data in Console

          const usersRef = database.ref("users/doctor");

          usersRef.child(user.uid).set({
            username: username,
            password: password,
            password2: password2,
            gender: gender,
            profession: doctorId,
            email: email,
            doctorId: doctorId,
            moblileno: moblileno,
            address: address,
            Country: Country,
          });
          displayUserData(user.uid);
          window.location.href = 'login.html';
        })
        .catch((error) => {
          console.log("Error sending verification email:", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, " : ", errorMessage);
      alert(errorCode, " : ", errorMessage);
    });
}

//! Function to Save User Data in Realtime Database
let userData;
//! Function to Display User Data in Console
function displayUserData(userId) {
  const usersRef = database.ref("users/doctor");

  usersRef
    .child(userId)
    .once("value")
    .then((snapshot) => {
      userData = snapshot.val();

      alert("Registration successful!");

      console.log(userData);

   
    })

    .catch((error) => {
      console.log("Error retrieving user data:", error);
    });
}
