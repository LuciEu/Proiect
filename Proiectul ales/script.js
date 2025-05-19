function loadHTML(selector, file) {
  return fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // Încărcăm header-ul mai întâi, apoi inițializăm tema
  loadHTML("#header-container", "../Navbar/navbar.html").then(() => {
    initThemeToggle(); // Abia acum că navbar-ul e injectat, putem folosi toggle-ul
  });

  // Restul componentelor
  loadHTML("#footer-container", "../Footer/footer.html");
  loadHTML("#continut-1", "../Continut/continut1.html");
  loadHTML("#continut-2", "../Continut/continut2.html");
  loadHTML("#continut-3", "../Continut/continut3.html");
  loadHTML("#continut-4", "../Continut/continut4.html");
  loadHTML("#continut-5", "../Continut/continut5.html");
  loadHTML("#continut-6", "../Continut/continut6.html");
});

function initThemeToggle() {
  const body = document.body;
  const toggle = document.getElementById("toggle-theme");

  if (!toggle) return;

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.innerHTML = `<i class="fas fa-sun"></i>`;
  } else {
    toggle.innerHTML = `<i class="fas fa-moon"></i>`;
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggle.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
      localStorage.setItem("theme", "light");
      toggle.innerHTML = `<i class="fas fa-moon"></i>`;
    }
  });
}
