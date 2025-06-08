// lang-switch.js
// Tự động đồng bộ ngôn ngữ trên toàn bộ các trang khi đổi ngôn ngữ ở bất kỳ trang nào

// Lưu hàm gốc setLanguage nếu có
if (typeof setLanguage === 'function') {
    window._setLanguageImpl = setLanguage;
}

// Hàm setLanguage toàn cục: lưu vào localStorage và gọi hàm gốc
window.setLanguage = function(lang) {
    localStorage.setItem('site_language', lang);
    // Đồng bộ thuộc tính language trong user nếu có
    try {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user && typeof user === 'object') {
            user.language = lang;
            localStorage.setItem('user', JSON.stringify(user));
        }
    } catch (e) {}
    if (typeof window._setLanguageImpl === 'function') {
        window._setLanguageImpl(lang);
    }
};

// Khi load trang, luôn gọi setLanguage với giá trị từ localStorage (nếu có)
(function() {
    var lang = localStorage.getItem('site_language') || 'vi';
    if (typeof window._setLanguageImpl === 'function') {
        window._setLanguageImpl(lang);
    }
})();

// Lắng nghe sự kiện storage để tự động đổi ngôn ngữ khi tab khác đổi
window.addEventListener('storage', function(e) {
    if (e.key === 'site_language') {
        var lang = e.newValue || localStorage.getItem('site_language') || 'vi';
        if (typeof window._setLanguageImpl === 'function') {
            window._setLanguageImpl(lang);
        }
    }
});
