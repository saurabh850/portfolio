// Initialize EmailJS with your Public Key
emailjs.init("vhZEsKjwEpChCsy2t");  

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageEl = document.getElementById("messagesent");

  if (!form || !messageEl) {
    console.error("Form or message element not found in DOM.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const serviceID = "service_1gydj9p";
    const templateID = "template_8f3iwyw";

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        messageEl.textContent = "Message sent successfully!";
        messageEl.className = "success";
        messageEl.style.display = "block";
        this.reset();
      })
      .catch((error) => {
        console.error("Failed to send:", error);
        messageEl.textContent = "Failed to send message. Please try again.";
        messageEl.className = "error";
        messageEl.style.display = "block";
      });
  });
});
