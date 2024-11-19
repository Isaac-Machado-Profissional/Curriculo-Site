import SmoothScroll from "smooth-scroll"; 

const loadedContent = new Set();
let loadedCount = 0;
const maxLoadCount = 4; // Changed from 5 to 4

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                scrollToElement(targetElement.querySelector('h2') || targetElement);
            } else if (!loadedContent.has(targetId) && loadedCount < maxLoadCount) {
                const additionalContent = document.getElementById('additional-content');
                const htmlFile = `../../src/${targetId}.html`;

                fetch(htmlFile)
                    .then(response => response.text())
                    .then(data => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = data;

                        const contentAfterH2 = tempDiv.querySelector('section');
                        if (contentAfterH2) {
                            const newContent = document.createElement('div');
                            newContent.id = targetId; // Set the id for the new content
                            newContent.innerHTML = contentAfterH2.outerHTML;
                            additionalContent.appendChild(newContent);
                            loadedContent.add(targetId);
                            loadedCount++;

                            scrollToElement(newContent.querySelector('h2') || newContent);
                        }
                    })
                    .catch(error => console.error('Erro ao carregar conteúdo adicional:', error));
            }
        }
    });
});

document.addEventListener('scroll', function() {
    const additionalContent = document.getElementById('additional-content');
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold) {
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                if (!loadedContent.has(targetId) && loadedCount < maxLoadCount) {
                    const htmlFile = `../../${targetId}.html`;

                    fetch(htmlFile)
                        .then(response => response.text())
                        .then(data => {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = data;

                            const contentAfterH2 = tempDiv.querySelector('section');
                            if (contentAfterH2 && !document.getElementById(targetId)) {
                                if (!loadedContent.has(targetId)) {
                                    const newContent = document.createElement('div');
                                    newContent.id = targetId; // Set the id for the new content
                                    newContent.innerHTML = contentAfterH2.outerHTML;
                                    additionalContent.appendChild(newContent);
                                    loadedContent.add(targetId);
                                    loadedCount++;
                                }
                            }
                        })
                        .catch(error => console.error('Erro ao carregar conteúdo adicional:', error));
                }
            }
        });
    }
});

function scrollToElement(element) {
    const offsetTop = element.offsetTop - 200; // 200px height consideration
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}
