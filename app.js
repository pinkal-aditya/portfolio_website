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
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

let animateElements = document.querySelectorAll(".animated");
animateElements.forEach(element => {
  observer.observe(element);
});

// Home Button from Icon
let icon = document.querySelector(".aman");
icon.addEventListener("click", () => {
  document.getElementById('home').scrollIntoView({});
});

document.addEventListener('DOMContentLoaded', () => {
  // Form and input fields
  let form = document.querySelector("form");
  let submitName = document.querySelector("#nameform");
  let submitEmail = document.querySelector("#emailform");
  let textarea = document.querySelector("#textarea");
  let subpop = document.querySelector(".subpopup");

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    // Validate the form inputs
    if (submitName.value.trim() === "" || !emailPattern.test(submitEmail.value.trim())) {
      event.preventDefault(); // Prevent form submission if validation fails
      
    } else {
      // Prevent default form submission behavior
      event.preventDefault();

      // Prepare data for Formspree
      const formData = new FormData(form);

      // Show submission feedback
      var submsg = document.createElement('div');
      submsg.classList.add("submsg");
      submsg.classList.add("subani");
      subpop.appendChild(submsg);

      let msg = document.createElement('div');
      msg.classList.add("msg");
      submsg.appendChild(msg);

      let text = document.createElement('h4');
      text.textContent = "Your response is submitted!";
      msg.appendChild(text);

      let load = document.createElement('div');
      load.classList.add("load");
      load.classList.add("loadani");
      submsg.appendChild(load);

      // Send data to Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

        // Clear input fields
        submitName.value = "";
        submitEmail.value = "";
        textarea.value = "";

        // Remove feedback message after a delay
        setTimeout(() => {
          submsg.remove();
        }, 3000);

        // Optionally, add a redirect or further action if needed
        // window.location.href = 'https://your-thank-you-page-url.com';
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally, handle errors here
      });
    }
  });
});
