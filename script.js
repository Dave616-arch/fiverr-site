document.addEventListener("DOMContentLoaded", () => {
    let elements = document.querySelectorAll(".fade-section, .fade-button");

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible"); // 滚动回顶部时重新触发
            }
        });
    }, { threshold: 0.15 }); // 提前触发动画，减少滚动到底部的延迟

    elements.forEach((el, index) => {
        el.style.setProperty("--index", index);
        observer.observe(el);
    });
});