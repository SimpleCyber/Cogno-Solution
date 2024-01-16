document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase with your configuration

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
    // Now you can use Firebase Storage
    const storage = firebase.storage();
  
    // Get the file input element
    const fileInput = document.getElementById('fileInput');
  let uid;
    // Function to upload a PDF
    function uploadPdf() {
        // Get the currently signed-in user
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
             uid = user.uid; // The current user's UID
             localStorage.setItem("currUserUid", uid)
            const file = fileInput.files[0];
        
            if (file && file.type === 'application/pdf') {
              // Create a reference to the user's specific path in storage
              const storageRef = storage.ref().child('pdfs/' + uid + '/' + file.name);
        
              // Upload the file
              storageRef.put(file).then((snapshot) => {
                console.log('PDF uploaded:', snapshot.totalBytes, 'bytes');
                alert("PDF Uploaded");
              }).catch((error) => {
                console.error('Error uploading PDF:', error);
              });
            } else {
              console.error('No file selected or invalid file format. Please select a PDF file.');
            }
          } else {
            console.error('No user is signed in.');
          }
        });
      }
  
    upl.addEventListener('click', uploadPdf);


   // Assuming 'uid' holds the current user's unique identifier
const userPdfsRef = storage.ref().child('pdfs/' + localStorage.getItem("currUserUid"));

// Get a list of all items (PDFs) in the 'pdfs/userid' directory
userPdfsRef.listAll().then(function(result) {
  const pdfList = document.getElementById('pdfList');
  pdfList.innerHTML = ''; // Clear existing list

  // Check if there are any items
  if (result.items.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No PDFs available';
    pdfList.appendChild(li);
  } else {
    // Loop through the list of PDFs under the user's directory and display their names
    result.items.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = item.name;
      li.style.cursor = "pointer";
      li.title = "Download";

      // Add a click event listener to trigger the download
      li.addEventListener('click', function() {
        downloadPdf(item);
      });

      pdfList.appendChild(li);
    });
  }
}).catch(function(error) {
  // Handle any errors
  console.log("Error getting documents: ", error);
});

  
    // Function to download a PDF
    function downloadPdf(item) {
      item.getDownloadURL().then(function(url) {
        // Create a hidden anchor element and trigger a click to download the PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = item.name;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }).catch(function(error) {
        console.error('Error downloading PDF:', error);
      });
    }

  });