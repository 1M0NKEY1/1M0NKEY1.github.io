(function() {
    // Вывод статистики загрузки
    const loadTime = document.getElementById('load-time');
    const startTime = performance.now();
    window.addEventListener('load', function() {
        const endTime = performance.now();
        const loadTimeValue = (endTime - startTime).toFixed(2);
        loadTime.textContent = `Время загрузки: ${loadTimeValue} мс`;
    });

    // Добавление активного класса для текущей страницы
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Обработка событий наведения мыши на пункты меню
    const menuItems = document.querySelectorAll('.nav li');
    menuItems.forEach(function(item) {
        item.addEventListener('mouseover', function() {
            item.classList.add('hover');
        });
        item.addEventListener('mouseout', function() {
            item.classList.remove('hover');
        });
    });
})();