document.addEventListener("DOMContentLoaded", function() {
    function checkScroll() {
        let sections = document.querySelectorAll(".fade-section");
        let buttons = document.querySelectorAll(".fade-button");

        sections.forEach(section => {
            let rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible"); // 允许返回时重新播放动画
            }
        });

        buttons.forEach(button => {
            let rect = button.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                button.classList.add("visible");
            } else {
                button.classList.remove("visible");
            }
        });
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    checkScroll();
});