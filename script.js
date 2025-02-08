document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible"); // 保证往回滑动时动画重新触发
                }
            });
        },
        {
            threshold: 0.2, // 20% 进入视口时触发
        }
    );

    fadeElements.forEach((el) => observer.observe(el));
});