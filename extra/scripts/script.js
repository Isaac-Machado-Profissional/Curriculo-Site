// script.js
document.addEventListener('scroll', function() {
    const additionalContent = document.getElementById('additional-content');
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && !additionalContent.innerHTML) {
        fetch('../about-me.html')
            .then(response => response.text())
            .then(data => {
                // Cria um elemento temporário para armazenar o conteúdo carregado
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;

                // Extrai o conteúdo após a tag <h2>
                const contentAfterH2 = tempDiv.querySelector('section');
                if (contentAfterH2) {
                    additionalContent.innerHTML = contentAfterH2.outerHTML;
                }
            })
            .catch(error => console.error('Erro ao carregar conteúdo adicional:', error));
    }
});
