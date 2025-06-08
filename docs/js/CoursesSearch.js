// Tìm kiếm khóa học với icon động
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('courseSearchInput');
    var searchLottieDiv = document.getElementById('courseSearchLottie');
    var courseCards = document.querySelectorAll('.course-card');
    // Gợi ý tìm kiếm động
    var suggestionBox = document.createElement('div');
    suggestionBox.className = 'course-search-suggestions';
    suggestionBox.style.position = 'absolute';
    suggestionBox.style.background = '#fff';
    suggestionBox.style.border = '1px solid #ddd';
    suggestionBox.style.borderRadius = '6px';
    suggestionBox.style.boxShadow = '0 2px 8px #0002';
    suggestionBox.style.zIndex = '1000';
    suggestionBox.style.display = 'none';
    suggestionBox.style.maxHeight = '220px';
    suggestionBox.style.overflowY = 'auto';
    suggestionBox.style.fontSize = '1rem';
    function updateSuggestionBoxPosition() {
        var rect = searchInput.getBoundingClientRect();
        var parentRect = searchInput.parentElement.getBoundingClientRect();
        suggestionBox.style.left = (rect.left - parentRect.left) + 'px';
        suggestionBox.style.top = (rect.bottom - parentRect.top + 4) + 'px';
        suggestionBox.style.width = rect.width + 'px';
    }
    updateSuggestionBoxPosition();
    window.addEventListener('resize', updateSuggestionBoxPosition);
    searchInput.addEventListener('input', updateSuggestionBoxPosition);
    searchInput.addEventListener('focus', updateSuggestionBoxPosition);
    searchInput.parentElement.appendChild(suggestionBox);

    // Lưu lịch sử tìm kiếm gần đây THEO USER
    function getUserRecentKey() {
        var user = null;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch {}
        if (user && user.email) {
            return 'recent_course_searches_' + user.email;
        }
        return 'recent_course_searches_guest';
    }
    function getRecentSearches() {
        try {
            return JSON.parse(localStorage.getItem(getUserRecentKey())) || [];
        } catch { return []; }
    }
    function saveRecentSearch(keyword) {
        if (!keyword) return;
        var recent = getRecentSearches();
        var idx = recent.indexOf(keyword);
        if (idx !== -1) recent.splice(idx, 1);
        recent.unshift(keyword);
        if (recent.length > 8) recent = recent.slice(0, 8);
        localStorage.setItem(getUserRecentKey(), JSON.stringify(recent));
    }

    function showSuggestions(keyword) {
        var suggestions = [];
        if (keyword) {
            courseCards.forEach(function(card) {
                var title = card.querySelector('h3')?.textContent || '';
                var desc = card.querySelector('p')?.textContent || '';
                if (title.toLowerCase().includes(keyword) || desc.toLowerCase().includes(keyword)) {
                    suggestions.push(title);
                }
            });
        }
        // Nếu không có gợi ý, hiển thị tìm kiếm gần đây
        if (suggestions.length === 0 && keyword.length < 2) {
            suggestions = getRecentSearches();
        }
        suggestionBox.innerHTML = '';
        if (suggestions.length > 0) {
            suggestions.forEach(function(s) {
                var item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = s;
                item.style.padding = '8px 14px';
                item.style.cursor = 'pointer';
                item.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    searchInput.value = s;
                    searchCourses();
                    suggestionBox.style.display = 'none';
                });
                suggestionBox.appendChild(item);
            });
            suggestionBox.style.display = 'block';
        } else {
            suggestionBox.style.display = 'none';
        }
    }

    function searchCourses() {
        var keyword = searchInput.value.trim().toLowerCase();
        saveRecentSearch(keyword);
        courseCards.forEach(function(card) {
            var title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            var desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            if (title.includes(keyword) || desc.includes(keyword)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        suggestionBox.style.display = 'none';
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
    searchInput.addEventListener('input', function() {
        var keyword = searchInput.value.trim().toLowerCase();
        showSuggestions(keyword);
    });
    searchInput.addEventListener('focus', function() {
        var keyword = searchInput.value.trim().toLowerCase();
        showSuggestions(keyword);
    });
    searchInput.addEventListener('blur', function() {
        setTimeout(function() { suggestionBox.style.display = 'none'; }, 120);
    });
});