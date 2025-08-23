const serviceID = "service_1gydj9p";
const templateID = "template_8f3iwyw";
const publicKey = "vhZEsKjwEpChCsy2t";

emailjs.init(publicKey);

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Send the form using EmailJS
  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert("Message sent successfully!");
      this.reset(); // clear the form after success
    })
    .catch((error) => {
      console.error("Failed to send:", error);
      alert("Failed to send message. Please try again.");
    });
});
