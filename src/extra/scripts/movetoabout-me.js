document.addEventListener('DOMContentLoaded', function () {
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true
    });

    function loadContent(target) {
        fetch(target + '.html')
            .then(response => response.text())
            .then(data => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                const contentAfterH2 = tempDiv.querySelector('section');
                if (contentAfterH2) {
                    const additionalContent = document.getElementById('additional-content');
                    additionalContent.innerHTML = contentAfterH2.outerHTML;
                    scroll.animateScroll(document.getElementById(target));
                }
            })
            .catch(error => console.error('Erro ao carregar conteúdo adicional:', error));
    }

    document.querySelectorAll('a[data-load]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var target = this.getAttribute('href').substring(1);
            loadContent(target);
        });
    });

    document.addEventListener('scroll', function() {
        const additionalContent = document.getElementById('additional-content');
        const scrollPosition = window.scrollY + window.innerHeight;
        const threshold = document.body.offsetHeight - 100;

        if (scrollPosition > threshold && !additionalContent.innerHTML) {
            loadContent('about-me');
        }
    });
});
