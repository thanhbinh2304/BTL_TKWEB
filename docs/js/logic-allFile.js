
       function autoSetLanguageOnLoad() {
        var lang = 'vi';
        try {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user && user.language) {
                lang = user.language;
            } else {
                lang = localStorage.getItem('site_language') || 'vi';
            }
        } catch (e) {
            lang = localStorage.getItem('site_language') || 'vi';
        }
        setLanguage(lang);
    }
    document.addEventListener('DOMContentLoaded', autoSetLanguageOnLoad);
       // JavaScript for responsive menu
        const menuToggle = document.getElementById('menuToggle');
        const menuClose = document.getElementById('menuClose');
        const menu = document.getElementById('menu');
        const overlay = document.getElementById('overlay');

        menuToggle.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                // Nếu menu đang mở, nhấn lại toggle sẽ đóng
                menu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            } else {
                // Nếu menu đang đóng, nhấn toggle sẽ mở
                menu.classList.add('active');
                overlay.classList.add('active');
                document.body.classList.add('menu-open');
            } 
        });

        function closeMenu() {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        menuClose.addEventListener('click', closeMenu);
        overlay.addEventListener('mousedown', function(e) {
            // Chỉ tắt menu nếu click đúng vào overlay (không phải phần tử con)
            if (e.target === overlay) {
                closeMenu();
            }
        });

        // Nút quay lại đầu trang
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if(window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });

        // Lottie GitHub logo in footer
        var githubAnim = lottie.loadAnimation({
            container: document.getElementById('github-lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../vendors/icons8-github.json'
        });
        githubAnim.addEventListener('DOMLoaded', function() {
            // Đổi màu stroke của tất cả path trong SVG sang trắng
            var svg = document.querySelector('#github-lottie svg');
            if(svg) {
                var paths = svg.querySelectorAll('path');
                paths.forEach(function(p) {
                    if(p.getAttribute('stroke')) {
                        p.setAttribute('stroke', '#fff');
                    }
                });
            }
        });

        // Đăng xuất
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Xóa thông tin user khỏi localStorage
                localStorage.removeItem('user');
                localStorage.removeItem('site_language');
                // Chuyển hướng về trang đăng nhập
                window.location.href = 'index.html';
            });
        }
    
    
        // Account icon dropdown toggle
        document.addEventListener('DOMContentLoaded', function() {
            var accountLi = document.querySelector('.account-icon-li');
            var accountA = accountLi ? accountLi.querySelector('a') : null;
            var submenu = accountLi ? accountLi.querySelector('.account-submenu') : null;
            if(accountLi && accountA && submenu) {
                accountA.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    accountLi.classList.toggle('open');
                });
                // Đóng khi click ra ngoài
                document.addEventListener('mousedown', function(e) {
                    if(accountLi.classList.contains('open')) {
                        if(!accountLi.contains(e.target)) {
                            accountLi.classList.remove('open');
                        }
                    }
                });
                // Đóng khi tab chuyển focus ra ngoài
                document.addEventListener('focusin', function(e) {
                    if(accountLi.classList.contains('open')) {
                        if(!accountLi.contains(e.target)) {
                            accountLi.classList.remove('open');
                        }
                    }
                });
            }
        });
