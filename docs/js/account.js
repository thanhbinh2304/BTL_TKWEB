// Lấy user hiện tại từ localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}
// Lấy danh sách users từ localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
// Lưu lại danh sách users vào localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
// Cập nhật thông tin user hiện tại vào localStorage
function updateCurrentUserInfo(newInfo) {
    let user = getCurrentUser();
    if (!user) return false;
    let users = getUsers();
    // Cập nhật user trong mảng users
    const idx = users.findIndex(u => u.email === user.email);
    if (idx === -1) return false;
    // Cập nhật các trường mới
    user = { ...user, ...newInfo };
    users[idx] = user;
    saveUsers(users);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
}
// Hiển thị thông tin cá nhân lên form (account.html)
function showAccountInfo() {
    const user = getCurrentUser();
    if (!user) return;
    // Nếu user không có firstName/lastName nhưng có username thì tách tên
    if ((!user.firstName || !user.lastName) && user.username) {
        const parts = user.username.trim().split(' ');
        if (parts.length > 1) {
            user.lastName = parts.pop();
            user.firstName = parts.join(' ');
        } else {
            user.firstName = user.username;
            user.lastName = '';
        }
    }
    // Gán vào form
    if (document.getElementById('firstName')) document.getElementById('firstName').value = user.firstName || '';
    if (document.getElementById('lastName')) document.getElementById('lastName').value = user.lastName || '';
    if (document.getElementById('email')) document.getElementById('email').value = user.email || '';
    if (document.getElementById('phone')) document.getElementById('phone').value = user.phone || '';
    if (document.getElementById('birthday')) document.getElementById('birthday').value = user.birthday || '';
    if (document.getElementById('gender')) document.getElementById('gender').value = user.gender || '';
    if (document.getElementById('occupation')) document.getElementById('occupation').value = user.occupation || '';
    if (document.getElementById('address')) document.getElementById('address').value = user.address || '';
    if (document.getElementById('bio')) document.getElementById('bio').value = user.bio || '';
    // Gán vào profile card
    if (document.getElementById('displayName')) document.getElementById('displayName').textContent = (user.firstName || '') + (user.lastName ? ' ' + user.lastName : '');
    if (document.getElementById('displayEmail')) document.getElementById('displayEmail').textContent = user.email || '';
    if (document.getElementById('avatarDisplay')) {
        if (user.avatar) {
            document.getElementById('avatarDisplay').innerHTML = '<img src="' + user.avatar + '" alt="avatar" style="width:90px;height:90px;border-radius:50%;object-fit:cover;">';
        } else {
            document.getElementById('avatarDisplay').innerHTML = '<i class="fas fa-user"></i>';
        }
    }
}
// Xử lý lưu thông tin khi submit form (account.html)
function handleAccountSave(e) {
    e.preventDefault();
    const newInfo = {
        firstName: document.getElementById('firstName')?.value,
        lastName: document.getElementById('lastName')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        birthday: document.getElementById('birthday')?.value,
        gender: document.getElementById('gender')?.value,
        occupation: document.getElementById('occupation')?.value,
        address: document.getElementById('address')?.value,
        bio: document.getElementById('bio')?.value
    };
    if (updateCurrentUserInfo(newInfo)) {
        alert('Cập nhật thông tin thành công!');
        showAccountInfo();
    } else {
        alert('Có lỗi khi cập nhật thông tin.');
    }
}
// Xử lý upload avatar
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        updateCurrentUserInfo({ avatar: e.target.result });
        showAccountInfo();
    };
    reader.readAsDataURL(file);
}
// Gắn sự kiện khi DOM ready
window.addEventListener('DOMContentLoaded', function() {
    showAccountInfo();
    var form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', handleAccountSave);
    }
    var avatarInput = document.getElementById('avatarUpload');
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarUpload);
    }
});
