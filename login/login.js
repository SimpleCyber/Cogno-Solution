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
function loginUser() {
	let email = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;
  
	auth.signInWithEmailAndPassword(email, password)
	  .then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		console.log(user);
		alert(user.email + " Login successfully!!!");
		window.location = "../index.html"   //----------------------------> changed new line
  
		// Now determine if the user is a doctor or a patient
		checkUserType(user.uid);

		let allMocaTestScore = [{"empty" : "empty"}]

       localStorage.setItem("mocaTestCount", 0)
		// localStorage.setItem("allMocaTestScore", JSON.stringify(allMocaTestScore))
		

		// localStorage.setItem("game1Score", 0)
		// localStorage.setItem("game2Score", 0)
		// localStorage.setItem("game3Score", 0)
	
		// localStorage.setItem("test1Score", 0)
		// localStorage.setItem("test2Score", 0)
		// localStorage.setItem("test3Score", 0)
	  })
	  .catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorMessage);
		alert(errorMessage);
	  }); 
  }
  
  function checkUserType(userId) {
	const usersRef = firebase.database().ref("users");
  
	usersRef.child("doctor/" + userId).once("value", (snapshot) => {
	  if (snapshot.exists()) {
		console.log("User is a doctor");
		// Additional logic for a doctor
		localStorage.setItem("userProfession", "doctor")
		window.location = "../index.html";
	  } else {
		usersRef.child("patient/" + userId).once("value", (snapshot) => {
		  if (snapshot.exists()) {
			console.log("User is a patient");
			localStorage.setItem("userProfession", "patient")
			window.location = "../index.html"
		  } else {
			console.log("User type is unknown");
			// Handle unknown user type
		  }
		});
	  }
	});
  }
  

// function displayUserData(userId) {

//     const usersRef = database.ref("users/patient");

//     usersRef.child(userId).once("value")
//         .then((snapshot) => {
//              userData = snapshot.val();
    

//             localStorage.setItem("currUserData", userData)

          

//             console.log(userData);
            
//         })
//         .catch((error) => {
//             console.log("Error retrieving user data:", error);
//         });
// }
