console.log("conectado!")
window.addEventListener("load", function() {
    const sliderBox = document.querySelector('.slider-box ul');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = sliderBox.querySelectorAll('li').length;
    const slideInterval = 4000;
    let timeoutID; 

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        sliderBox.style.marginLeft = offset + '%';
        // Programar la siguiente transición automáticamente después de un intervalo
        timeoutID = setTimeout(nextSlide, slideInterval);
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startSlideInterval() {
        // Programar la primera transición automáticamente
        timeoutID = setTimeout(nextSlide, slideInterval);
    }

    function stopSlideInterval() {
        // Limpiar el timeout si se ha iniciado
        clearTimeout(timeoutID);
    }

    prevBtn.addEventListener('click', function() {
        stopSlideInterval(); // Detener el cambio automático cuando se hace clic en la flecha
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function() {
        stopSlideInterval(); // Detener el cambio automático cuando se hace clic en la flecha
        goToSlide(currentIndex + 1);
    });

    startSlideInterval(); // Inicia el cambio automático de imágenes
});