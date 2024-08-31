function myFunction() {
  var ham = document.querySelector(".nav-links");
  if (ham.style.display === "block") {
    ham.style.display = "none";
  } else {
    ham.style.display = "block";
    ham.style.backgroundColor = "#001219";
    ham.style.opacity = "0.9";
  }
}

// OnScroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

let animateElements = document.querySelectorAll(".animated");
animateElements.forEach((element) => {
  observer.observe(element);
});

// Home Button from Icon
let icon = document.querySelector(".aditya");
icon.addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({});
});

document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let submitName = document.querySelector("#nameform");
  let submitEmail = document.querySelector("#emailform");
  let textarea = document.querySelector("#textarea");
  let subpop = document.querySelector(".subpopup");

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    if (
      submitName.value.trim() === "" ||
      !emailPattern.test(submitEmail.value.trim()) ||
      textarea.value.trim() === ""
    ) {
      event.preventDefault(); // Prevent form submission if validation fails
      alert("Please fill in all required fields correctly.");
    } else {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

      var submsg = document.createElement("div");
      submsg.classList.add("submsg");
      submsg.classList.add("subani");
      subpop.appendChild(submsg);

      let msg = document.createElement("div");
      msg.classList.add("msg");
      submsg.appendChild(msg);

      let text = document.createElement("h4");
      text.textContent = "Your response is submitted!";
      msg.appendChild(text);

      let load = document.createElement("div");
      load.classList.add("load");
      load.classList.add("loadani");
      submsg.appendChild(load);

      fetch("http://localhost:3000/api/forms/submit", {
        method: "POST",
        body: JSON.stringify(data), // Convert data to JSON string
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          submitName.value = "";
          submitEmail.value = "";
          textarea.value = "";

          setTimeout(() => {
            submsg.remove();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
          submsg.classList.add("error");
          let errorMsg = document.createElement("h4");
          errorMsg.textContent =
            "There was an error submitting your response. Please try again.";
          msg.appendChild(errorMsg);

          setTimeout(() => {
            submsg.remove();
          }, 3000);
        });
    }
  });
});
