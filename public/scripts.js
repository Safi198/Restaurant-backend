// Smooth Scroll Animation on Scroll
const sections = document.querySelectorAll('.api-endpoints');
const options = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => observer.observe(section));

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

// Expand API Description on Click
const headers = document.querySelectorAll('.api-endpoints ul li h4');
headers.forEach(header => {
    header.addEventListener('click', () => {
        const parent = header.parentElement;
        parent.classList.toggle('expanded');
    });
});

// Lazy Loading of API Endpoints
const apiContainer = document.querySelector('.api-endpoints ul');
const apiItems = Array.from(apiContainer.children);
const initialLoadCount = 4;
let loadedCount = 0;

function loadMoreApis() {
    const nextBatch = apiItems.slice(loadedCount, loadedCount + initialLoadCount);
    nextBatch.forEach(item => item.style.maxHeight = '1000px');
    loadedCount += initialLoadCount;

    if (loadedCount >= apiItems.length) {
        window.removeEventListener('scroll', loadMoreApis);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadMoreApis();
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.documentElement.scrollHeight;

    if (scrollPosition >= bottomPosition - 200) {
        loadMoreApis();
    }
});
