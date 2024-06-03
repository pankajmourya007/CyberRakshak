const searchUrl = document.getElementById("search-url");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
// const searchForm = document.getElementById("search-form");

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var url = document.getElementById("url").value;
    fetch("/scan", {
      method: "POST",
      body: JSON.stringify({ url: url }), // Send data as JSON string
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var resultDiv = document.getElementById("result");
        if (data.status === "success") {
          resultDiv.innerText = data.message;
        } else {
          resultDiv.innerText = "Error: " + data.message;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "ltDSyyey6cNp55W_nTJUUKg6vxCxsoTAXnoYBSHuxRY",
  },
};

fetch("https://api.intruder.io/v1/health/", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));


  document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var url = document.getElementById("url").value;
    showLoadingModal(); // Show loading modal when scan starts
    fetch("/scan", {
        method: "POST",
        body: JSON.stringify({ url: url }), // Send data as JSON string
        headers: {
            "Content-Type": "application/json", // Specify JSON content type
        },
    })
    .then((response) => response.json())
    .then((data) => {
        var resultDiv = document.getElementById("scan-result");
        if (data.download_url) {
            // Update download button href attribute
            document.getElementById("downloadButton").href = data.download_url;
            // Display download button
            document.getElementById("downloadButton").style.display = "block";
            resultDiv.innerText = "Scan completed successfully.";
        } else {
            resultDiv.innerText = "Error: " + data.error;
        }
        hideLoadingModal(); // Hide loading modal when scan is complete
    })
    .catch((error) => {
        console.error("Error:", error);
        hideLoadingModal(); // Hide loading modal if an error occurs
    });
});


// ----------------------------------------For About Us------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var learnMoreBtn = document.getElementById('learn-more-btn');
  var learnMoreContent = document.getElementById('learn-more-content');

  learnMoreBtn.addEventListener('click', function () {
      if (learnMoreContent.style.display === 'none' || learnMoreContent.style.display === '') {
          learnMoreContent.style.display = 'block';
          learnMoreBtn.textContent = 'Show Less';
      } else {
          learnMoreContent.style.display = 'none';
          learnMoreBtn.textContent = 'Learn More';
      }
  });
});

// -----------------------------------------NavBar-------------------------------------------------
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('show');
});


// -----------------------------------------Download Button----------------------------------------------------

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  var url = document.getElementById("url").value;
  fetch("/scan", {
      method: "POST",
      body: JSON.stringify({ url: url }), // Send data as JSON string
      headers: {
          "Content-Type": "application/json", // Specify JSON content type
      },
  })
  .then((response) => response.json())
  .then((data) => {
      var resultDiv = document.getElementById("scan-result");
      if (data.download_url) {
          // Update download button href attribute
          document.getElementById("downloadButton").href = data.download_url;
          // Display download button
          document.getElementById("downloadButton").style.display = "block";
          resultDiv.innerText = "Scan completed successfully.";
      } else {
          resultDiv.innerText = "Error: " + data.error;
      }
  })
  .catch((error) => {
      console.error("Error:", error);
  });
});

