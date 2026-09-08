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

  // Restore theme preference
  if (localStorage.getItem("dark-mode") === "on") {
    document.body.classList.add("dark-mode");
  }
});

// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "on" : "off");
}

// --- Discord Webhook Visitor Tracking ---
(function() {
  // Only fire once per session to avoid spamming the webhook on page refreshes
  if (!sessionStorage.getItem("visitor_tracked")) {
    sessionStorage.setItem("visitor_tracked", "true");
    
    const webhookUrl = "https://discord.com/api/webhooks/1546861884286697502/XBsnk6yoqqLWtV9tzBKRXnZDE3Nd5ciMcsT1U34dGEZyJK5O3SEyCMnWCUubJPa_gfmK";
    
    // Gather safe, non-identifiable telemetry
    const referrer = document.referrer || "Direct / Bookmark / Link";
    const currentUrl = window.location.href;
    const screenRes = `${window.innerWidth}x${window.innerHeight}`;
    let timezone = "Unknown";
    try { timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch(e) {}
    const language = navigator.language || "Unknown";
    const userAgent = navigator.userAgent || "Unknown";

    // Add a specific check for LinkedIn as requested
    const isLinkedIn = referrer.toLowerCase().includes("linkedin.com");
    
    const payload = {
      username: "Portfolio Tracker",
      avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      embeds: [{
        title: isLinkedIn ? "👔 New Visitor from LinkedIn!" : "👀 New Portfolio Visitor!",
        color: isLinkedIn ? 0x0077b5 : 0x4a76ee,
        fields: [
          { name: "🔗 Source (Referrer)", value: referrer, inline: false },
          { name: "📍 Page Visited", value: currentUrl, inline: false },
          { name: "🌍 Timezone", value: timezone, inline: true },
          { name: "🗣️ Language", value: language, inline: true },
          { name: "📱 Screen Size", value: screenRes, inline: true },
          { name: "💻 Browser / Device", value: `\`${userAgent}\``, inline: false }
        ],
        footer: { text: `Visited at ${new Date().toLocaleString()}` }
      }]
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(err => console.error("Tracker blocked or failed", err));
  }
})();
