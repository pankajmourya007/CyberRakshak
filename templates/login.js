const createAccountForm = document.getElementById("createAccountForm");

createAccountForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Here you can add your own logic to create an account with the provided username and password
  console.log(`Creating account for user ${username} with password ${password}`);
});

// --------------------------------------For database from Firebase-------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeHSA_5dUKpphxSMHPBit6SFkcWCtPT6Q",
    authDomain: "cyberrakshak.firebaseapp.com",
    databaseURL: "https://cyberrakshak-default-rtdb.firebaseio.com",
    projectId: "cyberrakshak",
    storageBucket: "cyberrakshak.appspot.com",
    messagingSenderId: "636838848826",
    appId: "1:636838848826:web:ad2b4533e3b1a53f510803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
login.addEventListener('click', e => {

    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert('Account created successfully!');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert('errorMessage');
            // ..
        });
});