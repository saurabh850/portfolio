function sendMail() {
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value
    };

    emailjs.send("service_1gydj9p", "template_8f3iwyw", parms, "vhZEsKjwEpChCsy2t")
    .then(() => {
        alert("Email Sent!");
    })
    .catch((err) => {
        console.log("FAILED...", err);
        alert("Failed to send email. Try again later.");
    });
}
