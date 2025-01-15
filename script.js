document.addEventListener('DOMContentLoaded', () => {
    // Функция для инициализации слайдера
    function initializeSlider(slider) {
        if (!slider) return; // Если слайдер не существует, выходим из функции

        // Получаем контейнер слайдов, все слайды, кнопки "предыдущий" и "следующий"
        const slidesContainer = slider.querySelector('.slides-container');
        const slides = slider.querySelectorAll('.my-slide');
        const prevButton = slider.querySelector('.prev-button');
        const nextButton = slider.querySelector('.next-button');

        let currentIndex = 0; // Текущий индекс слайда
        let slidesPerView = getSlidesPerView(); // Количество слайдов, отображаемых одновременно

        // Функция для определения количества слайдов, отображаемых одновременно, в зависимости от ширины экрана
        function getSlidesPerView() {
            const viewportWidth = window.innerWidth; // Ширина окна просмотра
            if (viewportWidth <= 768) return 1; // Если ширина <= 768px, отображаем 1 слайд
            if (viewportWidth <= 1024) return 2; // Если ширина <= 1024px, отображаем 2 слайда
            return 3; // В противном случае отображаем 3 слайда
        }

        // Функция для обновления состояния слайдера
        function updateSliderState() {
            const maxIndex = Math.max(0, slides.length - slidesPerView); // Максимальный индекс слайда

            // Отключаем кнопки, если достигнут начальный или конечный слайд
            prevButton.disabled = currentIndex <= 0;
            nextButton.disabled = currentIndex >= maxIndex;

            const slideWidth = slider.offsetWidth / slidesPerView; // Ширина одного слайда
            const gap = 20; // Расстояние между слайдами

            // Вычисляем трансформацию для контейнера слайдов
            const transform = currentIndex * -(slideWidth + (gap * currentIndex / slidesPerView));
            slidesContainer.style.transform = `translateX(${transform}px)`; // Применяем трансформацию
        }

        // Функция для обработки изменения размера окна
        function handleResize() {
            const newSlidesPerView = getSlidesPerView(); // Получаем новое количество слайдов, отображаемых одновременно
            if (newSlidesPerView !== slidesPerView) { // Если количество слайдов изменилось
                slidesPerView = newSlidesPerView; // Обновляем количество слайдов
                currentIndex = Math.min(currentIndex, slides.length - slidesPerView); // Обновляем текущий индекс
                updateSliderState(); // Обновляем состояние слайдера
            }
        }

        // Обработчик события клика по кнопке "предыдущий"
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) { // Если текущий индекс больше 0
                currentIndex--; // Уменьшаем индекс
                updateSliderState(); // Обновляем состояние слайдера
            }
        });

        // Обработчик события клика по кнопке "следующий"
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - slidesPerView) { // Если текущий индекс меньше максимального индекса
                currentIndex++; // Увеличиваем индекс
                updateSliderState(); // Обновляем состояние слайдера
            }
        });

        // Обработчик события изменения размера окна
        window.addEventListener('resize', handleResize);

        // Инициализация состояния слайдера
        updateSliderState();
    }

    // Получаем все слайдеры на странице и инициализируем их
    const sliders = document.querySelectorAll('.my-slider');
    sliders.forEach(slider => initializeSlider(slider));
});
