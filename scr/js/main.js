// Основная функциональность сайта курсов

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Инициализация приложения
function initializeApp() {
    // Скрыть загрузочный экран через 2 секунды
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);

    // Инициализация форм
    initializeForms();
    
    // Инициализация поиска
    initializeSearch();
    
    // Инициализация табов
    initializeTabs();
    
    // Инициализация видео плеера
    initializeVideoPlayer();
}

// Показать экран входа
function showLogin() {
    hideAllScreens();
    document.getElementById('loginScreen').style.display = 'flex';
}

// Показать экран регистрации
function showRegister() {
    hideAllScreens();
    document.getElementById('registerScreen').style.display = 'flex';
}

// Показать главное меню
function showMain() {
    hideAllScreens();
    document.getElementById('mainScreen').style.display = 'block';
}

// Скрыть все экраны
function hideAllScreens() {
    const screens = ['welcomeScreen', 'loginScreen', 'registerScreen', 'mainScreen'];
    screens.forEach(screenId => {
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.style.display = 'none';
        }
    });
}

// Инициализация форм
function initializeForms() {
    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Форма регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }

    // Переключение видимости пароля
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        const eyeIcon = input.parentElement.querySelector('.eye');
        if (eyeIcon) {
            eyeIcon.addEventListener('click', function() {
                togglePasswordVisibility(input, eyeIcon);
            });
        }
    });

    // Валидация email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(input);
        });
    });
}

// Обработка входа
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }

    // Симуляция входа
    showNotification('Вход выполнен успешно!', 'success');
    setTimeout(() => {
        showMain();
    }, 1500);
}

// Обработка регистрации
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!name || !email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }

    // Симуляция регистрации
    showNotification('Регистрация выполнена успешно!', 'success');
    setTimeout(() => {
        showMain();
    }, 1500);
}

// Переключение видимости пароля
function togglePasswordVisibility(input, icon) {
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '🙈';
    } else {
        input.type = 'password';
        icon.textContent = '👁';
    }
}

// Валидация email
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    const checkmark = input.parentElement.querySelector('.checkmark');
    if (checkmark) {
        checkmark.style.color = isValid ? '#4CAF50' : '#f44336';
    }
    
    return isValid;
}

// Показать уведомление
function showNotification(message, type = 'info') {
    // Создать элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Цвета в зависимости от типа
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#FF9800'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Добавить в DOM
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Удалить через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Инициализация поиска
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            filterCourses(query);
        });
    });
}

// Фильтрация курсов
function filterCourses(query) {
    const courseItems = document.querySelectorAll('.course-item, .course-card, .course-item-large');
    
    courseItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const isVisible = title.includes(query);
        
        item.style.display = isVisible ? 'flex' : 'none';
    });
}

// Открыть курс
function openCourse(courseId) {
    // Переход на страницу деталей курса
    window.location.href = `course-details.html?course=${courseId}`;
}

// Инициализация табов
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.toLowerCase();
            showTab(tabName);
        });
    });
}

// Показать таб
function showTab(tabName) {
    // Убрать активный класс со всех кнопок
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Добавить активный класс к выбранной кнопке
    const activeButton = Array.from(tabButtons).find(btn => 
        btn.textContent.toLowerCase().includes(tabName)
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Скрыть все панели
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Показать выбранную панель
    const activePanel = document.getElementById(tabName);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

// Инициализация видео плеера
function initializeVideoPlayer() {
    const playButtons = document.querySelectorAll('.play-button, .play-button-large');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            playVideo(this);
        });
    });
    
    const videoControls = document.querySelectorAll('.control-btn');
    videoControls.forEach(control => {
        control.addEventListener('click', function() {
            handleVideoControl(this);
        });
    });
}

// Воспроизведение видео
function playVideo(button) {
    // Симуляция воспроизведения видео
    const videoContainer = button.closest('.video-container, .video-placeholder');
    if (videoContainer) {
        // Заменить кнопку воспроизведения на паузу
        button.textContent = '⏸';
        button.onclick = () => pauseVideo(button);
        
        // Показать контролы
        const controls = videoContainer.querySelector('.video-controls');
        if (controls) {
            controls.style.display = 'flex';
        }
        
        showNotification('Видео воспроизводится', 'info');
    }
}

// Пауза видео
function pauseVideo(button) {
    button.textContent = '▶';
    button.onclick = () => playVideo(button);
    showNotification('Видео приостановлено', 'info');
}

// Обработка контролов видео
function handleVideoControl(control) {
    const icon = control.textContent;
    
    switch(icon) {
        case '⏯':
            // Переключение воспроизведения/паузы
            const playButton = control.closest('.video-controls').previousElementSibling.querySelector('.play-button-large');
            if (playButton) {
                if (playButton.textContent === '▶') {
                    playVideo(playButton);
                } else {
                    pauseVideo(playButton);
                }
            }
            break;
        case '🔊':
            // Переключение звука
            control.textContent = control.textContent === '🔊' ? '🔇' : '🔊';
            break;
        case '⚙':
            // Настройки
            showNotification('Настройки видео', 'info');
            break;
        case '⛶':
            // Полноэкранный режим
            toggleFullscreen();
            break;
    }
}

// Переключение полноэкранного режима
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            showNotification('Не удалось перейти в полноэкранный режим', 'error');
        });
    } else {
        document.exitFullscreen();
    }
}

// Обработка скачивания
function handleDownload(type) {
    showNotification(`Скачивание ${type}...`, 'info');
    
    // Симуляция скачивания
    setTimeout(() => {
        showNotification(`${type} скачан успешно!`, 'success');
    }, 2000);
}

// Обработка поделиться
function handleShare(type) {
    if (navigator.share) {
        navigator.share({
            title: 'Образовательная платформа',
            text: `Посмотрите этот ${type}`,
            url: window.location.href
        }).catch(err => {
            showNotification('Ошибка при попытке поделиться', 'error');
        });
    } else {
        // Fallback для браузеров без поддержки Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Ссылка скопирована в буфер обмена', 'success');
        }).catch(() => {
            showNotification('Не удалось скопировать ссылку', 'error');
        });
    }
}

// Обработка оформления заказа
function handleCheckout() {
    showNotification('Переход к оформлению заказа...', 'info');
    
    // Симуляция процесса оформления заказа
    setTimeout(() => {
        showNotification('Заказ оформлен успешно!', 'success');
    }, 2000);
}

// Добавить обработчики событий для кнопок скачивания
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('download-btn')) {
        handleDownload('материал');
    }
    
    if (e.target.classList.contains('action-btn') && e.target.textContent.includes('Скачать')) {
        handleDownload('файл');
    }
    
    if (e.target.classList.contains('action-btn') && e.target.textContent.includes('Поделиться')) {
        handleShare('контент');
    }
    
    if (e.target.classList.contains('checkout-btn')) {
        handleCheckout();
    }
});

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Адаптация интерфейса при изменении размера окна
    const isMobile = window.innerWidth <= 768;
    
    // Обновление стилей для мобильных устройств
    document.body.classList.toggle('mobile', isMobile);
});

// Обработка прокрутки
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Открыть курс
function openCourse(courseId) {
    // Переход на страницу деталей курса
    window.location.href = `course-details.html?course=${courseId}`;
}

// Экспорт функций для использования в HTML
window.showLogin = showLogin;
window.showRegister = showRegister;
window.showTab = showTab;
window.openCourse = openCourse;
