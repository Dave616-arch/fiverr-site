document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-section");
    let ticking = false;

    function checkScroll() {
        sections.forEach((section) => {
            let rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });

        updateActiveSection();
    }

    function updateActiveSection() {
        let centerIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
            let rect = section.getBoundingClientRect();
            let centerDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
            if (centerDistance < minDistance) {
                minDistance = centerDistance;
                centerIndex = index;
            }
        });

        sections.forEach((section, index) => {
            if (index === centerIndex) {
                section.classList.add("active-section");
            } else {
                section.classList.remove("active-section");
            }
        });

        // 滚动结束时，自动对齐最近的板块
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            let targetSection = sections[centerIndex];
            if (targetSection) {
                window.scrollTo({
                    top: window.scrollY + targetSection.getBoundingClientRect().top - (window.innerHeight / 2) + (targetSection.offsetHeight / 2),
                    behavior: "smooth"
                });
            }
        }, 200); // 200ms 之后触发，以防止频繁调整
    }

    document.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    checkScroll(); // 确保初始加载时就有动画
});