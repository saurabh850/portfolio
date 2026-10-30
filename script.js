// Restore theme preference immediately to prevent flashing
if (localStorage.getItem("dark-mode") === "on") {
  document.body.classList.add("dark-mode");
}

// Wait for DOM to load for forms
window.addEventListener("DOMContentLoaded", () => {
  // Handle Contact Form (Web3Forms AJAX)
  const contactForm = document.getElementById("contact-form");
  const messageEl = document.getElementById("messagesent");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault(); 
      
      if (messageEl) {
        messageEl.textContent = "Sending...";
        messageEl.className = "message";
        messageEl.style.display = "block";
      }

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
          let jsonResponse = await response.json();
          if (response.status == 200) {
              if (messageEl) {
                  messageEl.textContent = "Message sent successfully!";
                  messageEl.className = "success";
              }
              contactForm.reset();
          } else {
              console.log(response);
              if (messageEl) {
                  messageEl.textContent = jsonResponse.message || "Failed to send message.";
                  messageEl.className = "error";
              }
          }
      })
      .catch(error => {
          console.log(error);
          if (messageEl) {
              messageEl.textContent = "Something went wrong!";
              messageEl.className = "error";
          }
      });
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

// --- Mobile Screenshot Gallery Logic ---
window.addEventListener("DOMContentLoaded", () => {
  // Open gallery when clicking the main project image (mostly for mobile)
  document.querySelectorAll(".projects-section .cell2 > img").forEach(img => {
    img.addEventListener("click", function() {
      if (window.innerWidth <= 768) {
        const gallery = this.parentElement.querySelector(".screenshot-gallery");
        if (gallery) {
          gallery.classList.add("active");
          document.body.style.overflow = "hidden"; // Prevent background scrolling
        }
      }
    });
  });

  // Close gallery when clicking the X button
  document.querySelectorAll(".close-gallery").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.stopPropagation(); // Prevent event bubbling
      const gallery = this.closest(".screenshot-gallery");
      if (gallery) {
        gallery.classList.remove("active");
        document.body.style.overflow = ""; // Restore scrolling
      }
    });
  });
});
