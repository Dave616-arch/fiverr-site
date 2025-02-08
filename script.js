document.addEventListener("DOMContentLoaded", () => {
    function checkScroll() {
        let sections = document.querySelectorAll(".fade-section, .fade-button");
        sections.forEach(section => {
            let rect = section.getBoundingClientRect();
            let windowHeight = window.innerHeight;

            // 进入视口时添加 visible，离开时移除
            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    checkScroll(); // 确保页面加载时动画可用

    // 📌 修正 #services 停留位置
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                let headerHeight = document.querySelector("header").offsetHeight || 50;
                let elementPosition = target.getBoundingClientRect().top + window.scrollY;
                let offsetPosition = elementPosition - headerHeight - 10; // 调整偏移

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});