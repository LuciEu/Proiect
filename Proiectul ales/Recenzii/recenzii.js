document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle-theme");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.innerHTML = `<i class="fas fa-sun"></i>`;
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.innerHTML = isDark ? `<i class="fas fa-sun"></i>` : `<i class="fas fa-moon"></i>`;
  });

  loadReviews();
  renderReviews(currentPage);
  setActiveButton(currentPage);
});

let reviews = JSON.parse(localStorage.getItem("reviews")) || [
  { name: "Ana Popescu", stars: 5, text: "Platforma e genială!" },
  { name: "Mihai Ionescu", stars: 4, text: "Foarte utilă, dar vreau mai multe lecții." },
  { name: "Maria Georgescu", stars: 5, text: "Recomand tuturor!" },
  { name: "Andrei Vasilescu", stars: 3, text: "E ok, dar lipsește aplicația." },
];

const DEFAULT_REVIEWS_PER_PAGE = 2;
let REVIEWS_PER_PAGE = DEFAULT_REVIEWS_PER_PAGE;
let currentPage = 1;
let showingAll = false;

function saveReviews() {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

function addReview() {
  const name = document.getElementById('name').value.trim();
  const stars = parseInt(document.getElementById('stars').value);
  const text = document.getElementById('text').value.trim();

  if (!name || !stars || !text || stars < 1 || stars > 5) {
    alert('Completează toate câmpurile și stele între 1 și 5.');
    return;
  }

  reviews.unshift({ name, stars, text });
  saveReviews();

  if (showingAll) {
    renderReviews(1);
  } else {
    renderReviews(currentPage);
    setActiveButton(currentPage);
  }

  document.getElementById('name').value = '';
  document.getElementById('stars').value = '';
  document.getElementById('text').value = '';
}

function renderReviews(page) {
  const container = document.getElementById('reviews-container');
  container.innerHTML = '';
  const start = (page - 1) * REVIEWS_PER_PAGE;
  const end = start + REVIEWS_PER_PAGE;
  const pageReviews = reviews.slice(start, end);

  pageReviews.forEach(r => {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';
    reviewDiv.innerHTML = `
      <div class="name"><strong>${r.name}</strong></div>
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <div class="text">${r.text}</div>
    `;
    container.appendChild(reviewDiv);
  });
}

function setActiveButton(page) {
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.page == page) btn.classList.add('active');
  });
}

document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (this.dataset.page === 'next') {
      if (currentPage < Math.ceil(reviews.length / REVIEWS_PER_PAGE)) {
        currentPage++;
      }
    } else {
      currentPage = parseInt(this.dataset.page);
    }
    renderReviews(currentPage);
    setActiveButton(currentPage);
    document.querySelector('#paginationControls').style.display = '';
    document.querySelector('.categories-button').textContent = "All Reviews";
    showingAll = false;
    REVIEWS_PER_PAGE = DEFAULT_REVIEWS_PER_PAGE;
  });
});

document.querySelector('.categories-button').addEventListener('click', function () {
  if (!showingAll) {
    REVIEWS_PER_PAGE = reviews.length;
    currentPage = 1;
    renderReviews(currentPage);
    document.querySelector('#paginationControls').style.display = 'none';
    this.textContent = "Less Reviews";
    showingAll = true;
  } else {
    REVIEWS_PER_PAGE = DEFAULT_REVIEWS_PER_PAGE;
    currentPage = 1;
    renderReviews(currentPage);
    document.querySelector('#paginationControls').style.display = '';
    this.textContent = "All Reviews";
    showingAll = false;
    setActiveButton(currentPage);
  }
});
