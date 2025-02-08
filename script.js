document.addEventListener("DOMContentLoaded", () => {
    function checkScroll() {
        let sections = document.querySelectorAll(".fade-section, .fade-button");
        sections.forEach(section => {
            let rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible"); // 滚动回去时重新触发
            }
        });
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    checkScroll(); // 页面加载时检查，避免刷新后动画丢失
});