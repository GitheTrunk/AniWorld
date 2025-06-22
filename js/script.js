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

// Watch Page Functionality (only run on watch.html)
const videoPlayer = document.getElementById('video-player');
const episodeTitle = document.querySelector('.absolute.top-4.left-4');

if (videoPlayer) {
    // Default to JJK video
    const initialData = {
        title: 'Jujutsu Kaisen',
        episode: 1,
        video: 'assets/videos/JJK_video.mp4',
        poster: 'assets/other/Jujutsu Kaisen.jpg'
    };

    // Set initial video and progress
    videoPlayer.src = initialData.video;
    videoPlayer.poster = initialData.poster;
    videoPlayer.currentTime = localStorage.getItem(`progress-${initialData.title.toLowerCase().replace(/ /g, '-')}-ep${initialData.episode}`) * videoPlayer.duration || 0;
    episodeTitle.textContent = `${initialData.title} - Season 1, Episode ${initialData.episode}`;

    // Track progress
    videoPlayer.addEventListener('timeupdate', () => {
        const progress = videoPlayer.currentTime / videoPlayer.duration;
        localStorage.setItem(`progress-${initialData.title.toLowerCase().replace(/ /g, '-')}-ep${initialData.episode}`, progress);
    });
}

// Add cursor pointer and click event to anime cards
document.querySelectorAll('.anime-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.location.href = 'screens/watch.html';
    });
});

// Add cursor pointer and click event to carousel buttons
document.querySelectorAll('.carousel-item .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'screens/watch.html';
    });
});

// Add cursor pointer and click event to bell (notification) 

document.querySelectorAll('.fa-bell').forEach(notification => {
    notification.style.cursor = 'pointer';
    notification.addEventListener('click', () => {
        window.location.href = '/screens/notification.html';
    });
});

function toggleSwitch(btn) {
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', !pressed);
    const knob = btn.querySelector('span.inline-block');
    if (!pressed) {
        knob.classList.add('translate-x-5');
        knob.classList.remove('translate-x-1');
    } else {
        knob.classList.remove('translate-x-5');
        knob.classList.add('translate-x-1');
    }
}