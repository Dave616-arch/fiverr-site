document.addEventListener("DOMContentLoaded", () => {
    function checkScroll() {
        let sections = document.querySelectorAll(".fade-section");
        let windowHeight = window.innerHeight;
        let middleScreen = windowHeight / 2; 

        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            let rect = section.getBoundingClientRect();
            let sectionMiddle = rect.top + rect.height / 2;
            let distance = Math.abs(middleScreen - sectionMiddle);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }

            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });

        if (closestSection) {
            document.querySelectorAll(".fade-section").forEach(sec => sec.classList.remove("active"));
            closestSection.classList.add("active");
        }
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    checkScroll(); // Initial check on page load

    // 📌 自动居中 & 滚动结束后自动放大
    let scrollTimer;
    document.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            let activeSection = document.querySelector(".fade-section.active");
            if (activeSection) {
                let offset = activeSection.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + activeSection.clientHeight / 2;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
        }, 200);
    });
});