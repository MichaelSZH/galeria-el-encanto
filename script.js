document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos
    const slides = document.querySelectorAll(".banner-slide");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const indicatorsContainer = document.querySelector(".banner-indicators");
    let currentSlide = 0;
    let slideInterval;

    // Crear indicadores dinámicamente
    function createIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement("button");
            indicator.dataset.index = index;
            indicator.classList.add("indicator");
            if (index === 0) indicator.classList.add("active");
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Función para mostrar el slide activo
    function showSlide(index) {
        // Remover clases 'active' de slide e indicador actuales
        slides[currentSlide].classList.remove("active");
        indicatorsContainer.children[currentSlide].classList.remove("active");

        // Calcular el nuevo índice
        currentSlide = (index + slides.length) % slides.length;

        // Agregar clases 'active' al nuevo slide e indicador
        slides[currentSlide].classList.add("active");
        indicatorsContainer.children[currentSlide].classList.add("active");
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Iniciar el intervalo automático
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // Detener el intervalo automático
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Asignar eventos a los indicadores
    function assignIndicatorEvents() {
        Array.from(indicatorsContainer.children).forEach((indicator) => {
            indicator.addEventListener("click", () => {
                stopSlideInterval();
                showSlide(Number(indicator.dataset.index));
                startSlideInterval();
            });
        });
    }

    // Asignar eventos a los botones
    function assignButtonEvents() {
        prevButton.addEventListener("click", () => {
            stopSlideInterval();
            prevSlide();
            startSlideInterval();
        });

        nextButton.addEventListener("click", () => {
            stopSlideInterval();
            nextSlide();
            startSlideInterval();
        });
    }

    // Inicialización
    function initBanner() {
        createIndicators();
        showSlide(currentSlide);
        startSlideInterval();
        assignIndicatorEvents();
        assignButtonEvents();
    }

    initBanner(); // Ejecutar inicialización
});
