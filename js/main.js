// main.js - extracted from index.html
// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fade in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeInOnScroll = function() {
        fadeElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            if (elementTop < viewportHeight - 50) {
                element.classList.add('fade-in-visible');
            }
        });
    };
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
    initCarousels();
    initMobileMenu();
});

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    }
}

function scrollToProduct(productName, event) {
    event.preventDefault();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    setTimeout(function() {
        const productCards = document.querySelectorAll('.product-card');
        for (let card of productCards) {
            const heading = card.querySelector('h3');
            if (heading && heading.textContent === productName) {
                card.style.boxShadow = '0 0 20px var(--primary-color)';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(function() {
                    card.style.boxShadow = '';
                }, 2000);
                break;
            }
        }
    }, 500);
}

function showFAQs(event) {
    event.preventDefault();
    let faqsSection = document.getElementById('faqs');
    if (!faqsSection) {
        faqsSection = document.createElement('div');
        faqsSection.id = 'faqs';
        faqsSection.className = 'faqs-modal';
        faqsSection.innerHTML = `
            <div class="faqs-content">
                <span class="close-faqs">&times;</span>
                <h2>Frequently Asked Questions</h2>
                <div class="faq-item">
                    <h3>What makes Pi-Water different from regular filtered water?</h3>
                    <p>Pi-Water contains ferric ferrous salt in a highly energized state, mimicking the water found in living organisms. This gives it unique properties that regular filtered water doesn't have.</p>
                </div>
                <div class="faq-item">
                    <h3>How long do the filter cartridges last?</h3>
                    <p>Our filter cartridges typically last for 6-12 months depending on usage and water quality. The filter has a capacity of 30,000 liters for most contaminants.</p>
                </div>
                <div class="faq-item">
                    <h3>Is Pi-Water safe for everyone to drink?</h3>
                    <p>Yes, Pi-Water is safe for everyone including children, the elderly, and pets. It contains natural minerals beneficial to health.</p>
                </div>
                <div class="faq-item">
                    <h3>How do I install the Pi-Water system?</h3>
                    <p>Installation is simple and comes with detailed instructions. The AQUA-π251 can be used on countertop or installed under sink, while the AQUA-π503 requires professional installation for whole-house use.</p>
                </div>
                <div class="faq-item">
                    <h3>Where can I purchase replacement filters?</h3>
                    <p>Replacement filters can be purchased directly through our website or by contacting our customer service team at ailas-ph@ailas.co.jp.</p>
                </div>
            </div>
        `;
        const style = document.createElement('style');
        style.textContent = `
            .faqs-modal {
                display: block;
                position: fixed;
                z-index: 1001;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.7);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .faqs-modal.show {
                opacity: 1;
            }
            .faqs-content {
                background-color: white;
                margin: 5% auto;
                padding: 30px;
                border-radius: 10px;
                width: 80%;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 5px 30px rgba(0,0,0,0.3);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            }
            .faqs-modal.show .faqs-content {
                transform: translateY(0);
            }
            .close-faqs {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.3s;
            }
            .close-faqs:hover {
                color: var(--primary-dark);
            }
            .faq-item {
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
            }
            .faq-item:last-child {
                border-bottom: none;
            }
            .faq-item h3 {
                margin-bottom: 10px;
                color: var(--primary-dark);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(faqsSection);
        const closeBtn = faqsSection.querySelector('.close-faqs');
        closeBtn.addEventListener('click', function() {
            faqsSection.classList.remove('show');
            setTimeout(function() {
                faqsSection.remove();
            }, 300);
        });
        setTimeout(function() {
            faqsSection.classList.add('show');
        }, 10);
        faqsSection.addEventListener('click', function(e) {
            if (e.target === faqsSection) {
                faqsSection.classList.remove('show');
                setTimeout(function() {
                    faqsSection.remove();
                }, 300);
            }
        });
    } else {
        faqsSection.classList.add('show');
    }
}

let carouselIntervals = {};
function initCarousels() {
    const carousels = document.querySelectorAll('.product-carousel');
    carousels.forEach(carousel => {
        const id = carousel.id;
        carouselIntervals[id] = setInterval(() => {
            moveCarousel(1, id);
        }, 5000);
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselIntervals[id]);
        });
        carousel.addEventListener('mouseleave', () => {
            carouselIntervals[id] = setInterval(() => {
                moveCarousel(1, id);
            }, 5000);
        });
    });
}
function moveCarousel(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelector('.carousel-slides');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = dots.length - 1;
    if (newIndex >= dots.length) newIndex = 0;
    jumpToSlide(newIndex, carouselId);
}
function jumpToSlide(index, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelector('.carousel-slides');
    const dots = carousel.querySelectorAll('.carousel-dot');
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
(function() {
    const fab = document.querySelector('.floating-action-buttons');
    function toggleFabOnScroll() {
        if (window.scrollY > 100) {
            fab.classList.add('fab-visible');
        } else {
            fab.classList.remove('fab-visible');
        }
    }
    window.addEventListener('scroll', toggleFabOnScroll);
    toggleFabOnScroll();
})();
