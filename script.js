document.addEventListener("DOMContentLoaded", () => {
    function checkScroll() {
        let elements = document.querySelectorAll(".fade-section, .fade-button");
        elements.forEach(el => {
            let rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("visible");
            }
        });
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    checkScroll(); // 确保刷新页面时动画也能正常触发
});