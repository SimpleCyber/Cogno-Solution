document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase with your configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDW9QVAotWrF5wDwa3gat8ctyy4vai7QnU",
        authDomain: "cognosolution.firebaseapp.com",
        databaseURL: "https://cognosolution-default-rtdb.firebaseio.com",
        projectId: "cognosolution",
        storageBucket: "cognosolution.appspot.com",
        messagingSenderId: "837253971920",
        appId: "1:837253971920:web:5dc990e954d4a8bd9b43d5",
        measurementId: "G-MLCTT8WWVR"
      };
  
    firebase.initializeApp(firebaseConfig);
  
    // Now you can use Firebase Storage
    const storage = firebase.storage();
  
    // Get the file input element
    const fileInput = document.getElementById('fileInput');
  
    // Function to upload a PDF
    function uploadPdf() {
      const file = fileInput.files[0];
  
      if (file.type === 'application/pdf') {
        const storageRef = storage.ref().child('pdfs/' + file.name);
  
        storageRef.put(file).then((snapshot) => {
          console.log('PDF uploaded:', snapshot.totalBytes, 'bytes');
          alert("PDF Uploaded")
        }).catch((error) => {
          console.error('Error uploading PDF:', error);
        });
      } else {
        console.error('Invalid file format. Please select a PDF file.');
      }
    }
  
    upl.addEventListener('click', uploadPdf);

    // Attach the upload function to a button's click event
    const pdfsRef = storage.ref().child('pdfs');

    // Get a list of all items (PDFs) in the 'pdfs' directory
    pdfsRef.listAll().then(function(result) {
      const pdfList = document.getElementById('pdfList');
  
      // Loop through the list of PDFs and display their names
      result.items.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.style.cursor = "pointer"
        li.title = "Download"
  
        // Add a click event listener to trigger the download
        li.addEventListener('click', function() {
          downloadPdf(item);
        });
  
        pdfList.appendChild(li);
      });
    }).catch(function(error) {
      console.error('Error fetching PDF list:', error);
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