function sendMail(){
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value

    }

    emailjs.send("service_1gydj9p","template_8f3iwyw",parms).then(alert("Email Sent!"))
}
