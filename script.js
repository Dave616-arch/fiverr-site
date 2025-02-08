document.addEventListener("DOMContentLoaded", () => {
    function checkScroll() {
        let sections = document.querySelectorAll(".fade-section, .fade-button");
        sections.forEach(section => {
            let rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                section.classList.add("visible");
            }
        });
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    checkScroll(); // Ensure animation runs on page load

    // Smooth scroll fix for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                let headerOffset = 50; // Adjust this value based on header height
                let elementPosition = target.getBoundingClientRect().top + window.scrollY;
                let offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});