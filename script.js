//import SmoothScroll from "smooth-scroll"; 
import './extra/css/style.css'; 

const loadedContent = new Set();
let loadedCount = 0;
const maxLoadCount = 4; 
const navLinks = Array.from(document.querySelectorAll('nav a'));
const loadQueue = [];

function loadContentInOrder() {
    if (loadQueue.length === 0 || loadedCount >= maxLoadCount) {
        return;
    }

    const link = loadQueue.shift();
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
        const targetId = href.substring(1);
        if (!loadedContent.has(targetId)) {
            const htmlFile = `${targetId}.html`;
            fetch(htmlFile)
                .then(response => response.text())
                .then(data => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;

                    const contentAfterH2 = tempDiv.querySelector('section');
                    if (contentAfterH2 && !document.getElementById(targetId)) {
                        const newContent = document.createElement('div');
                        newContent.id = targetId; // Set the id for the new content
                        newContent.innerHTML = contentAfterH2.outerHTML;
                        document.getElementById('additional-content').appendChild(newContent);
                        loadedContent.add(targetId);
                        loadedCount++;
                    }
                    loadContentInOrder(); // Load the next content in the queue
                })
                .catch(error => {
                    console.error('Erro ao carregar conteúdo adicional:', error);
                    loadContentInOrder(); // Load the next content in the queue even if there's an error
                });
        } else {
            loadContentInOrder(); // Load the next content in the queue if already loaded
        }
    }
}

navLinks.forEach(link => {
    loadQueue.push(link);
    link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                scrollToElement(targetElement.querySelector('h2') || targetElement);
            } else if (!loadedContent.has(targetId) && loadedCount < maxLoadCount) {
                loadContentInOrder();
                setTimeout(() => {
                    const newTargetElement = document.getElementById(targetId);
                    if (newTargetElement) {
                        scrollToElement(newTargetElement.querySelector('h2') || newTargetElement);
                    }
                }, 500); // Adjust the timeout as needed
            }
        }
    });
});

document.addEventListener('scroll', function() {
    const additionalContent = document.getElementById('additional-content');
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold) {
        loadContentInOrder();
    }
});

function scrollToElement(element) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const offsetTop = isMobile ? element.offsetTop - 300 : element.offsetTop - 300; // Adjust offset for mobile
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Start loading content in order on page load
loadContentInOrder();