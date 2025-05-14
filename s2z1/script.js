function loadHTML(selector, file) {
  fetch(file)
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
  loadHTML("#header-container", "../Navbar/navbar.html");
  loadHTML("#footer-container", "../Footer/footer.html");
  loadHTML("#continut-1", "../Continut/continut1.html");
  loadHTML("#continut-2", "../Continut/continut2.html");
  loadHTML("#continut-3", "../Continut/continut3.html");
});