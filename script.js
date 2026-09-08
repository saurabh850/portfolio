// Restore theme preference immediately to prevent flashing
if (localStorage.getItem("dark-mode") === "on") {
  document.body.classList.add("dark-mode");
}

// Wait for DOM to load for forms
window.addEventListener("DOMContentLoaded", () => {
  // Handle Contact Form cleanly
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent standard insecure URL-encoded submission

      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const message = document.getElementById("contact-message").value;

      // Construct a clean, perfectly formatted email
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      // Open the user's default email client
      window.location.href = `mailto:shaurabhnarayan@gmail.com?subject=${subject}&body=${body}`;
    });
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
