// Існуючий код для модальних вікон
const loginModal = document.getElementById('loginModal');
const openModalBtn = document.getElementById('openLogin');
openModalBtn.onclick = () => {
    loginModal.style.display = 'flex';
};

const closeLoginBtn = document.getElementById('closeLogin');
closeLoginBtn.onclick = () => {
    loginModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
};

// Покращена функція пошуку з фільтрацією за різними параметрами
function searchCars() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const carCards = document.getElementsByClassName("car-card");
    
    Array.from(carCards).forEach(card => {
        const title = card.getElementsByTagName("h2")[0].innerText.toLowerCase();
        const description = card.getElementsByTagName("p")[0].innerText.toLowerCase();
        
        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Функція для сортування автомобілів
function sortCars(criteria) {
    const carContainer = document.getElementById("carContainer");
    const carCards = Array.from(document.getElementsByClassName("car-card"));
    
    carCards.sort((a, b) => {
        const titleA = a.getElementsByTagName("h2")[0].innerText.toLowerCase();
        const titleB = b.getElementsByTagName("h2")[0].innerText.toLowerCase();
        
        if (criteria === 'name-asc') {
            return titleA.localeCompare(titleB);
        } else if (criteria === 'name-desc') {
            return titleB.localeCompare(titleA);
        }
    });
    
    carCards.forEach(card => carContainer.appendChild(card));
}

// Функція для плавної анімації прокрутки
function smoothScroll(target) {
    const element = document.querySelector(target);
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

// Функція для відображення спливаючих підказок
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    
    element.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Функція для збереження обраних автомобілів
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(carId) {
    const index = favorites.indexOf(carId);
    if (index === -1) {
        favorites.push(carId);
        showTooltip(event.target, 'Додано до обраного');
    } else {
        favorites.splice(index, 1);
        showTooltip(event.target, 'Видалено з обраного');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

// Функція для оновлення кнопок обраного
function updateFavoriteButtons() {
    const buttons = document.getElementsByClassName('favorite-btn');
    Array.from(buttons).forEach(button => {
        const carId = button.dataset.carId;
        if (favorites.includes(carId)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Функція для валідації форми
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.getElementsByTagName('input');
    let isValid = true;
    
    Array.from(inputs).forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Функція для динамічного завантаження контенту
function loadMoreCars() {
    const carContainer = document.getElementById('carContainer');
    // Тут можна додати логіку завантаження додаткових автомобілів з сервера
    // Наприклад, через fetch API
}

// Додавання обробника подій для прокрутки
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadMoreCars();
    }
});

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    updateFavoriteButtons();
    
    // Додавання кнопок для сортування
    const sortSelect = document.createElement('select');
    sortSelect.innerHTML = `
        <option value="name-asc">За назвою (А-Я)</option>
        <option value="name-desc">За назвою (Я-А)</option>
    `;
    sortSelect.addEventListener('change', (e) => sortCars(e.target.value));
    document.querySelector('.search-container').appendChild(sortSelect);
});
