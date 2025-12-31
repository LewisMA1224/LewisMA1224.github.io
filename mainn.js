document.getElementById("funButton").addEventListener("click", function () {
  const sound = document.getElementById("fartSound");
  sound.currentTime = 0; // rewind to start
  sound.play();
});

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = ["q1", "q2", "q3"];
  const counts = { cow: 0, saura: 0, pirate: 0 };

  answers.forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected) counts[selected.value]++;
  });

  // Find highest
  let mascot = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  const resultText = {
    cow: "🐮 You're the Chick-fil-A Cow — fun, chaotic, and always running the show.",
    saura: "🪶 You’re the Saura — humble, sharp, and true to your roots.",
    pirate: "🏴‍☠️ You're PeeDee the Pirate — full of swagger, showmanship, and hype."
  };

  document.getElementById("quizResult").textContent = resultText[mascot];
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const response = document.getElementById("formResponse");

  if (!name || !email || !message) {
    response.textContent = "❌ Please fill out all fields.";
    response.style.color = "red";
    return;
  }

  response.textContent = "✅ Message sent! (Simulation)";
  response.style.color = "green";
  this.reset();
});

document.addEventListener("DOMContentLoaded", function () {
  const quoteBtn = document.getElementById("quote-btn");

  if (quoteBtn) {
    quoteBtn.addEventListener("click", function () {
      const text = document.getElementById("quote-text");
      const author = document.getElementById("quote-author");

      text.classList.add("fade");
      author.classList.add("fade");

      fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            text.textContent = `"${data.content}"`;
            author.textContent = `– ${data.author}`;
            text.classList.remove("fade");
            author.classList.remove("fade");

            const tweetBtn = document.getElementById("tweet-btn");
            if (tweetBtn) {
              tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.content)} – ${encodeURIComponent(data.author)}`;
            }
          }, 400);
        })
        .catch(error => {
          text.textContent = "Oops! Couldn't fetch a quote.";
          author.textContent = "";
          text.classList.remove("fade");
          author.classList.remove("fade");
          console.error("Error fetching quote:", error);
        });
    });
  }
});
