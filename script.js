// Initialize EmailJS
emailjs.init("vhZEsKjwEpChCsy2t");  

// Select the message area
const messageEl = document.getElementById("messagesent");

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const serviceID = "service_1gydj9p";
  const templateID = "template_8f3iwyw";

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      messageEl.textContent = "Message sent successfully!";
      messageEl.className = "success";  // add green style
      messageEl.style.display = "block";
      this.reset();
    })
    .catch((error) => {
      console.error("Failed to send:", error);
      messageEl.textContent = "Failed to send message. Please try again.";
      messageEl.className = "error";   // add red style
      messageEl.style.display = "block";
    });
});

