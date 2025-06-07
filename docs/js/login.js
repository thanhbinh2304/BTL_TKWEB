function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function register() {
    const username = document.getElementById("newUser").value;
    const password = document.getElementById("newPass").value;
    const email = document.getElementById("newMail").value;
    const passAgain = document.getElementById("PassAgain").value;
    const users = getUsers();
    const errors = [
        { condition: username === "", message: "Vui lòng nhập Họ và Tên." },
        { condition: email === "", message: "Vui lòng nhập email." },
        { condition: password === "", message: "Vui lòng nhập mật khẩu." },
        { condition: passAgain === "", message: "Vui lòng nhập lại mật khẩu." },
        { condition: users.find(user => user.email === email), message: "Email đã được sử dụng." },
        { condition: password !== passAgain, message: "Mật khẩu không khớp." }
    ];
    for(const error of errors) {
        if (error.condition) {
            alert(error.message);
            return false;
        }
    }
    // Lấy ngôn ngữ hiện tại từ localStorage (nếu có)
    const language = localStorage.getItem('site_language') || 'vi';
    const newUser = {email, password, username, language};
    users.push(newUser);
    saveUsers(users);
    // Save the current user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Đăng ký thành công!");
    window.location.href = "login.html";    
    return false;
}
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const users = getUsers();
    const user = users.find(user => user.email === email);
    if (!user) {
        alert("Tài khoản không tồn tại.");
        return false;
    }
    if (user.password !== password) {
        alert("Mật khẩu không đúng.");
        return false;
    }
    // Nếu user chưa có thuộc tính language thì thêm vào (ưu tiên localStorage.site_language)
    if (!user.language) {
        user.language = localStorage.getItem('site_language') || 'vi';
        // Cập nhật lại users trong localStorage
        const idx = users.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            users[idx] = user;
            saveUsers(users);
        }
    }
    // Save the logged-in user to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    alert("Đăng nhập thành công!");
    window.location.href = "index2.html";
    return false;
}