document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const courseCards = document.querySelectorAll('.course-card');

  if (!searchInput || courseCards.length === 0) return;

  searchInput.addEventListener('input', function () {
    const keyword = this.value.toLowerCase();

    courseCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const desc = card.querySelector('p').innerText.toLowerCase();
      const match = title.includes(keyword) || desc.includes(keyword);
      card.style.display = match ? 'block' : 'none';
    });
  });
});
