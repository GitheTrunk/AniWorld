// JavaScript for Hero Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentIndex = 0;

function showSlide(index) {
    // Hide all by default
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active-dot', 'bg-purple-500'));
    carouselDots.forEach(dot => dot.classList.add('bg-white', 'opacity-60'));

    // Show active item
    carouselItems[index].classList.add('active');
    carouselDots[index].classList.remove('bg-white', 'opacity-60');
    carouselDots[index].classList.add('active-dot', 'bg-purple-500');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
}

// Auto-advance carousel
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Add event listeners for dot navigation
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

// Initialize first slide
showSlide(currentIndex);

// JavaScript for Mobile Menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex'); // Ensure flex for centering
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

closeMobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = '';
    });
});

// Fade in animation for mobile menu
mobileMenu.style.setProperty('--animate-fade-in-down-start', 'translateY(-20px)');
mobileMenu.style.setProperty('--animate-fade-in-down-end', 'translateY(0)');
mobileMenu.style.animation = 'fade-in-down 0.3s ease-out forwards';

// Add a simple fade-in animation for mobile menu
const style = document.createElement('style');
style.innerHTML = `
            @keyframes fade-in-down {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
document.head.appendChild(style);