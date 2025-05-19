document.addEventListener("DOMContentLoaded", () => {
  // Recenzie
  const reviewForm = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviewsContainer");

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const text = document.getElementById("reviewText").value;
    const review = document.createElement("div");
    review.innerHTML = `<strong>${name}</strong>: ${text}`;
    reviewsContainer.appendChild(review);
    reviewForm.reset();
  });

  // Chat
  const chatForm = document.getElementById("chatForm");
  const chatBox = document.getElementById("chatBox");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("chatInput").value;
    const line = document.createElement("p");
    line.textContent = msg;
    chatBox.appendChild(line);
    chatForm.reset();
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
