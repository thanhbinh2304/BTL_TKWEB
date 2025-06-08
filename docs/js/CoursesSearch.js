// Tìm kiếm khóa học với icon động
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('courseSearchInput');
    var searchLottieDiv = document.getElementById('courseSearchLottie');
    var courseCards = document.querySelectorAll('.course-card');
    function searchCourses() {
        var keyword = searchInput.value.trim().toLowerCase();
        courseCards.forEach(function(card) {
            var title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            var desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            if (title.includes(keyword) || desc.includes(keyword)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    if (searchLottieDiv) {
        searchLottieDiv.addEventListener('click', searchCourses);
        searchLottieDiv.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                searchCourses();
            }
        });
    }
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchCourses();
    });
});