document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const grid = document.getElementById('anime-grid');
    const genreSelect = document.querySelector('select'); // First select is genre
    if (!searchInput || !grid || !genreSelect) return;

    const cards = Array.from(grid.querySelectorAll('.anime-card'));

    function normalize(str) {
        return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function filterCards(query, genre) {
        const normalizedQuery = normalize(query);
        const normalizedGenre = normalize(genre);
        cards.forEach(card => {
            const title = normalize(card.dataset.title) || normalize(card.querySelector('h4')?.textContent);
            const genres = normalize(card.dataset.genre || card.querySelector('p')?.textContent || '');
            const matchesTitle = !normalizedQuery || title.includes(normalizedQuery);
            const matchesGenre = !normalizedGenre || normalizedGenre === 'all genres' || genres.includes(normalizedGenre);
            if (matchesTitle && matchesGenre) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function debounce(fn, delay = 300) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function doFilter() {
        filterCards(searchInput.value, genreSelect.value);
    }

    searchInput.addEventListener('input', debounce(doFilter));
    genreSelect.addEventListener('change', doFilter);

    // Show all on page load
    filterCards('', genreSelect.value);
});

// Add cursor pointer and click event to search icon
const searchIcon = document.querySelector('.fa-search');
if (searchIcon) {
    searchIcon.style.cursor = 'pointer';
    searchIcon.addEventListener('click', () => {
        const searchInput = document.querySelector('input[placeholder^="Search anime"], input[type="text"]');
        if (searchInput) {
            searchInput.focus();
        }
    });
}