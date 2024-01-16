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


let patientId;
function patientInc() {
    // Assuming your structure is like "patientCounter/..."
    const usersRef = database.ref("patientCounter");
  
    usersRef
      .once("value")
      .then((snapshot) => {
        const userData = snapshot.val();
  
        // Assuming userData is a number, you can increment it
        const incrementedValue = Number(userData) + 1;
  
        // Save the incremented value back to the database
        usersRef.set(incrementedValue);
  
        patientId = incrementedValue;
  
        // Save it to localStorage if needed
        localStorage.setItem("patientCounter", incrementedValue);
  
        console.log(localStorage.getItem("patientCounter"));
      })
      .catch((error) => {
        console.log("Error retrieving user data:", error);
      });
  }


function registerUser() {
patientInc();

    // let patientID = document.getElementById('patientID').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let gender = document.getElementById('gender').value;
    let age = document.getElementById('age').value;
    let weight = document.getElementById('weight').value;
    let email = document.getElementById('email').value;
    let moblileno = document.getElementById('moblileno').value;
    let address = document.getElementById('address').value;
    let profession = document.getElementById('profession').value;


    // Store user data in localStorage
    // localStorage.setItem("CurrUserData", JSON.stringify({
    //     username: username,
    //     password: password,
    //     password2: password2,
    //     gender: gender,
    //     age: age,
    //     weight: weight,
    //     email: email,
    //     patientID: patientID,
    //     moblileno: moblileno,
    //     address: address,
    //     profession: profession

    // }));

    // console.log({
    //     username: username,
    //     password: password,
    //     password2: password2,
    //     gender: gender,
    //     age: age,
    //     weight: weight,
    //     email: email,
    //     patientID: patientID,
    //     moblileno: moblileno,
    //     address: address,
    //     profession: profession
    // });

    //! Creating User with Email and Password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            //! Saving User Data in Realtime Database


            //! Sending Email Verification Link to User
            user.sendEmailVerification()
                .then(() => {
                    alert("User Created. Verification email sent to " + email + ". Please check your inbox and click on the verification link.");

                    //! Displaying User Data in Console

                    const usersRef = database.ref("/users/patient");

                    usersRef.child(user.uid).set({
                        username: username,
                        password: password,
                        password2: password2,
                        gender: gender,
                        age: age,
                        weight: weight,
                        email: email,
                        patientID: patientId,
                        moblileno: moblileno,
                        address: address,
                        profession: profession

                    })

                    console.log("Data stored");
                    displayUserData(user.uid);

              window.location.href = "login.html";

                })
                .catch((error) => {
                    console.log("Error sending verification email:", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, " : ", errorMessage);
            alert(errorCode, " : ", errorMessage)
        });


}

//! Function to Save User Data in Realtime Database
let userData;
//! Function to Display User Data in Console
function displayUserData(userId) {

    localStorage.setItem("game1Score", 0)
    localStorage.setItem("game2Score", 0)
    localStorage.setItem("game3Score", 0)

    localStorage.setItem("test1Score", 0)
    localStorage.setItem("test2Score", 0)
    localStorage.setItem("test3Score", 0)

    const usersRef = database.ref("users/patient");

    usersRef.child(userId).once("value")
        .then((snapshot) => {
             userData = snapshot.val();
       
            
alert('Registration successful!');
          
            console.log(userData);
           

            
        })
        .catch((error) => {
            console.log("Error retrieving user data:", error);
        });


        
      

}

