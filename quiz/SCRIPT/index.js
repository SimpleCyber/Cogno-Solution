document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})
function patient(){
    
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("home.html")
    }
})
}
function doctor(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            location.replace("dr_home.html")
        }
    })
    }

function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function signUp(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

function forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}


document.getElementById("patient").addEventListener("click", function() {
    this.classList.add("clicked");
    this.disabled = true; // Optionally, you can disable the button after clicking
  });

  document.getElementById("doctor").addEventListener("click", function() {
    this.classList.add("clicked");
    this.disabled = true; // Optionally, you can disable the button after clicking
  });

