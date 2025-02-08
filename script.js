document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-section");
    const buttons = document.querySelectorAll(".fade-button");
    let ticking = false;

    function checkScroll() {
        sections.forEach((section, index) => {
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

    checkScroll(); // Ensure animation triggers on load
});