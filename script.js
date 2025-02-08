document.addEventListener("DOMContentLoaded", () => {
    const sections = [...document.querySelectorAll(".fade-section")]; 
    const texts = [...document.querySelectorAll(".fade-text")];
    let isTouching = false;
    let lastTouchTime = 0;
    
    function checkScroll() {
        texts.forEach((text) => {
            let rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                text.classList.add("visible");
            } else {
                text.classList.remove("visible");
            }
        });

        updateActiveSection();
    }

    function updateActiveSection() {
        let centerIndex = -1;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
            let rect = section.getBoundingClientRect();
            let centerDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

            // **忽略小板块**
            if (section.classList.contains("portfolio-item")) return;
            
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

        if (!isTouching) {
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                let targetSection = sections[centerIndex];
                if (targetSection) {
                    window.scrollTo({
                        top: window.scrollY + targetSection.getBoundingClientRect().top - (window.innerHeight / 2) + (targetSection.offsetHeight / 2),
                        behavior: "smooth"
                    });
                }
            }, 200);
        }
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    document.addEventListener("touchstart", () => { isTouching = true; });
    document.addEventListener("touchmove", () => { lastTouchTime = Date.now(); });
    document.addEventListener("touchend", () => {
        isTouching = false;
        setTimeout(() => {
            if (Date.now() - lastTouchTime > 100) updateActiveSection();
        }, 200);
    });

    checkScroll();
});