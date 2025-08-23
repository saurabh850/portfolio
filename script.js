// Initialize EmailJS with your Public Key
emailjs.init("vhZEsKjwEpChCsy2t");  

// Wait for DOM to load so form exists
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageEl = document.getElementById("messagesent");

  if (!form || !messageEl) {
    console.error("Form or message element not found in DOM.");
    return;
  }

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const serviceID = "service_1gydj9p";   // replace with your actual ID
    const templateID = "template_8f3iwyw"; // replace with your actual ID

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        messageEl.textContent = "Message sent successfully!";
        messageEl.className = "success";  // style it green
        messageEl.style.display = "block";
        this.reset();
      })
      .catch((error) => {
        console.error("Failed to send:", error);
        messageEl.textContent = "Failed to send message. Please try again.";
        messageEl.className = "error";   // style it red
        messageEl.style.display = "block";
      });
  });
});
