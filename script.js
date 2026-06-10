// ===== ОСНОВНОЙ СКРИПТ ДЛЯ САЙТА FOOTART =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. МОБИЛЬНОЕ МЕНЮ =====
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 950) {
                navLinks.classList.remove('show');
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 950) {
            const isClickInsideMenu = navLinks && navLinks.contains(event.target);
            const isClickOnMenuBtn = mobileBtn && mobileBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnMenuBtn && navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        }
    });
    
    // ===== 2. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ПРИ СКРОЛЛЕ =====
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(el => observer.observe(el));
    
    // ===== 3. ФИЛЬТРАЦИЯ ТОВАРОВ (ДЛЯ СТРАНИЦЫ PRODUCTS) =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем active у всех кнопок
                filterBtns.forEach(b => b.classList.remove('active'));
                // Добавляем active текущей кнопке
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Показываем/скрываем карточки
                productCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // ===== 4. ИНТЕРАКТИВНАЯ СМЕНА ФОНА ДЛЯ ЛОГОТИПА (СТРАНИЦА BRANDBOOK) =====
    const bgSelect = document.getElementById('bgColorSelect');
    const logoInteractive = document.getElementById('logoInteractive');
    
    if (bgSelect && logoInteractive) {
        bgSelect.addEventListener('change', function(e) {
            logoInteractive.style.backgroundColor = e.target.value;
        });
    }
    
    // ===== 5. ФОРМА ОБРАТНОЙ СВЯЗИ (СТРАНИЦА CONTACTS) =====
    const contactForm = document.getElementById('callbackForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные из формы
            const name = this.querySelector('input[placeholder="Ваше имя"]')?.value || '';
            const email = this.querySelector('input[placeholder="Email"]')?.value || '';
            const message = this.querySelector('textarea')?.value || '';
            
            if (name && email && message) {
                alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.`);
                this.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    }
    
    // ===== 6. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== 7. ОБРАБОТКА ОШИБОК ЗАГРУЗКИ ИЗОБРАЖЕНИЙ =====
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.hasAttribute('data-placeholder-added')) {
                this.setAttribute('data-placeholder-added', 'true');
                const altText = this.alt || 'FootArt';
                // Случайный цвет фона для плейсхолдера
                const colors = ['6B4F4B', '2F4F4F', '8B7D6B'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                this.src = `https://placehold.co/500x400/${randomColor}/FFF?text=${encodeURIComponent(altText.substring(0, 20))}`;
            }
        });
    });
    
    // ===== 8. ДОБАВЛЯЕМ КЛАСС ДЛЯ АКТИВНОГО ПУНКТА МЕНЮ =====
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-links a');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    setActiveNavItem();
    
    // ===== 9. ДОБАВЛЯЕМ КНОПКЕ "ПОДРОБНЕЕ" ВРЕМЕННУЮ ФУНКЦИЮ =====
    const detailButtons = document.querySelectorAll('.product-card .btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card')?.querySelector('h4')?.innerText || 'товара';
            alert(`Функция "Подробнее" для "${productName}" будет доступна в ближайшее время. Свяжитесь с нами для получения полной информации!`);
        });
    });
    
    // ===== 10. ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ ТОВАРОВ =====
    const productCardsForHover = document.querySelectorAll('.product-card');
    productCardsForHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== 11. КНОПКА "СВЯЗАТЬСЯ С НАМИ" В ХЕДЕРЕ =====
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn && contactBtn.getAttribute('href') === 'contacts.html') {
        contactBtn.addEventListener('click', function(e) {
            // Ничего не делаем, просто переходим на страницу контактов
        });
    }
    
    console.log('Сайт FootArt успешно загружен!');
});