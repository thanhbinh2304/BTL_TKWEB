
    // Gửi góp ý (fake, chỉ hiển thị thông báo thành công)
    document.addEventListener('DOMContentLoaded', function() {
        var form = document.getElementById('feedbackForm');
        var success = document.getElementById('feedbackSuccess');
        if(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                success.style.display = 'block';
                setTimeout(function(){ success.style.display = 'none'; }, 4000);
                form.reset();
            });
        }
    });
