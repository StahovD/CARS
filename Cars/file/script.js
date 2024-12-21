// Відкриття модального вікна
const loginModal = document.getElementById('loginModal');
const openModalBtn = document.getElementById('openLogin');  // Додайте кнопку для відкриття модального вікна
openModalBtn.onclick = () => {
    loginModal.style.display = 'flex';
};

// Закриття модального вікна
const closeLoginBtn = document.getElementById('closeLogin');
closeLoginBtn.onclick = () => {
    loginModal.style.display = 'none';
};

// Закриття модального вікна при кліку поза межами вікна
window.onclick = (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
};
