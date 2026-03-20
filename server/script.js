document.addEventListener("DOMContentLoaded", () => {
    const numberEl = document.querySelector(".hero__stat-number");
    const target = 1500;
    let current = 1491;
    const duration = 1000; // загальна тривалість анімації в мс
    const stepTime = duration / (target - current); // час між змінами цифр

    numberEl.textContent = `${current}+`;

    const counter = setInterval(() => {
        current++;
        numberEl.textContent = `${current}+`;
        if (current >= target) {
            clearInterval(counter);
        }
    }, stepTime);
});
// Функція для елементів секції та grid-item
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.setAttribute('data-visible', 'true');
        }
    });
}, { threshold: 0.2 });

// Анімація для секції
const section = document.querySelector('.about-notary');
observer.observe(section);

// Анімація для grid-item
document.querySelectorAll('.grid-item').forEach(item => observer.observe(item));


document.addEventListener('DOMContentLoaded', function() {
    // Елементи для анімації
    const animatedItems = document.querySelectorAll('.services__item--animated, .services__divider--animated');

    // Функція для перевірки видимості елемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Функція для обробки прокрутки
    function handleScroll() {
        animatedItems.forEach(item => {
            if (isElementInViewport(item) && !item.classList.contains('visible')) {
                item.classList.add('visible');
            }
        });
    }

    // Спостереження за змінами в DOM (для динамічного контенту)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Додаємо спостерігач для кожного елемента
    animatedItems.forEach(item => {
        observer.observe(item);
    });

    // Ініціалізація при завантаженні сторінки
    handleScroll();

    // Додаємо обробник події прокрутки
    window.addEventListener('scroll', handleScroll);

    // Перевіряємо елементи при завантаженні сторінки
    window.addEventListener('load', handleScroll);
});



const slider = document.querySelector('.slider');
const slides = Array.from(document.querySelectorAll('.slider li'));
const slideCount = slides.length;

let index = 0;

// Клонування першого і останнього слайда
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

let slideWidth = 100; // % ширина
slider.style.transform = `translateX(-${slideWidth}%)`;

function moveSlider(dir = 1) {
    index += dir;
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(-${slideWidth * (index + 1)}%)`;

    slider.addEventListener('transitionend', () => {
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;

        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${slideWidth * (index + 1)}%)`;
    }, { once: true });
}

// Автопрокрутка
setInterval(() => moveSlider(1), 3000);

// Кнопки
document.querySelector('.next').addEventListener('click', () => moveSlider(1));
document.querySelector('.prev').addEventListener('click', () => moveSlider(-1));


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".why__item");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("is-visible");
                    }, index * 120);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    items.forEach(item => observer.observe(item));
});


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".stats__item");
    let animated = false;

    function animateNumber(el) {
        const from = parseInt(el.dataset.from, 10);
        const to = parseInt(el.dataset.to, 10);
        const suffix = el.dataset.suffix || "";
        const numberEl = el.querySelector(".stats__number");

        const duration = 2300;
        let startTime = null;

        function step(time) {
            if (!startTime) startTime = time;

            const progress = Math.min((time - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const value = Math.floor(from + (to - from) * eased);
            numberEl.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    items.forEach(item => animateNumber(item));
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(document.querySelector(".stats"));
});

    document.addEventListener("DOMContentLoaded", () => {
    /* Анімація при скролі */
    const items = document.querySelectorAll(".contact__item");

    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add("is-visible");
}
});
}, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));

    /* Копіювання */
    document.querySelectorAll(".contact__copy").forEach(btn => {
    btn.addEventListener("click", () => {
    const text = btn.closest(".contact__item").dataset.copy;
    if (!text) return;

});
});
});

const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    menu.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        menu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    });
});


const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const dots = document.querySelectorAll('.carousel .dot');

let currentIndex = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Автопрокрутка
setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}, 3000);

// Клік на доти
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});



